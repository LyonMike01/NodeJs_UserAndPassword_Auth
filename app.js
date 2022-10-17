
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session")
const ejs = require("ejs");
const PORT= 8090;
const app = express();
const {connectToDB} = require("./src/server/dbConnct");
const {router} = require("./src/Routes/userRouter2");
const path = require("path")
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json())
app.use(cookieParser())
app.use(session({
  secret: "Things happening sha",
  resave: false,
  saveUninitialized:false
}))



app.use("/", router);

connectToDB();

app.get("/", (req, res) => {
  res.render("home");
});


app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});


module.exports = app