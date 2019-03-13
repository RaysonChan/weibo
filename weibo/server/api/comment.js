const express = require('express');
const router = express.Router();
const userArticleComment = require('../model/userArticleComment');
const userArticle = require('../model/userArticle');
router.post('/api/weibos/weiboinfo', function (req, res) {
    let comments = req.body.comment;
    let result = [];
    (function () {
        const promise = comments.map(function (item) {
            return userArticleComment.findOne({
                _id: item
            }).sort({
                _id: 1
            })
        });
        return Promise.all(promise)
    })().then(function (bankInfoList) {
        for (let i = 0; i < comments.length; i++) {
            let obj = {};
            Object.assign(obj, JSON.parse(JSON.stringify(bankInfoList[i])));
            result.push(obj);
        }
        return new Promise((resolve, reject) => {
            resolve(result);
        })
    }).then(function (result) {
        return new Promise(() => {
            res.send(result);
            return;
        })
    }).catch(function (e) {
        console.log(e);
        return;
    })
})

//发表评论
router.post('/api/postContent', function (req, res) {
    let bool,comment = [];
    new userArticleComment(req.body).save().then(function (doc1) {
        userArticle.findOne({
            _id: req.body.articleID
        }).exec(function (err,doc2) {
            if(err){
                res.status(500).send('Serve error!');
                return;
            }
            comment = doc2.comment;
            comment.unshift(doc1._id);
            userArticle.update({_id:req.body.articleID},{comment:comment}).exec(function () {
                console.log('评论成功！');
                res.status(200).send('发表评论成功!');
            })
            
        })
    })
})






module.exports = router;