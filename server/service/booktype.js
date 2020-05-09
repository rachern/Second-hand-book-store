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

// 删除书籍分类
function deleteBookType(bookType) {
    if(bookType.level_2 === '') {
        return BookType.deleteMany({level_1: bookType.level_1});
    } else {
        return BookType.deleteOne(bookType);
    }
}

// 判断修改后的书籍分类是否存在
function findBookType2(updateClassificationForm, updateClassificationForm2) {
    if(updateClassificationForm.level_2 === '') {
        return BookType.find({level_1: updateClassificationForm2.level_1})
    } else {
        return BookType.findOne(updateClassificationForm2)
    }
}

// 修改书籍分类
function updateBookType(updateClassificationForm, updateClassificationForm2) {
    if(updateClassificationForm.level_2 === '') {
        return BookType.updateMany({level_1:updateClassificationForm.level_1},{level_1:updateClassificationForm2.level_1})
    } else {
        return BookType.updateOne(updateClassificationForm, updateClassificationForm2)
    }
}

module.exports = {
    getBookType,
    findBookType,
    findBookType2,
    addBookType,
    deleteBookType,
    updateBookType
}