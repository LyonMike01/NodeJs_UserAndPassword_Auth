

const {User} = require("../../../model/lvl1/User")
const md5 = require("md5")
const uuid = require("uuid")


const createUser = async (email, pass) => {
  const newProfile = await User.create({
    id: uuid.v4(),
    email: email,
    password: md5(pass),
  });
    return newProfile;
};


module.exports = { createUser }

