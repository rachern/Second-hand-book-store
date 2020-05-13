const mongoose = require('mongoose')

// 创建角色集合规则
const roleSchema = new mongoose.Schema({
    role: { // 角色
        type: String
    },
    roleName: { // 角色名称
        type: String
    }
})

// 将Schema对象转化为数据模型
const Role = mongoose.model('role', roleSchema);

module.exports = Role;