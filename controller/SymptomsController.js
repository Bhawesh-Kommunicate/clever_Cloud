const { default: axios } = require("axios");
const { getSymptomsData } = require("../service/SymptomsData.service");
const SymptomService = require("../service/SymptomStore.service");
const storage = require("../service/Store.service");
const userInfo = require("../service/UserDetails");
const { specialist } = require("../service/Specialist.service");
const confige = require("../config/config.json");
const SymptomStore = async (req, res) => {

  var Userdata = await userInfo.data(req.query.userId);
  let data = await SymptomService.symptomsData(
    req.query.symptoms,
    Userdata.age
  );

  if (
    Userdata.symptoms == undefined ||
    Userdata.symptoms == "undefined" ||
    Userdata.symptoms == "not"
  ) {
    let store = data.data.mentions[0].id;

    const symptomsStorage = await storage.store(store, req.query.userId);
    return res.status(200).json({
      message: "Please add more symptoms",
    });
  } else if (
    Userdata.symptoms !== undefined ||
    Userdata.symptoms !== null ||
    Userdata.symptoms !== "not"
  ) {
    let symptomArr = Userdata.symptoms.split(",");
    if (symptomArr.length >= 2) {
      const EmptySymptomArr = await storage.store("not", req.query.userId);
      const response = await SymptomService.symptomsDiagonsis(
        "token",
        Userdata.age,
        Userdata.Gender,
        symptomArr
      );
      if (response.data.conditions.length !== 0) {
        let condition = "";
        condition +=
          " " +
          response.data.conditions.map(
            (item) =>
              item.common_name +
              " with Possibility of " +
              Number(item.probability * 100)
          );
        return res.status(200).json({
          message: "Successfull",
          data: condition,
        });
      } else if (response && response.data.question != null) {
        const names = [];
        for (let i = 0; i < response.data.question.items.length; i++) {
          names.push({
            title: `${response.data.question.items[i].name}`,
            message: `${response.data.question.items[i].name}`,
            replyMetadata: {
              id: `${response.data.question.items[i].id}`,
              KM_TRIGGER_EVENT: "Default Fallback",
            },
          });
        }
        const EmptySymptomArr = await storage.store("not", req.query.userId);
        return res.status(200).json({
          message: "Successfull",
          success: true,
          items: names,
          data: response.data.question.text,
        });
      } else {
        const recomander = await specialist(
          Userdata.age,
          req.query.symptoms,
          Userdata.Gender
        );

        const EmptySymptomArr = await storage.store("not", req.query.userId);
        return res.status(200).json({
          data: recomander,
          message: "Successfull",
        });
      }
    } else {
      let arr = Userdata.symptoms.split(",");
      if (arr.includes(data.data.mentions[0].id)) {
        return res.status(200).json({
          message: "Please add different symptoms",
        });
      } else {
        let store = Userdata.symptoms + "," + data.data.mentions[0].id;
        const SymptomStore = await storage.store(store, req.query.userId);
        return res.status(200).json({
          message: "Please add more symptoms",
        });
      }
    }
  }
};

const getDefaultSymptoms = async (req, res) => {
  let Userdata = await userInfo.data(req.query.userId);
  function myAge(item) {
    var matches = item.match(/(\d+)/);
    return matches;
  }

  let temp = [];

  const response = await getSymptomsData(
    confige.infermedicaDefaultSymptoms,
    Userdata.age
  );
  for (let i = 0; i < response.length; i++) {
    if (!myAge(response[i].name) == true) {
      temp.push({
        searchKey: response[i].name,
        message: response[i].name,
        metadata: { KM_TRIGGER_EVENT: "symptoms" },
      });
    }
  }
  return res.status(200).json({
    data: temp,
    message: "Successfully Got all the names",
    success: true,
  });
};

module.exports = { SymptomStore, getDefaultSymptoms };
