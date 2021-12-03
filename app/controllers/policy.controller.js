const db = require("../models");
const Policy = db.policies;
const Op = db.Sequelize.Op;

//Create and Save a new Policy
exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Atleast Enter name"
    });
    return;
  }
  const policy = {
        number: req.body.number,
        name: req.body.name,
        amount: req.body.amount,
        matAmnt: req.body.matAmnt,
        nominee: req.body.nominee,
  };
  Policy.create(policy)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error Creating new Policy"
      });
    });
};


//find all Employees
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

  Policy.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error Getting Policies"
      });
    });
};


//find a single Employee with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Policy.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Policy with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error getting Policy id=" + id
      });
    });
};


// Update a Employee by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Policy.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Policy updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Policy with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Policy with id=" + id
      });
    });
};


// Delete a Employee from the database with id.
exports.delete = (req, res) => {
  const id = req.params.id;

  Policy.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Policy deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Policy with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Can't Delete Policy with id=" + id
      });
    });
};



// Delete all Employees from the database.
exports.deleteAll = (req, res) => {
  Policy.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Policies were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while deleting All Policies."
      });
    });
};
