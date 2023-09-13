import requests from "../../assets/ecocaasitech.request.json" assert { type: "json" };
import trashs from "../../assets/ecocaasitech.trash.json" assert { type: "json" };

// for commercial
// base price = 500 for commercial
// add tricycle:100 to sizes

// the packages of ecocaasitech
const packages = ["pickup", "cleanup & pickup", "custom"];
// the sizes of trash
const sizes = { bucket: 10, trashbag: 27, wheelbarrow: 80, tricycle: 100 };

// the categories of trash and the increase percentage associated

const categories = { general: 5, recyclable: 7, dangerous: 10 };

// calculate the volume of trash in a request

function calculateVolume(size, quantity) {
  return (size / 1000) * quantity;
}

// calculate price of a volume of trash for resident booking depending on the package choosen in the request
function calculatePrice(volume, packageChoosen) {
  let price = volume * 10000; // volume * 12500
  if (packageChoosen == "pickup") {
    return price;
  } else {
    return 1.2 * price;
  }
}

// calculate price of a volume of trash for commercial booking depending on the package choosen in the request
function calculateCommercialPrice(volume, packageChoosen) {
  let price = volume * 50000;
  switch (packageChoosen) {
    case "cleanup & pickup":
      price *= 1.2;
      break;

    case "custom":
      price *= 1.5;
      break;

    default:
      price = price;
      break;
  }
  return price;
}

// propose a list of 4 values for bidding
// for example, for 300, propose [325, 350, 375, 400]
function bidding(priceCalculated) {
  let added_value = 25;
  let bidding_values = [];
  for (let i = 0; i < 5; i++) {
    bidding_values.push(Math.round(priceCalculated + i * added_value));
  }
  return bidding_values;
}

console.log(bidding(300));

// get the estimated price of a trash object

function priceEstimation(trash) {
  // get the volume from trash's size and trash's quantity

  let volume = calculateVolume(
    sizes[trash.trash_items["trash_size"]],
    trash.trash_items["trash_quantity"]
  );

  //get the price for the requested service

  let price = calculatePrice(volume, trash.service).toFixed(0);

  return { volume: volume, price: price };
}

// price estimation for trash in commercial

function priceCommercialEstimation(trash) {
  // get the volume from trash's size and trash's quantity

  let volume = calculateVolume(
    sizes[trash.trash_items["trash_size"]],
    trash.trash_items["trash_quantity"]
  );

  //get the price for the requested service

  let price = calculateCommercialPrice(volume, trash.service).toFixed(0);

  return { volume: volume, price: price };
}

let trash = trashs[0];
console.log(priceEstimation(trash));

/* function to estimate price based on the wolume of the trash
 and the category of the trash */

function price(trash) {
  // calculate the intermediate price of the trash using priceEstimation function

  let priceIntermediate = priceEstimation(trash)[price];

  // get the category of the trash

  let category = trash.category;

  // calculate the final price based on the category

  let price = priceIntermediate*(1 + categories[category] / 100);

  return price;
}
