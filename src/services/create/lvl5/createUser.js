

const {User} = require("../../../model/lvl1/User")
const bcrypt = require("bcryptjs")
var salt = bcrypt.genSaltSync(10);
const uuid = require("uuid")



const createUser = async (email, pass) => {
  const hash = bcrypt.hashSync(pass, salt);

  const newProfile = await User.create({
    id: uuid.v4(),
    email: email,
    password: hash
  });

    return newProfile;
};


module.exports = { createUser }

