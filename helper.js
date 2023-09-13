const distanceCalculator = require('./distance_helper');
const volumeCalculator = require('./volume_helper');

const availableAgent = (agent) => {
  const days = {0: "sunday", 1: "monday", 2: "tuesday", 3: "wednesday", 4: "thursday", 5: "friday", 6: "saturday", };
  let current_date = new Date();
  if (!agent.agent_shift[days[current_date.getDay()]]) {
    return false;
  }
  
  if (
    agent.agent_shift[days[current_date.getDay()]].length > 0 &&
    agent.agent_available == true
  ) {
    if (
      (current_date.getHours() >= 5 &&
        current_date.getHours() < 12 &&
        agent.agent_shift[days[current_date.getDay()]].includes("morning")) ||
      (current_date.getHours() >= 13 &&
        current_date.getHours() < 19 &&
        agent.agent_shift[days[current_date.getDay()]].includes("afternoon"))
    ) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}


const helperAlgorithms = {
  // assign an agent based on a request and the list of agents in the system
  agentAssignement: (request, agentsList) => {
    let volume = volumeCalculator(request.category, request.quantity);
    let availableAgentList = [];
    let distance = 0;
    let requestCoordinates = {
      latitude: request.localisation.latitude,
      longitude: request.localisation.longitude,
    };
    agentsList.forEach((element) => {
      if (availableAgent(element)) {
        console.log('entered here');
        console.log(`element ${element} is available`);
        //compute the distance of the agent to the request.
        let elementCoodinates = {
          latitude: element.localisation.latitude,
          longitude: element.localisation.longitude,
        };
  
        distance = distanceCalculator(requestCoordinates, elementCoodinates);
        // push [element, distance] to availableAgentList
        //availableAgentList.push([element, distance]);
        availableAgentList.push({ agent: element, dist: distance });
        availableAgentList.sort((a, b) => {
          return a.dist - b.dist;
        });
      } else {
        console.log(`element ${element} is not available`);
        return availableAgentList;
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
  },
};

module.exports = helperAlgorithms