const BookType = require('../db/model/booktype')

function getBookType() {
    // return BookType.aggregate([{$group : {_id: "$level_1",arr: { $push: {_id:'$_id',level_2:'$level_2'} }}}])
    return BookType.find()
}

// 判断书籍分类是否存在
function findBookType(bookType) {
    return BookType.findOne(bookType)
}

// 添加书籍分类
function addBookType(bookType) {
    return BookType.create(bookType)
}

module.exports = {
    getBookType,
    findBookType,
    addBookType
}