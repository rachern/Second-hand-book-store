const mongoose = require('mongoose')

// 创建消息集合规则
const messageSchema = mongoose.Schema({
    username: { // 用户名
        type: String
    }, 
    systemMessage: { // 系统消息
        type: Object
    },
    interactiveMessage: { // 互动消息
        type: Object
    }
})

// 将Schema对象转化为数据模型
const Message = mongoose.model('message', messageSchema);

module.exports = Message;