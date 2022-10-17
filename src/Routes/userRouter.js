
const express = require("express");
const router = express.Router();


const { regUser, 
        register, 
        login,
        confirmLogin} = require  ("../control/lvl1/app");


// profile routes

router.post("/register", regUser);

router.get("/register", register);

router.get("/login", login);

router.post("/login", confirmLogin);


module.exports =  {router};