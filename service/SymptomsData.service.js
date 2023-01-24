require("dotenv").config();
const API_KEY = process.env.api_key;
const API_ID = process.env.api_id;
const axios = require("axios");
const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 300 });

const getSymptomsData = async (url, age) => {
  const response = await axios.get(url, {
    params: {
      "age.value": `${age}`,
      "age.unit": "year",
      enable_triage_3: "true",
    },
    headers: {
      Accept: "application/json",
      "Dev-Mode": "true",
      "App-Key": API_KEY,
      "App-Id": API_ID,
    },
  });
  return response.data;
};

module.exports = { getSymptomsData };
