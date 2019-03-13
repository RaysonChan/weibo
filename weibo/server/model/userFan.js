//用户粉丝
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user');
var userArticle = require('./userArticle');

mongoose.connect('mongodb://localhost/weibo', {
    useNewUrlParser: true
})

var fanSchema = new Schema({
    //用户
    user_id: {
        type: Schema.Types.ObjectId,
        required: [true],
        ref: 'User'
    },
    //目标对象
    operate_id: [{
        type:Schema.Types.ObjectId,
        required:[true],
        ref:'User'
    }],
    //当目标对象为关注者，标示为 1 关注
    //当目标对象为被关注者，标示为 2 粉丝
    //当双方互相关注，标示为 3
    status: Number,
    name: {
        type: String,
        required: [true]
    }
});

var UserFan = mongoose.model('userFan', fanSchema);


//UserFan.find({name:'小绿',$or:[{status:1},{status:3}]}).populate('operate_id').exec(function (err,doc) {
    //console.log(doc[0].operate_id[0].name);
    // userArticle.find({name:doc[0].operate_id[0].name},function (err,docs) {
    //     console.log(docs);
    // })
//})
module.exports = UserFan;