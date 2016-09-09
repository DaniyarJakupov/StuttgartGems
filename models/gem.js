var mongoose = require("mongoose");

//Schema Setup
var gemSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Comment"
                }
            ]
});
var Gem = mongoose.model("Gem", gemSchema);

module.exports = Gem;