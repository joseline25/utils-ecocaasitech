import subscriptions_packages from "../../assets/ecocaasitech.subscription.package.json" assert { type: "json" };
import subscriptions from "../../assets/ecocaasitech.subscription.users.json" assert { type: "json" };

import date from "date-and-time";



const services = ["pickup", "cleanup & pickup", "custom"];
const packages = ["VIP Package", "Premium Package", "Standard Package"];

function subscriptionsManagement(owner_id, chosen_package, start_date) {
  // with start_date is a Date object
  let s_date = new Date(start_date);

  // set end_date = start_date +30
  s_date.setDate(s_date.getDate() + 30);
  let end_date = s_date;

  //get the chosen_package features
  let full_package;
  for (let index = 0; index < subscriptions_packages.length; index++) {
    if (subscriptions_packages[index].name == chosen_package) {
      full_package = subscriptions_packages[index];
      break;
    }
  }

  // get the number of pick_up

  const interval_pickups = Math.round(30 / (full_package.pickup_per_week * 4));

  // create the same amount of pickups per week

  let dates_array = [];
  let the_date = new Date(start_date);

  for (let index = 0; index < 30; index += interval_pickups) {
    let intervalDate = new Date(
      the_date.setDate(the_date.getDate() + interval_pickups)
    );
    dates_array.push(intervalDate);
  }

  return dates_array;
}

const now = new Date();

let start_date = now.toISOString(); // the toISOString() method convert the date into
//the  the form of (YYYY-MM-DDTHH:mm:ss.sssZ or ±YYYYYY-MM-DDTHH:mm:ss.sssZ).
//The date object is created using the date() constructor.

console.log("the start date is ", start_date);
console.log(subscriptionsManagement(1, packages[0], start_date));

// pause a subscription if package == VIP

function pauseSubscription(subscription) {
  // check that the subscription is not currently paused
  if (subscription.isPaused == false) {
    // get the start date of the subscription
    let start_date = new Date(subscription.start_date);

    // get the end date of the subscription
    let end_date = new Date(subscription.end_date);

    // get the current date to know when the pause start
    let current_date = new Date();

    // check if the end date is not passed and set the parameter
    // of paused in subscription to true
    if (subscription.chosen_package == "VIP Package") {
      if (current_date.getTime() < end_date.getTime()) {
        subscription.isPaused = true; // the isPaused field in subsscription is a boolean
        subscription.pausedDate = current_date;
      }
    }
  }
  return current_date;
}

// function to resume the subscription

function resumeSubscription(subscription) {
  // get the current date
  let current_date = new Date();

  // check that the subscription is currently paused
  if (subscription.isPaused == true) {
    // get the date the subscription was paused

    let the_date = subscription.pausedDate;

    // get the remaining days of the subscription

    let remaining_days =
      30 - (the_date - subscription.start_date) / (1000 * 60 * 60 * 24);

    // set the new end date

    let end_date = current_date.setDate(
      current_date.getDate() + remaining_days
    );

    // get all the remainging booking of the subscription
  }
}
