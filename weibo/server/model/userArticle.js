//用户发表的文章
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var user = require('./user');
var userArticleComment = require('./userArticleComment');

mongoose.connect('mongodb://localhost/weibo', {
    useNewUrlParser: true
});

var userArticleSchema = new Schema({
    article: {
        type: String,
        required: [true]
    },
    name: {
        type: String,
        required: [true]
    },
    //保存用户文章评论的id
    comment: [Schema.Types.ObjectId],
    //保存的用户id
    like: [Schema.Types.ObjectId],
    data: {
        type: Date,
        default: Date.now
    },
    isPublic: Boolean
});

var UserArticle = mongoose.model("UserArticle", userArticleSchema);

module.exports = UserArticle;