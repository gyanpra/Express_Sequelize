const db = require("../models");
const Employee = db.employees;
const Op = db.Sequelize.Op;

//Create and Save a new Employee
exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Atleast Enter name"
    });
    return;
  }
  const employee = {
    name: req.body.name,
    designation: req.body.designation,
    department: req.body.department ? req.body.department : false
  };


  
  Employee.create(employee)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error Creating new Employee"
      });
    });
};


//find all Employees
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

  Employee.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error Getting Employees"
      });
    });
};


//find a single Employee with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Employee.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Employee with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error getting Employee id=" + id
      });
    });
};


// Update a Employee by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Employee.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Employee updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Employee with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Employee with id=" + id
      });
    });
};


// Delete a Employee from the database with id.
exports.delete = (req, res) => {
  const id = req.params.id;

  Employee.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Employee deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Employee with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Can't Delete Employee with id=" + id
      });
    });
};



// Delete all Employees from the database.
exports.deleteAll = (req, res) => {
  Employee.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Employees were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while deleting All Employees."
      });
    });
};
