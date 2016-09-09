var express = require("express");
var router  = express.Router();
var passport = require("passport");

var User    = require("../models/user");

//=== Root ROUTE ===============================================================
router.get("/", function(req, res){
    res.render("landing");
});

//=========================== AUTH ROUTES ===================================
//=== Show Register form =============================
router.get("/register", function(req, res){
    res.render("register");
});
//Handle POST Req to /register
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            console.log(err);
            return res.render("register");
        } 
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to Stuttgart Gems, " + user.username);
            res.redirect("/gems");
        });
    });
});
//=== LOGIN FORM ==========================
router.get("/login", function(req, res) {
    res.render("login");
});
//Handle login logic
router.post("/login", passport.authenticate("local", {
  successRedirect: "/gems",
  //req.flash("error", "User with this combination of login/password does not exist");
  failureRedirect: "/login"
}), function(req, res){
    
});
//Handle Logout logic
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged You Out!");
    res.redirect("/gems");
});

//========================================================================
module.exports = router;