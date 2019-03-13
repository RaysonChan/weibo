var article = require('./article');
var login = require('./login');
var message = require('./message');
var user = require('./user');
var register = require('./register');
var comment = require('./comment');

module.exports = (app) => {
    app.use(article);
    app.use(login);
    app.use(message);
    app.use(user);
    app.use(register);
    app.use(comment);
};