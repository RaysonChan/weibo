const express = require('express');
const router = express.Router();
const userArticle = require('../model/userArticle');
const userFan = require('../model/userFan');
const user = require('../model/user');

//返回首页的文章
router.post('/api/', function (req, res) {
    if (req.body.isPublic) {
        userArticle.find({
            isPublic: req.body.isPublic
        }, function (err, docs) {
            res.status(200).send(docs);
        }).sort({
            _id: -1
        })
    }
    if (req.body.name) {
        let userFanName = []; //存放第一次查询结果
        let userArticles = []; //存放查询结果
        userFan.find({
            name: req.body.name,
            $or: [{
                    status: 1
                },
                {
                    status: 3
                }
            ]
        }).populate('operate_id').exec().then(function (docs) {
            docs.forEach(function (item) {
                item.operate_id.forEach(function (item) {
                    userFanName.push(item.name)
                })
            });
            const promise = userFanName.map(function (item) {
                return userArticle.find({
                    name: item
                }).sort({
                    _id: -1
                });
            })
            return Promise.all(promise)
        }).then(function (bankInfoList) {
            for (let i = 0; i < userFanName.length; i++) {
                let obj = {};
                Object.assign(obj, JSON.parse(JSON.stringify(bankInfoList[i])));
                userArticles.push(obj);
            }
            return new Promise((resolve, reject) => {
                resolve(userArticles);
            })
        }).then((userArticles) => {
            return new Promise(() => {
                res.send(userArticles);
                return;
            })
        }).catch((e) => {
            console.log(e);
            return;
        })
    }
});
//用户点赞文章
router.post('/api/home', function (req, res) {
    userArticle.findOne({
        _id: req.body._id
    }).exec(function (err, doc1) {
        if (err) {
            res.status(500).send('Serve error!');
            return;
        }
        user.findOne({
            name: req.body.name
        }).exec(function (err, doc2) {
            if (err) {
                res.status(500).send('Serve error!');
                return;
            }
            //doc2._id 用户ID doc1._id 当前文章的id
            let like = [];
            like = doc1.like;
            let bool = like.find(function (item) {
                return item.toString() === doc2._id.toString();
            })
            if (bool) {
                res.status(200).send({
                    message:'用户以点赞过！',
                    length:like.length
                });
                return;
            } else {
                like.push(doc2._id);
            }
            userArticle.updateOne({
                _id: req.body._id
            }, {
                like: like
            }).exec(function () {
                console.log('成功!');
                res.status(200).send({
                    message:'点赞成功！',
                    length:like.length
                });
            })
        })
    })
})
//用户转发文章
router.post('/api/share',function (req,res) {
})
router.post('/api/me/remove',function (req,res) {
    console.log(req.body)
    userArticle.deleteOne({_id:req.body._id}).exec(function () {
        userArticle.find({name:req.body.name}).exec(function (err,doc) {
            res.send(doc);
        })
    })
})
module.exports = router;