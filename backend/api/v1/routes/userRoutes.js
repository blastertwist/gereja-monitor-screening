const app = require('express').Router();
const UserController = require("../controllers/UserController")
const tokenVerifier = require('../middlewares/TokenVerifier');
const authorizationVerifier = require('../middlewares/authorizationVerifier');


//  User Register
app.post("/user-register", UserController.userRegister);

//  User Login
app.get("/user-login", UserController.userLogin);

//  Fetch User
app.get("/user-fetch", tokenVerifier, authorizationVerifier, UserController.getUserData);

//  Edit User Info
app.patch("/user-edit", tokenVerifier, authorizationVerifier, UserController.editUserData);


module.exports = app;