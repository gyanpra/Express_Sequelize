const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const jwt = require('jsonwebtoken');


//Register User
exports.create = (req, res) => {
  if (!req.body.name || !req.body.password) {
    res.status(400).send({
      message: "Atleast Enter name and password"
    });
    return;
  }
  const user = {
        name: req.body.name,
        password: req.body.password,
        role: req.body.role,
  };
  User.create(user)
    .then(data => {
      res.send("User Registered Successfully.");
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error Creating new User."
      });
    });
};

//login user
exports.login = (req, res) => {
    User.findOne({
        where: {
        name: req.body.name,
        password: req.body.password
        }
    }).then(user => {
        if (!user) {
            return res.status(404).send({
            message: "User Not Found"
            });
        }
        else{
          if(user.role === "admin" || user.role === "user"){
            const token = jwt.sign({ id: user.id }, 'secret', {
              expiresIn: 86400 // expires in 24 hours
            });
            return res.status(200).send({
                message: "Logged in Successfully",
                token: token,
                user: user.name,
                id: user.id,
                success: true,
                expiresIn: 86400
            });
          }
        }
        })
        .catch(err => {
        if (err.kind === "ObjectId") {
            return res.status(404).send({
            message: "Server error"
            });
          }
        return res.status(500).send({
        message: "Error retrieving User with id " + req.params.id
        });
        });
    };



