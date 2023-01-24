const {storeSex} = require("../controller/UserInfo.controller");

const Gender = (app)=>{
    app.post("/symptoms/api/v1/sex", storeSex);
}

module.exports = {
    Gender
}