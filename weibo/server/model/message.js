//系统和用户发给当前用户的消息
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// var user = require('./user');
mongoose.connect('mongodb://localhost/weibo',{ useNewUrlParser: true });

var messageSchema = new Schema({
    message:{
        type:String,
        required:[true]
    },
    like:{
        type:Number,
        required:[true]
    },
    date:{
        type:Date,
        default:Date.now
    }
});

var Message = mongoose.model('Message',messageSchema);

module.exports = Message;