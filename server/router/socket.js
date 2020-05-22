// const { pushSystemMessage } = require('../service/message')
const { getMessages, 
        getAllUsers, 
        pushSystemMessage, 
        hasReadSystemMessage,
        pushInteractiveMessage,
        hasReadInteractiveMessage } = require('../service/user')

module.exports = function(io) {
    // 用于存储在线用户的对象
    let users = {}

    io.on('connection', socket => {
        // 用户登录之后，记录登录的用户，发送对应的消息
        socket.on('username', async username => {
            const messages = await getMessages(username)
            // 发送消息给对应用户
            if(messages) {
                io.sockets.to(socket.id).emit('accept messages', messages.message)
            }
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
                const message = await pushSystemMessage(user, title, content)
                // 判断用户是否在线
                if(users[user]) {
                    io.sockets.to(users[user]).emit('accept messages', message.message)
                }
            }
        })

        // 已读系统消息，将用户的未读消息全部移到已读
        socket.on('hasReadSystemMessage', async data => {
            const message = await getMessages(data)
            let newState = {
                unread: [],
                read: message.message.systemMessage.read.concat(message.message.systemMessage.unread)
            }
            const newMessage = await hasReadSystemMessage(data,newState)
            // const newMessage = await getMessages(data)
            io.sockets.to(users[data]).emit('accept messages', newMessage.message)
        })

        // 监听互动消息
        socket.on('send interactiveMessage', async data => {
            // console.log(data)
            console.log(data)
            const toUsername = data.to.username
            const fromUsername = data.from.username
            const toUser = await getMessages(toUsername)
            const fromUser = await getMessages(fromUsername)
            // console.log(toUser.message.interactiveMessage)
            // console.log(fromUser.message.interactiveMessage)
            if(toUser.message.interactiveMessage.unread[JSON.stringify(data.from._id)]) {
                toUser.message.interactiveMessage.unread[JSON.stringify(data.from._id)].push({
                    from: data.from,
                    content: data.content
                })
            } else {
                toUser.message.interactiveMessage.unread[JSON.stringify(data.from._id)] = [{
                    from: data.from,
                    content: data.content
                }]
            }
            
            if(fromUser.message.interactiveMessage.read[JSON.stringify(data.to._id)]) {
                fromUser.message.interactiveMessage.read[JSON.stringify(data.to._id)].push({
                    to: data.to,
                    content: data.content
                })
            } else {
                fromUser.message.interactiveMessage.read[JSON.stringify(data.to._id)] = [{
                    to: data.to,
                    content: data.content
                }]
            }
            
            const newToMessage = await pushInteractiveMessage(toUsername,toUser.message.interactiveMessage)
            const newFromMessage = await pushInteractiveMessage(fromUsername,fromUser.message.interactiveMessage)
            // console.log(newToMessage)
            // console.log(newFromMessage)
            // 如果接收方在线
            if(users[toUsername]) {
                io.sockets.to(users[toUsername]).emit('accept messages', newToMessage.message)
            }
            io.sockets.to(users[fromUsername]).emit('accept messages', newFromMessage.message)
        })

        // 已读互动消息，将对应用户的未读消息移到已读
        socket.on('hasReadInteractiveMessage', async data => {
            const { user, other } = data
            // console.log(data)
            const messages = await getMessages(user)
            const message = messages.message
            let newRead = []
            // console.log(message.interactiveMessage.read[other])
            if(!message.interactiveMessage.read[JSON.stringify(other._id)]) {
                message.interactiveMessage.read[JSON.stringify(other._id)] = []
            }
            if(message.interactiveMessage.unread[JSON.stringify(other._id)]) {
                newRead = message.interactiveMessage.read[JSON.stringify(other._id)].concat(message.interactiveMessage.unread[JSON.stringify(other._id)])
            } else {
                newRead = message.interactiveMessage.read[JSON.stringify(other._id)]
            }
            message.interactiveMessage.read[JSON.stringify(other._id)] = newRead
            message.interactiveMessage.unread[JSON.stringify(other._id)] = []
            const newMessage = await hasReadInteractiveMessage(user, message)
            io.sockets.to(users[user]).emit('accept messages', newMessage.message)
        })

        // 联系卖家
        socket.on('contactSeller', async data => {
            const { username, toUser } = data
            const messages = await getMessages(username)
            const { message } = messages
            if(!message.interactiveMessage.read[toUser] && !message.interactiveMessage.unread[toUser]) {
                message.interactiveMessage.unread[toUser] = []
                const newMessage = await hasReadInteractiveMessage(username, message)
                io.sockets.to(users[username]).emit('accept messages', newMessage.message)
            }
        })
    })
}