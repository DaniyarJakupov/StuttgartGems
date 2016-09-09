var mongoose = require("mongoose");

//Setting Up Comment Schema
var commentSchema = new mongoose.Schema({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }, 
        username: String
    }
});
var Comment = mongoose.model("Comment", commentSchema);

//Export Comment model
module.exports = Comment;