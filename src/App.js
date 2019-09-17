const express = require("express");
const app = express();

const productRoutes = require("./routes/shops");
const userRoutes = require("./routes/user");
const attendanceRoutes = require("./routes/attendance");

app.use("/shops", productRoutes);
app.use("/users", userRoutes);
app.use("/attendance", attendanceRoutes);

module.exports = app;
