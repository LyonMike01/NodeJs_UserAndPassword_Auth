
const {createUser} = require ("../../services/create/lvl4/createUser")
const jwt = require("jsonwebtoken");
const {loginCheck} = require("../../services/login/lvl4/loginCheck");
const { render } = require("ejs");
const {User} = require("../../../src/model/lvl1/User");
const secret = "thisismylittlebitsecrete.uhnhuhnhuhnhuhnhuhnhuhnhu."
const maxAge = ((60 * 60)/20)

const md5 = require("md5")



exports.regUser = async (req, res, next) => {
    try {
        const {username, password } = req.body;
        const newUser = await createUser(username, password)
        if (username && password){
        const payload = {
          id: newUser.id,
          email: newUser.email
        }
        const token = jwt.sign(
                         payload, 
                         secret, 
                         { expiresIn: maxAge }
                         );

                         res.cookie ("jwt", token, {
                          secure: true,
                          httpOnly: true,
                          maxAge: (maxAge * 1000)
                                  })
        res.render("secrets");

    } else { 
      res.render("register");

  }
}
    catch (err) {
      console.log(err.message);
    }
  };

  exports.seeLogin = async (req, res, next) => {
    try {
        const {username, password } = req.body;
        const newUser = await loginCheck(username, password)
        
        if(newUser) {
        const payload = {
          id: newUser.id,
          email: newUser.email
        }
      
        const token = jwt.sign(
                         payload, 
                         secret, 
                         { expiresIn: maxAge }
                         );
        res.cookie ("jwt", token, {
                          secure: true,
                          httpOnly: true,
                          maxAge: (maxAge * 1000)
                                  })
  
       res.render("secrets");
  
    } else{
      res.render("login")
    }
  
  } catch (err) {
      console.log(err.message);
    }
  };
  

  exports.secrets = async (req, res, next) => {
    try {
      const token = req.cookies.jwt;
 jwt.verify( token, secret,
                  (err, user) => { 
        if (err) {
          res.render("login")
        } else {
        res.render("secrets")
      }} )
      
    }
    catch (err) {
      console.log(err.message)
}
  }

exports.forgetPassword = async (req, res, next) =>  {
  try {
    res.render("forget")
  } catch (err) {
    console.log(err.message)
  }
}

exports.getMail = async (req, res, next) =>  {

  try {
    const email = req.body.email

    const user = await User.findOne({ email: email});

    //make sure user exist in database
    if (!user) {
      res.send("user not registered")
      return;
    }

    // create a temporary link 

    const secrets = secret + user.password

    const payload = {
      email: user.email,
      id: user.id
    }

    const token = jwt.sign(payload, secrets, {expiresIn: "10m"})
    const link = `http://localhost:8090/reset/${user.id}/${token}`
    const data = {
                  from: "noreply@gmail.org",
                  to: user.email,
                  subject: "Password Reset",
                  html: `<p>Hi ${user.email}</p>
                  <p>Please click on the following <a href="${link}">link</a> to reset your password.</p> 
                  <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`
              }
    console.log(data)

  res.status(200).json({
    Restpassword: "Password reset link has been sent to your email....."
  })} 
  
  catch (err) {
  console.log(err.message)
  }

  }


exports.verifyToken = async (req, res, next) =>  {
  try {
    const {id, token } = req.params;
    const user = await User.findOne({ id: id});

    //check if the id exist in the database
    if (!user) {
      res.redirect("/login")
    }
    //we have a valid id, and a valid user with the id

    const secrets = secret + user.password

    const payload = jwt.verify(token, secrets)

    if (payload){
    res.render("reset", {email: User.email})
    }
  } catch (err) {
    console.log(err.message)
  }
}

exports.resetPassword = async (req, res, next) =>  {
  try {
    const {id, token } = req.params;
    const {password, password2 } = req.body;
    const user = await User.findOne({ id: id});

    //check if the id exist in the database
    if (!user) {
      res.redirect("/login")
    }
    const secrets = secret + user.password
    const payload = jwt.verify(token, secrets)

    //validate password and password2 should match
    //find the user with the payload email and id and finally update with new password
    //always hash the password before saving
    if (payload) {
      if (password === password2) {
        user.password = md5(password)
        user.save()
    res.redirect("/login")
      }
    }
  } catch (err) {
    console.log(err.message)
  }
}

