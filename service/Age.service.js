var axios = require("axios");
const confige = require("../config/config.json");
require("dotenv").config();
const age = (userId, age) => {
  var data = JSON.stringify({
    metadata: {
      age: `${age}`,
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
      return err
    });

  return response;
};

module.exports = {
  age,
};
