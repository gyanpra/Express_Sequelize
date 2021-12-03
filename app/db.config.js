module.exports = {
    host: 'localhost',
    user: 'root',
    password: 'postgresql123',
    database: 'training',
    dialect: 'postgres',
    logging: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
        
    }
};


// sequelize
// .authenticate()
// .then(function (err) {
//   console.log("Connection has been established successfully.");
// })
// .catch(function (err) {
//   console.log("Unable to connect to the database:", err);
// });