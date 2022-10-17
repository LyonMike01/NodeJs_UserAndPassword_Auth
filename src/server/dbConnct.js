const express = require ("express");
const mongoose = require ("mongoose");
require("dotenv").config()
const {connect} = mongoose;
const URI = process.env.MONGOURI;



exports.connectToDB = () => {
    connect(URI,() => {
                console.log("Connected to Database")
                },
            (err) => { 
                console.log(err.message) 

                }

)};

