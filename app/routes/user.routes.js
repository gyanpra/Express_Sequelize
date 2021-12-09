module.exports = app => {
    const users = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
  
    router.post("/register", users.create);

    router.post("/login", users.login);

  
    app.use("/users", router);
  };


  //   Endpoints: - 

// http://localhost:8080/users/register
  //register user
//   {
//     "email": "gyanp008@gmail.com",
//     "hashedPassword": "admin",
//     "phone": "9572304078",
//     "isAdmin": true,
//     "address": "ABC"
// }


// http://localhost:8080/users/login
//login user
// {
//     "email": "gyanp008@gmail.com",
//     "hashedPassword": "admin"
// }
