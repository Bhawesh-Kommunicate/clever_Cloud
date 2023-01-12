const axios = require("axios");
require("dotenv").config()
const store =async (symptoms , userId) => {
  // console.log(userId)
  if(symptoms !== "undefined"){
    var data = JSON.stringify({
      "metadata": {
        "symptoms": `${symptoms}`
      }
    });
    
    var config = {
      method: 'post',
      url: 'https://services.kommunicate.io/rest/ws/user/update',
      headers: { 
        'Api-key': `${process.env.Kommunicate_Key}`, 
        'Of-User-Id': `${userId}`, 
        'Content-Type': 'application/json', 
        // 'Cookie': 'JSESSIONID=5B2C2F1D9961BB70241401653225CD25'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });  
  }else{
    var data = JSON.stringify({
      "metadata": {
        "symptoms": "undefined"
      }
    });
    
    var config = {
      method: 'post',
      url: 'https://services.kommunicate.io/rest/ws/user/update',
      headers: { 
        'Api-key': `${process.env.Kommunicate_Key}`, 
        'Of-User-Id': `${userId}`, 
        'Content-Type': 'application/json', 
        // 'Cookie': 'JSESSIONID=5B2C2F1D9961BB70241401653225CD25'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
    
  }

  // return response;
};
module.exports = {
    store
}
// console.log(store(undefined , "EbMEMBbggbvndEdNND79WFMVN18dPGuQ"));