const express = require("express");
const app = express();
const contributorsRoute = require("./routes/contributors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

dotenv.config();
mongoose.connect(process.env.MONGO_URI, () => {
  console.log("Connection to database established");
});

app.use(cors());
app.use(contributorsRoute);

app.listen("9090", () => {
  console.log("Server running on port 9090");
});
