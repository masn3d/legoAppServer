var express = require('express');
var userRouter = express.Router();
var User = require('../models/User.js');
var Post = require('../models/Post.js');


//get all the user's posts.
userRouter.get('post/:userId', function (req, res, next) {

    var id = req.params.userId;

    Post.find({posterId: "id"}, function (err, thePosts) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(thePosts);
        }
    });
});

//get all users
userRouter.get('/', function (req, res, next) {

    User.find(function (err, userNames) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(userNames);
        }
    });
});

//get user with id.
userRouter.get('/:userId', function (req, res, next) {

    var id = req.params.userId;

    User.findById(id, function (err, theUser) {

        if (err) {
            res.send(err);
        }
        res.json({message: theUser});
    })
});

//delete user with id (will also delete users posts)
userRouter.delete('/:userId', function (req, res, next) {

    var id = req.params.userId;

    //removes all the posts associated with this user
    Post.remove({posterId: id}, function (err) {
        if (err) {
            res.send(err);
        }
        res.json({message: "The post with id " + id + " is now deleted!"});
    });

    //them removes the user
    User.remove({_id: id}, function (err, theUser) {
        if (err) {
            res.send(err);
        }
        res.json({message: "The post with id " + id + " is now deleted!"});
    });
});


//create new user.
userRouter.post('/:userName/:userPassword', function (req, res, next) {

    var newUser = new User();

    newUser.username = req.params.userName;  // set the users name (comes from the request)
    newUser.password = req.params.userPassword;

    //res.json({message: newUser.username + "," + newUser.password});

    if (!newUser.username) {
        res.end("ErrorMessage: Typed name is undefined or null");
        return;
    }

    // save the bear and check for errors
    newUser.save(function (err) {
        if (err)
            res.send(err);

        res.json({message: newUser});
    });
});

module.exports = userRouter;
