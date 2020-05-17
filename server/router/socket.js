// const { pushSystemMessage } = require('../service/message')
const { getMessages, getAllUsers, pushSystemMessage, hasReadSystemMessage } = require('../service/user')

module.exports = function(io) {
    // 用于存储在线用户的对象
    let users = {}

    io.on('connection', socket => {
        // 用户登录之后，记录登录的用户，发送对应的消息
        socket.on('username', async username => {
            const messages = await getMessages(username)
            // 发送消息给对应用户
            io.sockets.to(socket.id).emit('accept messages', messages.message)
            if(username) {
                users[username] = socket.id
            }
        })

        // 监听系统消息
        socket.on('send systemMessage', async data => {
            const { selectedUsers, title, content } = data
            // 用于存储要写入数据库的用户名称
            let allUsersList = [] 
            // 判断是否推送给指定用户，如果没有指定用户，则默认发送给所有人
            if(selectedUsers.length === 0) {
                // 获取所有的用户
                const allUsers = await getAllUsers()
                allUsers.forEach(user => {
                    allUsersList.push(user.username)
                })
            } else {
                // 如果指定用户
                allUsersList = selectedUsers
            }
            // 写入用户的系统未读消息中
            for(let user of allUsersList) {
                await pushSystemMessage(user, title, content)
            }
            // 获取在线用户的消息进行发送
            for(let user in users) {
                const message = await getMessages(user)
                io.sockets.to(users[user]).emit('accept messages', message.message)
                console.log(user,message)
            }
            // io.sockets.emit('accept message', data)
        })

        // 已读系统消息，将用户的未读消息全部移到已读
        socket.on('hasReadSystemMessage', async data => {
            const message = await getMessages(data)
            let newState = {
                unread: [],
                read: message.message.systemMessage.read.concat(message.message.systemMessage.unread)
            }
            await hasReadSystemMessage(data,newState)
            const newMessage = await getMessages(data)
            io.sockets.to(users[data]).emit('accept messages', newMessage.message)
        })
    })
}