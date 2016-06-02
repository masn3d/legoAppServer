// app/models/bear.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },
    firstName: {
        type:String
    },
    lastName: {
        type: String,
    },
    postsId: [Schema.Types.ObjectId]
});

module.exports = mongoose.model('User', UserSchema);
