//用户文章的评论
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/weibo',{ useNewUrlParser: true });

var userArticleCommentSchema = new Schema({
    name:{
        type:String,
        required:[true]
    },
    content:{
        type:String,
        required:[true]
    },
    date:{
        type:Date,
        default:Date.now
    },
    like:{
        type:Number,
        required:[true]
    },
    comment:{
        type:Number,
        required:[true]
    }
});

var UserArticleComment = mongoose.model('UserArticleComment',userArticleCommentSchema);

module.exports = UserArticleComment;