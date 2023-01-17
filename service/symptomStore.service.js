var axios = require("axios");
require("dotenv").config();
const confige = require("../config/config.json")
const storeSymptom = async (userId, symptoms) => {
    console.log(userId)
  var data = JSON.stringify({
    metadata: {
      "symptoms": `${symptoms}`,
    },
  });

  var config = {
    method: "post",
    // url: "https://services.kommunicate.io/rest/ws/user/update",
    url : confige.kommunicateUpdate,
    headers: {
      "Api-Key": `${process.env.Kommunicate_Key}`,
      "Of-User-Id": `${userId}`,
      "Content-Type": "application/json",
    },
    data: data,
  };

  var response = await  axios(config)
    .then(function (response) {
      //   console.log(JSON.stringify(response.data));
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  return response;
};


const symptomsData = async(text , age)=>{
   

    var data = JSON.stringify({
        "text": `${text}`,
        "age": {
          "value": Number(age)
        }
      });
      
      var config = {
        method: 'post',
        // url: 'https://api.infermedica.com/v3/parse',
        url : confige.infermidicaParse,
        headers: { 
          'App-Id': process.env.api_id, 
          'App-Key': process.env.api_key, 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
    const response = await axios(config)
// console.log(response, "ssssssssssssssssssssssssssssssssssssssssssssss")
    return response
}

const symptomsDiagonsis = async(token,age,Gender,id)=>{
// we have to add multiple evidence although also as by making array and putting that into evidence || or puting answer in present format


let evidanceArr = []
for(let i = 0 ; i < id.length ; i++ ){
  evidanceArr.push({
    "id": `${id[i]}`,
      "choice_id": "present",
      "source" : "initial"
  })
}

var data = JSON.stringify({
  sex: `${Gender}`,
  age: {
    value: Number(age)
  },
  evidence: evidanceArr
});

var config = {
  method: 'post',
  // url: 'https://api.infermedica.com/v3/diagnosis',
  url : confige.infermedicaDiagnosis,
  headers: { 
    'App-Id': process.env.api_id, 
    'App-Key': process.env.api_key, 
    'Content-Type': 'application/json'
  },
  data : data
};

const response = await axios(config)

 return response

}

module.exports = {
    storeSymptom , symptomsData , symptomsDiagonsis
}