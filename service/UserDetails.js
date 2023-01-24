require("dotenv").config();
var axios = require("axios");
const confige = require("../config/config.json");
const API_KEY = process.env.Kommunicate_Key;
const API_URL = confige.kommunicateData;

const createConfig = (data) => ({
  method: "post",
  url: API_URL,
  headers: {
    "Api-Key": API_KEY,
    "Content-Type": "application/json",
  },
  data,
});

const data = async (userId) => {
  const data = JSON.stringify({
    userIdList: [`${userId}`],
  });
  const config = createConfig(data);
  const response = await axios(config);
  const obj = response.data.response[0].metadata;
  return obj;
};

module.exports = {
  data,
};
