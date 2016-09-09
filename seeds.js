var mongoose    = require("mongoose");
var Gem         = require("./models/gem.js");
var Comment     = require("./models/comment.js");


var data = [
        {
            name: "Stuttgart City Library", 
            image: "https://media-cdn.tripadvisor.com/media/photo-s/06/d8/b4/1e/stadtbibliothek-stuttgart.jpg",
            description: "From 1965 to 2011, the Central Library of Stuttgart was located in the Wilhelmspalais in Stuttgart. This building was built 1834 - 1840 by Giovanni Salucci. It was the place of residence of King Wilhelm II of the Kingdom of Württemberg. In 2011 the Central library moved to the newly built Stadtbibliothek am Mailänder Platz."
        },
        {
            name: "Mercedes-Benz Museum", 
            image: "https://media-cdn.tripadvisor.com/media/photo-s/0c/ca/52/f3/fb-img-1472752322684.jpg",
            description: "The Mercedes-Benz Museum is an automobile museum in Stuttgart, Germany. It covers the history of the Mercedes-Benz brand and the brands associated with it."
        },
        {
            name: "Wilhelma Zoo and Botanical Garden", 
            image: "https://media-cdn.tripadvisor.com/media/photo-s/01/3c/a9/da/stuttgart-baden-wurttemberg.jpg",
            description: "Zoological-botanical garden in Stuttgart in the Bad Cannstatt District in the north of the city on the grounds of a historic castle. Wilhelma Zoo is one of the most popular tourist destinations in Baden-Württemberg, seeing more than 2 million visitors annually."
        },
        {
            name: "Neues Schloss", 
            image: "https://media-cdn.tripadvisor.com/media/photo-s/03/ff/92/e6/new-castle-neues-schloss.jpg",
            description: "One of the last large city palaces to be built in Southern Germany, is the magnificent 17th Century Baroque residence of the Kings of Württemberg from 1746 to 1797 and from 1805 to 1807"
        }
    ];

function seedDB(){
    //REMOVE ALL GEMS from DB
    Gem.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("GEMS are removed");
        //ADD GEMS to DB from data array
        data.forEach(function(seed){
            Gem.create(seed, function(err, gem){
                if(err){
                    console.log(err);
                } else {
                    console.log("Gem is added");
                    //create a comment
                    Comment.create(
                        {
                            text: "This is comment",
                            author: "Vin"
                        }, function(err, newComment){
                            if(err){
                                console.log(err);
                            } else {
                                gem.comments.push(newComment); 
                                gem.save();
                                console.log("New comment is created");
                            }
                        });
                }
            });
        });
        });
}

module.exports = seedDB;