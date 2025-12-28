require("dotenv").config();
const app = require('./app.js');

const connectDB = require('./config.js');
const port = 5000 ;
app.listen(port,console.log("Server is running now"));

connectDB();