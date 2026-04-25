require("dotenv").config();
const app = require("./app");

const connectDB = require("./config/db");
connectDB();

const User = require("./models/User");
const PORT = process.env.PORT || 5000;
app.listen(PORT,() => {
    console.log(`server is running on port ${PORT}`);
});