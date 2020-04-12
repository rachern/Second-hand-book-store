const User = require('../db/model/user')

function createUser(username, password, phoneNumber) {
    return User.create({
        username,
        password,
        phoneNumber,
        url: 'http://localhost:3000/imgs/default_avatar.png',
        sex: 0,
        introduction: '',
        email: '',
        role: ['user']
    })
}

function findUser(user) {
    return User.findOne(user)
}

module.exports = {
    createUser,
    findUser
}