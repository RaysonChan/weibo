const express = require('express');
const router = express.Router();
const user = require('../model/user');

//用户注册
router.post('/api/me/register',function (req,res) {
    user.findOne({
        email:req.body.email
    },function (err,doc) {
        if(err){
            console.log(err);
        }
        if(doc){
            return res.status(200).send('用户已存在，请重新输入！');
        }else{
            const newUser = {
                email:req.body.email,
                password:req.body.password,
                name:req.body.name
            };
            new user(newUser).save();
            res.status(200).send('注册成功！');
        }
    })
})


module.exports = router;