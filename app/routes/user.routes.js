module.exports = app => {
    const users = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
  
    router.post("/register", users.create);

    router.post("/login", users.login);
  
    app.use("/users", router);
  };