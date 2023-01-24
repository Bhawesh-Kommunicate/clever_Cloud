const {
  SymptomStore,
  getDefaultSymptoms,
} = require("../controller/SymptomsController");

const getSymptoms = (app) => {
  app.post("/symptoms/api/v1/SymptomStore", SymptomStore);
  app.get("/symptoms", getDefaultSymptoms);
};

module.exports = { getSymptoms };
