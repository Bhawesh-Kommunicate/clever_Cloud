const{gender} = require("../service/Gender.service")

const StoreSex = async (req, res) => {
  if(req.body.sex != "female" && req.body.sex !== "male"){
    console.log(req.body.sex)
    let Gender = "female";
    // console.log(req.body.userId)
    let userId = req.body.userId;
    let response = await gender(Gender, userId);
    // console.log(response);
    console.log("--------------------------------IN ! PART--------");
    return res.status(200).json({
      message: "successfully Stored the data",
      data: response,
      success: true,
    });
  }else{
             // console.log(req.body.userId)
    let Gender = req.body.sex
    let userId = req.body.userId;
    let response = await gender(Gender, userId);
    // console.log(response);
    console.log("----------------------------------------");
    return res.status(200).json({
      message: "successfully Stored the data",
      data: response,
      success: true,
    });
  }
}

  module.exports = {
    StoreSex
  }