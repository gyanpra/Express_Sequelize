module.exports = app => {
    const otps = require("../controllers/otp.controller.js");
  
    var router = require("express").Router();
  
    router.post("/sendmail", otps.sendOtp);

    router.post("/verify", otps.verifyOtp);
  
    app.use("/reset", router);
  };





  // endpoints: -

//   // http://localhost:8080/reset/sendmail

//   {
//     "email": "gyanp008@gmail.com"
// }

//   //After password Reset
//   // http://localhost:8080/reset/verify

//   {
//     "email": "gyanp008@gmail.com",
//     "otp": "579353",
//     "hashedPassword": "Demouser"

// }