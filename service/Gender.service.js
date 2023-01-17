var axios = require("axios");
const confige = require("../config/config.json")
const gender = (sex , userId) => {
  var data = JSON.stringify({
    metadata: {
      "Gender": `${sex}`,
    },
  });

  var config = {
    method: "post",
    // url: "https://services.kommunicate.io/rest/ws/user/update",
    url : confige.kommunicateUpdate,
    headers: {
      "Api-Key": `${process.env.Kommunicate_Key}`,
      "Of-User-Id":`${userId}`,
      "Content-Type": "application/json"
    },
    data: data,
  };

var response  =  axios(config)
    .then(function (response) {
    //   console.log(JSON.stringify(response.data));
        return response.data
    })
    .catch(function (error) {
      console.log(error);
    });

    return response
};


module.exports = {
    gender
}
