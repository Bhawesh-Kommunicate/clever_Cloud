var axios = require("axios");
// const { config } = require("dotenv");
const confige = require("../config/config.json")
require("dotenv").config();
const age = (userId, age) => {
  var data = JSON.stringify({
    metadata: {
      age: `${age}`,
    },
  });

  var config = {
    method: "post",
    // url: "https://services.kommunicate.io/rest/ws/user/update",
    url :confige.kommunicateUpdate,
    headers: {
      "Api-Key": `${process.env.Kommunicate_Key}`,
      "Of-User-Id": `${userId}`,
      "Content-Type": "application/json",
      Cookie: "JSESSIONID=1D59FBEEB2E7A536228F72549E152FE1",
    },
    data: data,
  };

  var response = axios(config)
    .then(function (response) {
      //   console.log(JSON.stringify(response.data));
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  return response;
};

module.exports = {
  age,
};
