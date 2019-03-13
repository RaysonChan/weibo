const express = require('express');
const router = express.Router();
const user = require('../model/user');

//用户登录
router.post('/api/login', function (req, res) {
    user.findOne({
        email: req.body.email
    }, function (err, doc) {
        if (err) {
            console.log(err);
        }
        //如果查询不到文档，说明数据库里没有这个用户，提前退出
        if (!doc) {
            return res.status(200).send({
                message: '用户名不存在，请重新输入或注册一个！',
                code: 110
            })
        }
        //先查询到数据库里有这个用户，再验证密码的正确性
        if (doc.password == req.body.password) {
            res.status(200).send({
                message: '登录成功，欢迎您！',
                code: 111,
                name:doc.name
            })
        } else {
            res.status(200).send({
                message: '密码错误，请重新输入！',
                code: 112
            })
        }
    })
})


module.exports = router;