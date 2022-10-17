
const {User} = require("../../../model/lvl1/User") 
const md5 = require("md5")



const loginCheck = async (user, pass) => {
    
  try { 
    const see = await User.findOne({ email: user});

    if (see) {
                const passW = md5(pass)
            if (see.password === passW) {
                // console.log(see)
                return true
            } 
            else if(see.password != passW) {
                return false
            }
        
        } else if (!see) {
            return false
        }

        } catch (err) {
            console.log(err.message)
        }


}

module.exports = { loginCheck }
