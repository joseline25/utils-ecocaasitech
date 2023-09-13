// calculate the distance
import haversine from "haversine-distance";

// positionOne is the set of latitude and longitude

const days = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};

import requests from "../../assets/ecocaasitech.request.json" assert { type: "json" };

import agents from "../../assets/ecocaasitech.agent.json" assert { type: "json" };

// check if an agent is available

function availableAgent(agent) {
  let current_date = new Date();

  if (!agent.agent_shift[days[current_date.getDay()]]) {
    return false;
  }

  if (
    agent.agent_shift[days[current_date.getDay()]].length > 0 &&
    agent.availability == true
  ) {
    // console.log("first condition");
    if (
      (current_date.getHours() >= 5 &&
        current_date.getHours() < 12 &&
        agent.agent_shift[days[current_date.getDay()]].includes("morning")) ||
      (current_date.getHours() >= 12 &&
        current_date.getHours() < 19 &&
        agent.agent_shift[days[current_date.getDay()]].includes("afternoon"))
    ) {
      // console.log("second condition");
      // console.log(current_date.getHours());
      // console.log(
      //   agent.agent_shift[days[current_date.getDay()]].includes("afternoon")
      // );
      return true;
    } else {
      // console.log(current_date.getHours() );
      // console.log(agent.agent_shift[days[current_date.getDay()]].includes("afternoon"));

      return false;
    }
  } else {
    return false;
  }
}

// assign an agent based on a request and the list of agents in the system

const sizes = { bucket: 10, trashbag: 27, wheelbarrow: 80 };

function agentAssignement(request, agentsList) {
  let volume = (sizes[request.size] / 1000) * request.quantity;

  let availableAgentList = [];
  let distance = 0;

  let requestCoodinatesLatitude = request.location.latitude;

  let requestCoodinatesLongitude = request.location.longitude;
  let requestCoordinates = {
    latitude: requestCoodinatesLatitude,
    longitude: requestCoodinatesLongitude,
  };

  agentsList.forEach((element) => {
    if (availableAgent(element)) {
      //compute the distance of the agent to the request.
      let elementCoodinatesLatitude =
        element.location_information.location.latitude;

      let elementCoodinatesLongitude =
        element.location_information.location.longitude;
      let elementCoodinates = {
        latitude: elementCoodinatesLatitude,
        longitude: elementCoodinatesLongitude,
      };

      distance = haversine(requestCoordinates, elementCoodinates);

      // push [element, distance] to availableAgentList
      //availableAgentList.push([element, distance]);
      availableAgentList.push({ agent: element, dist: distance });

      availableAgentList.sort((a, b) => {
        return a.dist - b.dist;
      });
    }
  });

  if (availableAgentList.length == 0) {
    return [];
  } else {
    if (volume < 1.6) {
      availableAgentList = [availableAgentList[0]];
    }
    return availableAgentList;
  }
}

// test

const request = requests[1];

const agent = agents[0];
// console.log(availableAgent(agent));
// console.log(request);
console.log(agentAssignement(request, agents));

//console.log(agentAssignement(request, agents));
