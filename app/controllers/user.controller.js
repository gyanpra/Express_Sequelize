const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');




//Register User
exports.create = (req, res) => {
  if (!req.body.email || !req.body.hashedPassword) {
    res.status(400).send({
      message: "Atleast Enter email and password"
    });
    return;
  }
  let namedata = req.body.name;
  const user = {
      name: namedata,
      email: req.body.email,
      hashedPassword: bcrypt.hashSync(req.body.hashedPassword, 8),
      phone: req.body.phone,
      isAdmin: req.body.isAdmin,
      address: req.body.address,

  };
  User.create(user)
    .then(data => {
      res.send("User Registered Successfully.");
    },mailer(req.body.email,namedata))
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error Creating new User."
      });
    });
};


//login User
exports.login = (req, res) => {
  if (!req.body.email || !req.body.hashedPassword) {
    res.status(400).send({
      message: "Atleast Enter email and password"
    });
    return;
  }
  User.findOne({
      where: {
        email: req.body.email
      }
    })
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: "User Not Found"
        });
      }
      const passwordIsValid = bcrypt.compareSync(
        req.body.hashedPassword,
        user.hashedPassword
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
      const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, 'secret', { expiresIn: 86400 });
      res.status(200).send({
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin,
        token: token
      });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User"
      });
      console.log(err);
    });
}


// welcome mail configurations.
//using nodemailer

const mailer = (email, name) => {
  var nodemailer = require('nodemailer');
  var transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 587,
      secure: false,
      auth: {
          user: 'demou9521@gmail.com',
          pass: 'demouser123'
      }
  });

  var mailOptions = {
      from: 'demou9521@gmail.com',
      to: email,
      subject: 'Welcome Mail',
      text: 'Thank you '+ name +' for Registering with us. We will be happy to serve you.'
  };

  transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
          console.log(error);
      } else {
          console.log('Email sent: ' + info.response);
      }
  }


  );
}