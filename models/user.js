var  mongoose       = require("mongoose");
var passportLocMon  = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    username: String,
    password: String
});

userSchema.plugin(passportLocMon);

var User = mongoose.model("User", userSchema);

module.exports = User;