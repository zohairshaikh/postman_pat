/**
 * @description - It will have all the middleware
 */
module.exports = function (app) {
    require('./routes')(app);
};
