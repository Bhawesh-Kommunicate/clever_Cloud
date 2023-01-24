var axios = require('axios');
require(`dotenv`).config()
const confige = require("../config/config.json")
const specialist = async (age,symptoms,Gender)=>{
    var data = JSON.stringify({
        "sex": `${Gender}`,
        "age": {
          "value": Number(age),
          "unit": "year"
        },
        "evidence": [
          {
            "id": `${symptoms}`,
            "choice_id": "present",
            "source": "initial",
          }
        ],
      });
      
      var config = {
        method: 'post',
        url :confige.infermedicaSepcialist,
        headers: { 
          'Content-Type': 'application/json', 
          'Accept': 'application/json', 
          'Dev-Mode': 'true', 
          'App-Id': `${process.env.api_id}`, 
          'App-Key': `${process.env.api_key}`
        },
        data : data
      };
      
     const response = await axios(config)

       return "We recommand you to reach " + response.data.recommended_specialist.name
}

module.exports = {
    specialist
}

