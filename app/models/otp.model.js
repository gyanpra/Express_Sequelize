module.exports = (sequelize, Sequelize) => {
    const Otp = sequelize.define("otp", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        otp: {
            type: Sequelize.STRING,
            allowNull: false
        },
        expiresIn: {
            type: Sequelize.DATE,
            allowNull: false
        },
    });
  
    return Otp;
  };