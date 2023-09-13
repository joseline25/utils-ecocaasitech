import agents from "../../assets/ecocaasitech.agent.json" assert { type: "json" };

let agent = agents[1];
let map1 = new Map(Object.entries(agent.agent_shift));
console.log(map1.values());
var total = 0;

map1.forEach((keys, values) => {
  total += keys.length;
});

// this function takes an agent object and return his base salary for a period

function salary(agent, start_date, end_date) {
  // get the numbers of shifts for a week
  let map = new Map(Object.entries(agent.agent_shift));
  let shifts = 0;
  map.forEach((keys, values) => {
    shifts += keys.length;
  });
  // get the base salary for the week
  let base_salary = 500 * shifts;

  // separate the list of bookings made by the agent in two lists:
  // resident bookings,  commercial bookings

}
