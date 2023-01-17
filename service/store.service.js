const axios = require("axios");
require("dotenv").config();
const confige = require("../config/config.json")
const store = async (symptoms, userId) => {
  // if(symptoms != "not"){
  //     data = JSON.stringify({
  //     metadata: {
  //       symptoms: `${symptoms}`,
  //     },
  //   });
  // }else{
  //    data = JSON.stringify({
  //     metadata: {
  //       symptoms: `${symptoms}`,
  //     },
  //   });
  // }
  data = JSON.stringify({
    metadata: {
      symptoms: `${symptoms}`,
    },
  });
  console.log(data);
  var config = {
    method: "post",
    // url: "https://services.kommunicate.io/rest/ws/user/update",
    url  :confige.kommunicateUpdate,
    headers: {
      "Api-Key": `${process.env.Kommunicate_Key}`,
      "Of-User-Id": `${userId}`,
      "Content-Type": "application/json"
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
  store,
};
