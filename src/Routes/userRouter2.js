
const express = require("express");
const router = express.Router();


const { 
        register, 
        login,
        } = require  ("../control/lvl1/app");


        const { regUser, secrets, seeLogin } = require  ("../control/lvl5.1/app");
        
// profile routes

router.post("/register", regUser);

router.get("/register", register);

router.get("/login", login);

router.get("/secret", secrets);


router.post("/login", seeLogin);


module.exports =  {router};