import bookingsCompleted from "../../assets/ecocaasitech.booking.completed.json" assert { type: "json" };
// const bookingCompleted = require("../../assets/ecocaasitech.booking.completed.json")
// const AgentModel = require("../models/agent/agent_model.js")
// print the list of all completed booking
console.log(bookingsCompleted);

// having on completed booking, get the associated performance

// punctuality management of a bookingCompleted

function punctuality(bookingCompleted) {
  // declare the punctuality value
  let punctualityValue = 0;

  // get the time the booking is supposed to start
  let bookingTime = bookingCompleted.booking_start_at;
  let bookingTimeTimestamp = new Date(bookingTime);

  // get the time the agent arrived for the booking
  let agentArrivingTime = bookingCompleted.agent_pickup_start_at;
  let agentArrivingTimeTimestamp = new Date(agentArrivingTime);

  // get the difference in seconds
  let punctualityTime = Math.floor(
    (bookingTimeTimestamp.getTime() - agentArrivingTimeTimestamp.getTime()) /
      1000
  );
  console.log(`Time elapsed: ${punctualityTime} s`);

  // check  if the agent was late (arrived after 5 minutes)
  let remainingTime = 0;
  if (Math.abs(punctualityTime) <= 300 || 0 < punctualityTime) {
    punctualityValue = 1;
  } else {
    // get the remaining time after 5 min
    remainingTime = Math.abs(punctualityTime) - 300;

    // convert the remaing time in minutes and determine how many 5 minutes we have
    remainingTime = Math.round(Math.abs(remainingTime) / 300);
  }
  return remainingTime;
}

// partial booking performance based on punctuality and rating score

function bookingPerformance(bookingCompleted) {
  // get the agent of the booking
  let agent = bookingCompleted.agent_id;

  // get each criterion to evaluate performance

  // rating stars
  let ratingScore = bookingCompleted.rating_stars;

  // punctuality management
  let punctualityScore = punctuality(bookingCompleted);

  //get the partial value of the performance
  return ratingScore * 0.3 + punctualityScore * 0.2;
}

console.log(bookingPerformance(bookingsCompleted[0])); // 2.2

/* 

determine the overall performance by adding the other criterion:

Hours_weight = 0.2
Requests_weight = 0.2
Shifts_weight = 0.1




- set a period
- get all the requests of a specific agent during this period
- get the number of: shifts, hours, requests
- multiply each one respectively by 0.1, 0.2 and 0.1
- add the perfomance value of each requests 

*/

// From the pseudo code of Clinton

import agents from "../../assets/ecocaasitech.agent.json" assert { type: "json" };

let DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function agentPerformance(agent, start_date, end_date) {
  // first, convert the dates to the appropriate format
  let s_date = new Date(start_date);

  let e_date = new Date(end_date);

  //create the arrays of requests for the agent between start_date and end_date
  let agent_request = [];
  let part_performance = 0;
  for (let request of bookingsCompleted) {
    let req_dated = new Date(request.booking_start_at);

    // get all the completed requests for the agent with id == agent_id
    if (request.agent_id == agent.agent_id) {
      // check that the date of the request of the booking is in the period
      if (
        req_dated <= e_date.setDate(e_date.getDate() + 0) &&
        req_dated >= s_date.setDate(s_date.getDate() + 0)
      ) {
        // add the request to the list of the request to evalute
        agent_request.push(request);
        
      }
    }
  }
  console.log(agent_request)
  // evaluate partial performances of each request in the list
  // by calling bookingPerformance()
  for (let request of agent_request) {
    part_performance += bookingPerformance(request);
  }
  // add the requests number weigth

  part_performance += agent_request.length * 0.2;

  // get the number of shifts and hours of the agent during this period
  let shifts_number = 0;
  let hours_number = 0;
  // get the lenght of the period
  let period_length = Math.round(
    (e_date.getTime() - s_date.getTime()) / (1000 * 60 * 60 * 24)
  );
  // get all the dates in the period
  let dates = [];
  for (let index = 0; index <= period_length; index++) {
    // append the date
    let d = new Date(s_date.setDate(s_date.getDate() + 1))
    dates.push(d)
    //adjust the shifts number of the agent for the period
    if (agent.agent_shift[DAYS[d.getDay() - 1]].length > 0) {
      shifts_number += 1;
      hours_number += 12;
    }
  }
 

  part_performance += shifts_number * 0.1 + hours_number * 0.2

  return Math.round(part_performance);
  //
}

console.log(
  agentPerformance(
    agents[0],
    "2023-06-13T17:30:00.309Z",
    "2023-06-15T17:30:00.309Z"
  )
);

/*
    Remark: Maybe we should find a way to transform each component of
    the performance over 100 to have a fixed score over 100.
*/