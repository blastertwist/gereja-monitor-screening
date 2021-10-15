const app = require('express').Router();
const tokenVerifier = require('../middlewares/TokenVerifier');
const authorizationVerifier = require('../middlewares/authorizationVerifier');
const ScreeningController = require('../controllers/ScreeningController');


app.post("/create-screen-format", tokenVerifier, authorizationVerifier, ScreeningController.createScreeningFormat);
app.patch("/edit-screen-format", tokenVerifier, authorizationVerifier, ScreeningController.editScreeningFormat);
app.delete("/delete-screen-format", tokenVerifier, authorizationVerifier, ScreeningController.deleteScreeningFormat);

app.post("/new-screening", tokenVerifier, authorizationVerifier, ScreeningController.newScreening);

app.get("/fetch-all-screen-data", ScreeningController.fetchAllScreenData);

module.exports = app;