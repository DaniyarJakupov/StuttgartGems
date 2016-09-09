var express         = require("express"),
    app             = express(),
    bodyP           = require("body-parser"),
    mongoose        = require("mongoose"),
    mOverride       = require("method-override"),
    eSanitizer      = require("express-sanitizer"),
    passport        = require("passport"),
    localStrategy   = require("passport-local"),
    passportLocMon  = require("passport-local-mongoose"),
    flash           = require("connect-flash"),
    seedDB          = require("./seeds");
    
//=== Requiring all Routes ==================================
var indexRoutes     = require("./routes/index"),
    gemsRoutes      = require("./routes/gems"),
    commentRoutes   = require("./routes/comments");
//=== App Config ========================================
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyP.urlencoded({extended: true}));
app.use(mOverride("_method"));
app.use(eSanitizer());
app.use(flash());
//seedDB();
//=== DB Config ==========================================
mongoose.connect(process.env.DATABASEURL);
//"mongodb://localhost/gems"
//mongoose.connect("mongodb://daniyar:chelsea42@ds019986.mlab.com:19986/stuttgartgems");
//
var Gem     = require("./models/gem");
var Comment = require("./models/comment");
var User    = require("./models/user");
//==== PASSPORT Config =================================================
app.use(require("express-session")({
    secret: "Run like bridge four",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//=== Provides all pages with currentUser id
app.use(function(req, res, next){
     res.locals.currentUser = req.user;
     res.locals.error = req.flash("error");
     res.locals.success = req.flash("success");
     next();
});

//=== Using Required Routes =====================================================
app.use(indexRoutes);
app.use("/gems", gemsRoutes);
app.use("/gems/:id/comments", commentRoutes);
//==============================================================================
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is running");
})