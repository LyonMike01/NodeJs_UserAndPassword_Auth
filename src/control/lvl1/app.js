
const {createUser} = require ("../../services/create/lvl5/createUser")
const {loginCheck} = require ("../../services/login/lvl5/loginCheck")




exports.regUser = async (req, res, next) => {
    try {
        const {username, password } = req.body;
        const newUser = await createUser(username, password)
        res.render("secrets");

    } catch (err) {
      console.log(err.message);
    }
  };

  exports.register = async (req, res, next) => {
    try {
        res.render("register");
    } catch (err) {
      console.log(err.message);
    }
  };

  
  exports.login = async (req, res, next) => {
    try {
        res.render("login");
    } catch (err) {
      console.log(err.message);
    }
  };


  
exports.confirmLogin = async (req, res, next) => {
  try {
      const {username, password } = req.body;
     const user = await loginCheck(username, password)
   
     if (user) {
     res.render("secrets")
    } else if (!user) {
      res.render("login")
    }
    }
catch (err) {
  console.log(err.message);
}
}