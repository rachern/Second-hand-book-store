const mongoose = require('mongoose')

const AskingBook = require('../db/model/askingbook')

// 获取征书墙书籍数量
function getAskingBookCount() {
    return AskingBook.find({state: 0}).countDocuments()
}

// 分页获取征书墙书籍
function getAskingBooks(limit, skip) {
    return AskingBook.find({state: 0})
                     .sort({_id: -1})
                     .skip(parseInt(skip))
                     .limit(parseInt(limit))
                     .populate('askingPerson')
}

// 发布征书信息
function postAskingBook(_id, askingBook) {
    const { title, press, publishingTime, author, pictures, state } = askingBook
    return AskingBook.create({
        title,
        press,
        publishingTime,
        author,
        pictures,
        state,
        askingPerson: mongoose.Types.ObjectId(_id)
    })
}

// 获取最新3条征书消息
function getFirstThreeBooks(id) {
    return AskingBook.find({askingPerson: id}, {_id: 1, title: 1}).sort({_id: -1}).limit(3)
}

//获取本人发布的征书数量
function getMyAskingBooksCount(id) {
    return AskingBook.find({askingPerson: id}).countDocuments()
}

//获取本人的征书信息
function getMyAskingBooks(id, limit, skip) {
    return AskingBook.find({askingPerson: id})
                     .sort({_id: -1})
                     .skip(parseInt(skip))
                     .limit(parseInt(limit))
}

//完成征书
function complete(id) {
    return AskingBook.findByIdAndUpdate(id, {state: 1}, {new: true})
}

//取消征书
function cancel(id) {
    return AskingBook.findByIdAndUpdate(id, {state: 2}, {new: true})
}

module.exports = {
    getAskingBookCount,
    getAskingBooks,
    postAskingBook,
    getFirstThreeBooks,
    getMyAskingBooksCount,
    getMyAskingBooks,
    complete,
    cancel
}