
const {User} = require("../../../model/lvl1/User") 




const loginCheck = async (user, pass) => {
    
  try { 
    const see = await User.findOne({ email: user});

    if (see) {
            if (see.password === pass) {
                // console.log(see)
                return true
            } 
            else if(see.password != pass) {
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
