const app = require('express').Router();
const UserRoutes = require('./userRoutes');
const ScreeningRoutes = require('./screeningRoutes');

app.use("/user", UserRoutes);
app.use("/screening", ScreeningRoutes);

module.exports = app;