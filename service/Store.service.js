const axios = require("axios");
require("dotenv").config();
const confige = require("../config/config.json");
const store = async (symptoms, userId) => {
  data = JSON.stringify({
    metadata: {
      symptoms: `${symptoms}`,
    },
  });
  var config = {
    method: "post",
    url: confige.kommunicateUpdate,
    headers: {
      "Api-Key": `${process.env.Kommunicate_Key}`,
      "Of-User-Id": `${userId}`,
      "Content-Type": "application/json",
    },
    data: data,
  };

  var response = axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error
    });

  return response;
};

module.exports = {
  store,
};
