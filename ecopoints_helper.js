import haversine from "haversine-distance";

import bookings from "../../assets/ecocaasitech.booking.json" assert { type: "json" };
import owners from "../../assets/ecocaasitech.owner.json" assert { type: "json" };
import agents from "../../assets/ecocaasitech.agent.json" assert { type: "json" };
import landfills from "../../assets/ecocaasitech.landfill.json" assert { type: "json" };

const levels = ["Entry", "Silver", "Gold", "Platinium"];

const services = { Voice: 500, Data: 500, Electricity: 500 };

// taking the object booking as an input

function earnEcopoint(booking) {
  let owner;
  let amount;

  if (booking.request_status == "Completed") {
    // get the owner in the completed booking
    // this will be done differently when requesting from the database
    owner = booking.owner_id;

    for (let i = 0; i < owners.length; i++) {
      if (owners[i]._id == owner) {
        owner = owners[i];
        break;
      }
    }

    //get the amount of points generated by the booking

    let points = Math.round(booking.booking_price / 100);

    // update the available ecopoints and total ecopoints of the owner in the booking
    owner.ecopoint_available += points;
    owner.ecopoint_total += points;

    // set levels

    if (totalEcopoints >= 500 && totalEcopoints < 1000) {
      owner.ecopoint_level == "Silver";
    } else if (totalEcopoints >= 1000 && totalEcopoints < 2000) {
      owner.ecopoint_level == "Gold";
    } else if (totalEcopoints >= 2000) {
      owner.ecopoint_level = "Platinium";
    }

    return {
      ecopoint_total: owner.ecopoint_total,
      ecopoint_available: owner.ecopoint_available,
      ecopoint_level: owner.ecopoint_level,
    };
  }
}

// taking the parameters of the object booking as inputs

let booking;

// find the corresponding owner; this will be done differently from the database

const owner = owners.find((element) => element._id["$oid"] == booking.owner_id);
console.log(owner);

let totalEcopoints = owner.ecopoint_total;
let availableEcopoints = owner.ecopoint_available;
let price = booking.booking_price;

function earnEcopoints(price, totalEcopoints, availableEcopoints) {
  let points = Math.round(price / 100);

  availableEcopoints += points;
  totalEcopoints += points;
  let level = "Entry";
  if (totalEcopoints >= 500 && totalEcopoints < 1000) {
    level == "Silver";
  } else if (totalEcopoints >= 1000 && totalEcopoints < 2000) {
    level == "Gold";
  } else if (totalEcopoints >= 2000) {
    level = "Platinium";
  }

  return {
    availableEcopoints: availableEcopoints,
    totalEcopoints: totalEcopoints,
    level: level,
  };
}

function redeemEcopoints(owner, service) {
  // get the status of the redeem process
  let redeemStatus = true;
  // get the available points of the owner
  let availableEcopoints = owner.ecopoint_available;
  // get the actual level of the owner
  let level = owner.ecopoint_level;
  // get the value of the redeem depending on the choosen service
  let redeem = Math.floor(availableEcopoints / services[service]);
  // update the available points of the owner
  owner.ecopoint_available -= services[service] * redeem;
  //get the real value of the redeem depending on the ecopoint_level of the owner

  switch (owner.ecopoint_level) {
    case "Silver":
      redeem *= 2;
      break;
    case "Gold":
      redeem *= 3;
      break;
    case "Platinium":
      redeem *= 4;
      break;
    default:
      redeem *= 1;
  }

  if (redeem == 0) {
    redeemStatus = false;
  }
  return { redeemStatus: redeemStatus, redeem: redeem };
}
