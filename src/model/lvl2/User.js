
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");



const userSchema = new mongoose.Schema({
    id: String,
    email: String,
    password: String,

})

const secret = "thisismylittlebitsecrete.";

userSchema.plugin(encrypt, { secret: secret, encryptedFields: ["password"] });
 
const User = mongoose.model("User", userSchema);

module.exports = { User };
