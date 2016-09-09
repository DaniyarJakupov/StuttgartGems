var express = require("express");
var router  = express.Router({mergeParams: true});

var Gem     = require("../models/gem");
var Comment = require("../models/comment");
var middleware  = require("../middleware");    

//======================= COMMENTS ROUTES ===================================
//=== Comments NEW  ===
router.get("/new", middleware.isLoggedIn, function(req, res){
    //find gem by id
    Gem.findById(req.params.id, function(err, foundGem){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {gem: foundGem});     
        }
    });
});
//=== Comments CREATE ===
router.post("/", middleware.isLoggedIn, function(req, res){
    //lookup gem using ID
    Gem.findById(req.params.id, function(err, foundGem) {
       if(err){
           console.log(err);
       } else {
            //create new comment
            Comment.create(req.body.comment, function(err, newComment){
                if(err){
                    req.flash("error", "Ooops, something went wrong, sorry!")
                    console.log(err);
                } else {
                    //add username and id to comment
                    newComment.author.id = req.user._id;
                    newComment.author.username = req.user.username;
                    //save comment
                    newComment.save();
                    //connect new comment to gem
                    foundGem.comments.push(newComment);
                    foundGem.save();
                    //redirect
                    req.flash("success", "Your comment is created")
                    res.redirect("/gems/" + req.params.id);
                }
            });        
       }
    });
});

//=== EDIT Route =====
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if(err){
            console.log(err);
        } else {
            res.render("comments/edit", {gem_id: req.params.id, comment: foundComment}); 
             }
        });
});
//===UPDATE ROUTE ====
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            console.log(err);
        } else {
            res.redirect("/gems/" + req.params.id);       
        }
    });
});
//=== DELETE ROUTE ===
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
   Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            console.log(err);
        } else {
            req.flash("success", "Comment was deleted"); 
            res.redirect("/gems/" + req.params.id);
        }
   }); 
});
//=============================================================================
module.exports = router;