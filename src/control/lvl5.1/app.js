
const {createUser} = require ("../../services/create/lvl5/createUser")
const jwt = require("jsonwebtoken");
const {loginCheck} = require("../../services/login/lvl5/loginCheck")

const secret = "thisismylittlebitsecrete.uhnhuhnhuhnhuhnhuhnhuhnhu."
const maxAge = ((60 * 60)/20)

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


