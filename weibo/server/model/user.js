//用户账户
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/weibo',{ useNewUrlParser: true });


var userSchema = new Schema({
    //邮箱
    email: {
        type: String,
        required: [true]
    },
    //密码
    password: {
        type: String,
        required: [true]
    },
    //用户名
    name:String
});


var User = mongoose.model('User', userSchema);

module.exports = User;