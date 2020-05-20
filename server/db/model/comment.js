const mongoose = require('mongoose')
const moment = require('moment')

// 创建评论集合规则
const commentSchema = new mongoose.Schema({
    content: {//评论内容
        type: String,
        required: true
    },
    score: {//打分
        type: Number,
        required: true
    },
    createdTime: {//评论时间
        type: String,
        default: () => moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    },
    reviewer: {//评论者
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    book: {//评论书籍
        type: mongoose.Schema.Types.ObjectId,
        ref: 'book'
    }
})

//评论集合模型
const Comment = mongoose.model('comment', commentSchema)

module.exports = Comment