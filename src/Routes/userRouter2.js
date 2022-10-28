
const express = require("express");
const router = express.Router();


const { 
        register, 
        login,
        } = require  ("../control/lvl1/app");


        const { regUser, 
                secrets, 
                seeLogin, 
                forgetPassword, 
                verifyToken,
                resetPassword,
                getMail
                } = require  ("../control/lvl5.1/app");
        
// profile routes

router.post("/register", regUser);

router.get("/register", register);

router.get("/login", login);

router.get("/secret", secrets);

router.post("/login", seeLogin);

router.get("/forget_password", forgetPassword);

router.post("/forget_password", getMail);

router.get("/reset/:id/:token", verifyToken);

router.post("/reset/:id/:token", resetPassword)


module.exports =  {router};