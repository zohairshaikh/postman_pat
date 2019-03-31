

const users = require('./users');


module.exports = function (app) {
    app.route('/api/get_users').get(users.get_users);

};
