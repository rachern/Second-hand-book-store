const mongoose = require('mongoose')
const moment = require('moment')

//求购书籍集合结构
const askingBookSchema = new mongoose.Schema({
    title: {//书籍标题
        type: String,
        trim: true
    },
    press: {//出版社
        type: String,
        trim: true
    },
    publishingTime: {//出版时间
        type: String,
        trim: true
    },
    author: {//书籍作者
        type: String,
        trim: true
    },
    askingPerson: {//发布征求书籍信息的用户
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    pictures: {//书籍的图片
        type: Array
    },
    createdTime: {//发布信息的时间
        type: String,
        default: () => moment(new Date()).format('YYYY-MM-DD')
    },
    state: {//发布状态（0：已发布，1：已完成，2：已取消）
        type: Number,
        enum: [0,1,2]
    }
})

//求购书籍集合模型
const AskingBook = mongoose.model('asking_book', askingBookSchema)

module.exports = AskingBook