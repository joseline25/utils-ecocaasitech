const haversine = require('haversine-distance');

const distanceCalculator = (requestCoordinates, agentCoordinates) => {
  let distance = haversine(requestCoordinates, agentCoordinates);
  distance = distance / 1000;
  return distance;
}

module.exports = distanceCalculator