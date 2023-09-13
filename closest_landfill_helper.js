import haversine from "haversine-distance";

import requests from "../../assets/ecocaasitech.request.json" assert { type: "json" };
import owners from "../../assets/ecocaasitech.owner.json" assert { type: "json" };
import agents from "../../assets/ecocaasitech.agent.json" assert { type: "json" };
import landfills from "../../assets/ecocaasitech.landfill.json" assert { type: "json" };


console.log(landfills);
console.log(requests);

function closestLandfill(request, landfillList) {
  let requestCoordinates = {
    latitude: request.location.latitude,
    longitude: request.location.longitude,
  };
  let distance = 0;
  let requestLandfieldDistanceList = [];
  landfills.forEach((element) => {
    let elementCoordinates = {
      latitude: element.localisation.latitude,
      longitude: element.localisation.longitude,
    };
    distance = haversine(requestCoordinates, elementCoordinates);
    requestLandfieldDistanceList.push({ landfill: element, dist: distance });
    requestLandfieldDistanceList.sort((a, b) => {
      return a.dist - b.dist;
    });
  });
  return requestLandfieldDistanceList[0];
}

console.log("**".repeat(60));

const request = requests[1];
console.log(request);
console.log(closestLandfill(request, landfills));
