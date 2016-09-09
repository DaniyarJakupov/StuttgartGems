var Gem     = require("../models/gem");
var Comment = require("../models/comment");

var middleware = {};

// ==== Middleware for loggedin
middleware.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You Need To Be Logged In");
    res.redirect("/login");
};

 //==== Middleware for checking GEM authorization
middleware.checkGemOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        Gem.findById(req.params.id, function(err, foundGem){
            if(err){
                req.flash("error", "Gem is not found");
                res.redirect("/gems");
            } else {
                if(foundGem.author.id.equals(req.user._id) || req.user.username === "admin"){
                    next();
                } else {
                    req.flash("error", "You don't have permession to do that");
                    res.redirect("/gems");   
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in");
        res.redirect("/gems");
    }
};

//Middleware for COMMENT authorization
middleware.checkCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                req.flash("error", "Comment is not found")
                console.log(err);
            } else {
                if(foundComment.author.id.equals(req.user._id) || req.user.username === "admin"){
                    next();
                } else {
                    req.flash("error", "You don't have permession to do that")
                    res.redirect("/gems");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in");
        res.redirect("/gems");
    }
};
//==============================================================================
module.exports = middleware;

