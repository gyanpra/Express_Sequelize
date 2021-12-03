module.exports = (sequelize, Sequelize) => {
    const Policy = sequelize.define("policy", {
      number: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.STRING
      },
      matAmnt: {
        type: Sequelize.STRING
        },
        nominee:{
            type: Sequelize.STRING
        }
    });
  
    return Policy;
  };

  