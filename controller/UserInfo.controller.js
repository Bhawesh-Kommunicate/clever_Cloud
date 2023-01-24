const { gender } = require("../service/Gender.service");
const { age } = require("../service/Age.service");
const storage = require("../service/Store.service");
const StoreAge = async (req, res) => {
  const response = await age(req.body.userId, req.body.age);
  const EmptySymptomArr = await storage.store("not", req.query.userId);
  return res.status(200).json({
    message: "data stored Successfully",
    success: "true",
    status: "200",
    data: response,
  });
};
const storeSex = async (req, res) => {
  let userId = req.body.userId;
  let Gender = req.body.sex;
  if (Gender != "female" && Gender !== "male") {
     Gender = "female";
  }
  let response = await gender(Gender, userId);
  return res.status(200).json({
    message: "successfully Stored the data",
    data: response,
    success: true,
  });
};

module.exports = {
  storeSex,
  StoreAge,
};
