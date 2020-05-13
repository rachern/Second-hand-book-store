const Role = require('../db/model/role')

// 获取角色列表
function getRoles() {
    return Role.find()
}

module.exports = {
    getRoles
}