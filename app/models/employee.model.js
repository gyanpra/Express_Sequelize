
module.exports = (sequelize, Sequelize) => {
    const Employee = sequelize.define("employee", {
      name: {
        type: Sequelize.STRING
      },
      designation: {
        type: Sequelize.STRING
      },
      department: {
        type: Sequelize.STRING
      }
    });
  
    return Employee;
  };