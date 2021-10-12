const app = require('express').Router();
const UserController = require("../controllers/UserController")


//  User Register
app.post("/user-register", UserController.userRegister);

//  User Login
app.get("/user-login", UserController.userLogin);

//  Fetch User
app.get("/user-fetch", UserController.getUserData);

//  Edit User Info
app.patch("/user-edit", UserController.editUserData);


module.exports = app;