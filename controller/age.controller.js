
const {age} = require("../service/age.service")
const storage = require("../service/store.service")
const StoreAge = async (req, res) => {
  console.log(req.body.userId);
    const response = await age(req.body.userId, req.body.age);
    const EmptySymptomArr = await storage.store("not" , req.query.userId)
    return res.status(200).json({
      message: "data stored Successfully",
      success: "true",
      status: "200",
      data: response,
    });
  };


  module.exports = {
    StoreAge
  }