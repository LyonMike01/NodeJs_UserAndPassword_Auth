

const {User} = require("../../../model/lvl1/User")
const uuid = require("uuid")


const createUser = async (email, pass) => {
  const newProfile = await User.create({
    id: uuid.v4(),
    email: email,
    password: pass
  });
    return newProfile;
};


module.exports = { createUser }

