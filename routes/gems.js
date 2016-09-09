var express = require("express");
var router  = express.Router();

var Gem         = require("../models/gem");
var middleware  = require("../middleware");    

//======================== GEMS Routes =========================================
//=== INDEX Route ===
router.get("/", function(req, res){
    //Get gems from DB
    Gem.find({}, function(err, allgems){
        if(err){
            console.log(err);
        } else {
            res.render("gems/index", {gems: allgems});
        }
    }); 
});  
//=== NEW Route ===
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("gems/new");
});
//=== CREATE Route ===
router.post("/", middleware.isLoggedIn, function(req, res){
   //Get data from form and Create a new Gem and save to DB
   Gem.create(req.body.gem, function(err, newGem){
       if(err){
           console.log(err);
       } else {
           
            //add username and ID to new Gem
            newGem.author.id = req.user._id;
            newGem.author.username = req.user.username;
            //save Gem
            newGem.save();
            //redirect back to Gems page 
            res.redirect("/gems");
       }
   });
});
//=== SHOW Route ===
router.get("/:id", function(req, res){
    //Find the Gem with provided ID
    Gem.findById(req.params.id).populate("comments").exec(function(err, foundGem){
        if(err){
            console.log(err);
        } else {
            //Render template with that Gem
            res.render("gems/show", {gem: foundGem});        
        }
    });
});
//=== EDIT Route ===
router.get("/:id/edit", middleware.checkGemOwnership, function(req, res){
    Gem.findById(req.params.id, function(err, foundGem){
       if(err){
           console.log(err);
       } else {
          res.render("gems/edit", {gem: foundGem});
       } 
    }); 
});
//=== UPDATE Route ===
router.put("/:id", middleware.checkGemOwnership, function(req, res){
    req.body.gem.description = req.sanitize(req.body.gem.description);
    Gem.findByIdAndUpdate(req.params.id, req.body.gem, function(err, updatedGem){
        if(err){
            console.log(err);
        } else {
            res.redirect("/gems/" + req.params.id);     
        }
    });
});
//=== DELETE Route ===
router.delete("/:id", middleware.checkGemOwnership, function(req, res){
    Gem.findByIdAndRemove(req.params.id, function(err, removedGem){
        if(err){
            console.log(err);
        } else {
            req.flash("success", "Gem was deleted"); 
            res.redirect("/gems");
        }
    });
});
//===========================================================================
module.exports = router;