const express = require("express");
const app = express();
const cors = require('cors');
const authjwt = require('./app/helpers/authjwt');

app.use(express.json());

app.use(cors());
app.options('*', cors());
app.use(authjwt());

const db = require("./app/models");
db.sequelize.sync();




//Demo route for test
// app.get("/", (req, res) => {
//   res.json({ message: "Hi Gyan" });
// });


require("./app/routes/employee.routes")(app);
require("./app/routes/policy.routes")(app);
require("./app/routes/user.routes")(app);



app.listen(8080, () => {
    console.log("Server is running on port 8080, http://localhost:8080");
});
