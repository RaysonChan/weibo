var express = require('express');
var bodyParser = require('body-parser');
var route = require('./api/index');
var path =require('path');
var session = require('express-session');
var cookieParser  = require('cookie-parser');


var app = express();



//暴露静态资源
app.use('../node_modules/',express.static(path.join(__dirname,'../node_modules/')));
//设置端口号
app.set('port', (process.env.port || 3000));
//配置body-parser插件
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//配置cookie-parser插件
app.use(cookieParser('keyboard cat'));
//配置express-session插件
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
  }));

//使用路由
route(app);




app.listen(app.get('port'), function () {
    console.log('GetData http://localhost:' + app.get('port'))
});