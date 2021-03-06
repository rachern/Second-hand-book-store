const User = require('../db/model/user')
const mongoose = require('mongoose')

function createUser(username, password, phoneNumber) {
    return User.create({
        username,
        password,
        phoneNumber,
        url: 'http://localhost:3000/imgs/default_avatar.png',
        sex: 0,
        introduction: '',
        email: '',
        roles: ['user'],
        message: {
            systemMessage: {
                unread: [],
                read: []
            },
            interactiveMessage: {
                unread: {},
                read: {}
            }
        }
    })
}

function findUser(user) {
    return User.findOne(user, {password: 0})
}

function checkPassword(_id, password) {
    return User.findOne({ _id, password })
}

function updatePassword(_id, newPassword) {
    return User.findByIdAndUpdate(_id,{password: newPassword})
}

function updateInformation(_id, information) {
    const { username, imageUrl, sex, introduction, phoneNumber, email } = information
    return User.findByIdAndUpdate(_id, {username, url: imageUrl, sex, introduction, phoneNumber, email})
}

// 更新收藏夹
function updateCollections(id, collections) {
    return User.findOneAndUpdate({_id: id}, {collections})
}

// 获取当前用户的收藏
function getCollections(id) {
    return User.findOne({_id: id},{_id: 1, collections: 1})
}

// 外联购物车列表
function getMyCartList(id) {
    return User.aggregate([{
        $match: {
            _id: mongoose.Types.ObjectId(id)
        }
    },{
        $unwind: "$cartList"
    },{
        $lookup: {
            from: 'books',
            localField:'cartList.id',
            foreignField:'_id',
            as:'linked_cartList'
        }
    },{
        $group: {
            _id: "$_id",
            cartList: {$push:"$cartList"},
            linked_cartList: {$push:{$arrayElemAt:["$linked_cartList",0]}}
        }
    }])
}

// 更新购物车列表
function updateCartList(id, cartList) {
    return User.findOneAndUpdate({_id: id}, {cartList})
}

// 获取用户列表
function getUsers(limit, skip) {
    return User.find({},{password:0}).skip(parseInt(skip)).limit(parseInt(limit))
}

// 重置用户密码
function resetPassword(id, password) {
    return User.findOneAndUpdate({_id: id}, {password})
}

// 删除用户
function removeUser(id) {
    return User.findByIdAndRemove(id)
}

// 根据用户id获取用户权限
function getUserRolesById(id) {
    return User.findOne({_id: id}, {roles: 1})
}

// 根据用户id修改用户权限
function updateUserRolesById(id, roles) {
    return User.findByIdAndUpdate(id, {roles})
}

// 向购物车添加商品数量
function addToShoppingCart(_id, id, num) {
    return User.findOneAndUpdate({_id, 'cartList.id':mongoose.Types.ObjectId(id)}, {$set: {'cartList.$.num': num}})
}

// 向购物车添加书籍
function moveToShoppingCart(_id, obj) {
    return User.findOneAndUpdate({_id}, {$push: {'cartList': obj}})
}

// 向收藏夹添加书籍
function moveToCollections(_id, id) {
    return User.findOneAndUpdate({_id}, {$push: {collections:mongoose.Types.ObjectId(id)}})
}

// 获取用户的消息列表
function getMessages(username) {
    return User.findOne({username}, {message: 1})
}

// 获取所有的用户
function getAllUsers() {
    return User.find()
}

// 写入系统未读消息
function pushSystemMessage(username, title, content) {
    return User.findOneAndUpdate({ username }, { $push: {'message.systemMessage.unread': {title, content}}}, {new: true})
}

// 已读系统消息
function hasReadSystemMessage(username, newState) {
    return User.findOneAndUpdate({ username }, {'message.systemMessage': newState}, {new: true})
}
 
// 写入互动消息
function pushInteractiveMessage(username, message) {
    return User.findOneAndUpdate({ username }, {'message.interactiveMessage': message}, {new: true})
}

// 已读互动消息
function hasReadInteractiveMessage(username, message) {
    return User.findOneAndUpdate({ username }, {message}, {new: true})
}

// 根据用户id获取用户信息
function getUserById(userList) {
    return User.find({_id: {$in: userList}}, {url: 1, username: 1})
}

module.exports = {
    createUser,
    findUser,
    checkPassword,
    updatePassword,
    updateInformation,
    getCollections,
    // cartList,
    getMyCartList,
    updateCartList,
    updateCollections,
    getUsers,
    resetPassword,
    removeUser,
    getUserRolesById,
    updateUserRolesById,
    addToShoppingCart,
    moveToShoppingCart,
    moveToCollections,
    getMessages,
    getAllUsers,
    pushSystemMessage,
    hasReadSystemMessage,
    pushInteractiveMessage,
    hasReadInteractiveMessage,
    getUserById
}