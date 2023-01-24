const { specialist } = require("../service/Specialist.service");
const {
  symptomsDiagonsis,
  symptomsData,
} = require("../service/SymptomStore.service");
const { data } = require("../service/UserDetails");

const diagonsisChecker = async (req, res) => {
  const UserData = await data(req.query.userId);
  const response = await symptomsDiagonsis(
    UserData.token,
    UserData.age,
    UserData.Gender,
    req.query.s_id
  );
  if (response.data.conditions[0] != null) {
    res.status(200).json({
      message: "Successfull",
      success: true,

      data: response.data.conditions[0].common_name,
    });
  } else {
    const ans = await specialist(UserData.age, req.query.s_id, UserData.Gender);

    return res.status(200).json({
      message:
        "Sorry, I couldn't diagnose based on the provided symptoms. Please visit the nearest doctor for further diagnosis",
      success: true,
      data: ans,
    });
  }
};

module.exports = {
  diagonsisChecker,
};
