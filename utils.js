class Utils {

    getUUID() {
        var firstPart = (Math.random() * 46656) | 0;
        var secondPart = (Math.random() * 46656) | 0;
        firstPart = ("000" + firstPart.toString(36)).slice(-3);
        secondPart = ("000" + secondPart.toString(36)).slice(-3);
        return firstPart + secondPart;
    }

    generateGlobalHardCodedData() {
        global.users = [{
            "name": "Zohair",
            "uid": 1,
            "online": false, messages: []
        }, {
            "name": "Tushar",
            "uid": 2,
            "online": false, messages: []
        }, {
            "name": "Shubham",
            "uid": 3,
            "online": false, messages: []
        }, {
            "name": "Samrudhi",
            "uid": 4,
            "online": false, messages: []
        }];

    }
}

module.exports = Utils;
