var express = require('express');
var postRouter = express.Router();
var Post = require('../models/Post.js');
var mongoose = require('mongoose');



//get all posts
postRouter.get('/', function (req, res, next) {

    Post.find(function (err, thePosts) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(thePosts);
        }
    });
});

//create new post
postRouter.post('/', function (req, res, next) {

    var newPost = new Post();

    newPost.title = req.body.title;  // set the users name (comes from the request)
    newPost.productName = req.body.productName;
    newPost.price = req.body.price;
    newPost.posterId = new mongoose.mongo.ObjectID(req.body.posterId);
    newPost.postDate = new Date();

    if (!newPost) {
        res.end("ErrorMessage: Typed name is undefined or null");
        return;
    }

    // save the bear and check for errors
    newPost.save(function (err) {
        if (err)
            res.send(err);

        res.json({message: newPost});
    });
});

//delete post with id
postRouter.delete('/:postId', function (req, res, next) {

    var id = req.params.postId;
    Post.remove({_id: id}, function (err, theBear) {
        if (err) {
            res.send(err);
        }
        res.json({message: "The post with id " + id + " is now deleted!"});
    });
});

module.exports = postRouter;

