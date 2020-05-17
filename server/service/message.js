const Message = require('../db/model/message')

// 写入系统未读消息
function pushSystemMessage(allUsersList, title, content) {
    allUsersList.forEach(user => {
        const hasUser = Message.find({username: user})
        if(hasUser) {
            // Message.findOneAndUpdate({username: user}, {$push: { '' }})
        }
    })
}

module.exports = {
    pushSystemMessage
}