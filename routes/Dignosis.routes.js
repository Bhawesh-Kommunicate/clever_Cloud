
const {diagonsisChecker} = require("../controller/Diagnosis.controller.js")
const diagonsis = (app) =>{
    app.post("/symptoms/diagonsis" , diagonsisChecker)
}

module.exports = {
    diagonsis
}