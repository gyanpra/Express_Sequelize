module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true

        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        hashedPassword: {
            type: Sequelize.STRING,
            allowNull: false
        },
        phone: {
            type: Sequelize.STRING,
            allowNull: true
        },

        isAdmin: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },  
        address: {
            type: Sequelize.STRING,
            allowNull: true
        },
    });
  
    return User;
  };

