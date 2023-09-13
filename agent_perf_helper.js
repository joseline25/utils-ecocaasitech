const { response } = require("express");
const config = require("../../../../config/config");
const db = config.db;

const AgentModel = require("../models/agent/agent_model.js");



// const agents = AgentModel.findAll();
 console.log(agents);

const getAgentPerformance = async (req, res) => {
  const agentListing = db
    .collection("users")
    .doc("agent_doc")
    .collection("agent");
  let query = agentListing;
  console.log(query);
  const agents = await AgentModel.findAll();
  console.log(agents);
};

getAgentPerformance();
