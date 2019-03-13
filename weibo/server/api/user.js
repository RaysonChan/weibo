const express = require('express');
const router = express.Router();
const userArticle = require('../model/userArticle');
const userFan = require('../model/userFan');
const user = require('../model/user');

//个人微博的文章
router.post('/api/me/MyWeibo', function (req, res) {
    userArticle.find({
        name: req.body.name
    }, function (err, docs) {
        if (err) {
            return res.status(500).send('Serve error!');
        }
        res.status(200).send(docs);
    }).sort({
        _id: -1
    })
});
//获取粉丝用户
router.post('/api/me/MyFollower', function (req, res) {
    userFan.find({
        name: req.body.name,
        status: 2
    }).populate('operate_id').exec(function (err, docs) {
        if (err) {
            return res.status(500).send('Serve error!');
        }
        let userNames = [];
        docs.forEach(function (item) {
            item.operate_id.forEach(function (item) {
                userNames.push(item.name);
            })
        })
        res.status(200).send(userNames);
    })
});
//获取关注用户
router.post('/api/me/MyFollow', function (req, res) {
    userFan.find({
        name: req.body.name,
        status: 1
    }).populate('operate_id').exec(function (err, docs) {
        if (err) {
            return res.status(500).send('Serve error!');
        }
        let userNames = [];
        docs.forEach(function (item) {
            item.operate_id.forEach(function (item) {
                userNames.push(item.name);
            })
        })
        res.status(200).send(userNames);
    })
});
//提交文章到个人微博
router.post('/api/post', function (req, res) {
    new userArticle({
        name: req.body.name,
        article: req.body.article,
        isPublic: req.body.isPublic
    }).save();
    res.status(200).send('保存成功！');
})
//搜索用户
router.post('/api/searchUser', function (req, res) {
    user.findOne({
        name: req.body.name
    }).exec(function (err, doc) {
        if (err) {
            res.status(500).send('Server error!');
            console.log(err);
        }
        res.status(200).send(doc);
    })
})
//关注用户
router.post('/api/followUser', function (req, res) {
    //req.body.name 当前登录账号的name
    //req.body._id 关注的用户的id
    user.findOne({
        _id: req.body._id
    }).exec(function (err, doc1) {
        if (err) {
            res.status(500).send('Serve error!');
            return;
        }
        if (doc1.name == req.body.name) {
            res.status(200).send('不能关注自己！');
            return;
        } else {
            userFan.findOne({
                name: req.body.name,
                status: 1
            }).exec(function (err, doc2) {
                if (err) {
                    res.status(500).send('Serve error!');
                    return;
                }
                if (!doc2) {
                    //创建一个新的userFan文档
                    user.findOne({
                        name: req.body.name
                    }).exec(function (err, newUser) {
                        new userFan({
                            name: req.body.name,
                            user_id: newUser._id,
                            operate_id: [],
                            status: 1
                        }).save(function (err) {
                            if (err) {
                                res.status(500).send('Serve error!');
                                return;
                            }
                            followUser();
                        })

                    })
                } else {
                    followUser();
                }

            })





            //关注用户的封装方法
            let followUser = function () {
                userFan.findOne({
                    name: req.body.name,
                    status: 1
                }).exec(function (err, doc2) {
                    if (err) {
                        res.status(500).send('Serve error!');
                        return;
                    }
                    let idCollection = doc2.operate_id,
                        bool = '';
                    if (idCollection.length !== 0) {
                        bool = idCollection.find(function (item) {
                            return item.toString() === req.body._id.toString();
                        })
                    }
                    if (bool) {
                        res.status(200).send('当前账号已被关注！');
                        return;
                    } else {
                        idCollection.unshift(req.body._id);
                        userFan.updateOne({
                            name: req.body.name,
                            status: 1
                        }, {
                            operate_id: idCollection
                        }).exec(function () {
                            res.send('关注成功！');
                            //粉丝
                            userFan.findOne({
                                status: 2,
                                user_id: req.body._id
                            }).exec(function (err, fanUser) {
                                if (err) {
                                    res.status(500).send('Server error!');
                                    return;
                                }
                                if (!fanUser) {
                                    new userFan({
                                        name: doc1.name,
                                        user_id: doc1._id,
                                        operate_id: [],
                                        status: 2
                                    }).save(function (err,product) {
                                        if (err) {
                                            res.status(500).send('Server error!');
                                            return;
                                        }
                                        saveFan();
                                    })
                                }else{
                                    saveFan();
                                }
                                
                            })
                        })


                        //保存粉丝
                        let saveFan = function () {
                            userFan.findOne({
                                name: doc1.name,
                                status: 2
                            }).exec(function (err, userFanDoc) {
                                if (err) {
                                    res.status(500).send('Serve error!');
                                    return;
                                }
                                console.log(userFanDoc);
                                let IDCollection = userFanDoc.operate_id;
                                user.findOne({
                                    name: req.body.name
                                }).exec(function (err, account) {
                                    IDCollection.unshift(account._id);
                                    userFan.updateOne({
                                        name: doc1.name,
                                        status: 2
                                    }, {
                                        operate_id: IDCollection
                                    }).exec(function () {
                                        console.log('保存粉丝成功！');
                                    })
                                })

                            })
                        }
                    }
                })
            }

        }
    })
})
module.exports = router;