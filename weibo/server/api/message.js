const express = require('express');
const router = express.Router();
const message = require('../model/message');

//获取服务器发送的默认消息
router.get('/api/msg',function (req,res) {
    message.find({},function (err,docs) {
        if(err){
            return res.status(500).send('Server error!');
        }
        res.status(200).send(docs);
    }).sort({_id:-1})
})

module.exports = router;