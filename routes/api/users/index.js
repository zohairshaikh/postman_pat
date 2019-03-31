exports.get_users = function (req, res) {
    res.status(200).send({users: global.users})
};
