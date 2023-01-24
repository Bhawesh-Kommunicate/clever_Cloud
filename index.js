const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const { getSymptoms } = require("./routes/symptoms.route");
const { age } = require("./routes/age.route");
const { Gender } = require("./routes/sex.route");
const { diagonsis } = require("./routes/dignosis.routes");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
let port = 8080;
Gender(app);
age(app);
diagonsis(app);
getSymptoms(app);
app.get("/", (req, res) => {
  res.json({
    message: "Sussessfull",
    data: ["lodon", "paris"],
  });
});
app.listen(port, () => {
  console.log("app is listening over port=", port);
});
