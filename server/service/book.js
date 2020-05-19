const mongoose = require('mongoose')

const Book = require('../db/model/book')

function getFirstFiveBooks(id) {
    return Book.find({classification: id, state: 1},{_id:1,author:1,title:1,presentPrice:1,url:1,classification:1}).sort({_id: -1}).limit(5)
}

function getClassificationBooksCount(id) {
    return Book.find({classification: id, state: 1}).countDocuments()
}

function getClassificationBooks(id, limit, skip) {
    return Book.aggregate([{
        //用于过滤数据，只输出符合条件的文档
        $match: {
            classification: mongoose.Types.ObjectId(id),
            state: 1
        }
    }, {
        //倒序查找
        $sort: {
            _id: -1
        }
    },{
        //在聚合管道中跳过指定数量的文档，并返回余下的文档
        $skip: parseInt(skip)
    }, {
        //用来限制MongoDB聚合管道返回的文档数
        $limit: parseInt(limit),
    }, {
        //连表查询
        $lookup: {
            from:'books_types',
            localField:'classification',
            foreignField:'_id',
            as:'classifications'
        }
    }, {
        //修改输入文档的结构
        $project: {
            author: 1,
            classifications: 1,
            presentPrice: 1,
            title: 1,
            url: 1
        }
    }])
}

function getBookDetail(id) {
    return Book.findOne({_id: id}).populate('classification').populate('issuer')
}

// 上传书籍信息
function postBook(id, bookForm) {
    const { classification } = bookForm
    bookForm.classification = mongoose.Types.ObjectId(classification)
    bookForm.issuer = mongoose.Types.ObjectId(id)
    return Book.create(bookForm)
}

// 获取当前用户最新发布的4本书籍
function getLatestFourBooks(id) {
    return Book.find({issuer: id},{_id: 1, url: 1, title: 1}).sort({_id: -1}).limit(4)
}

// 获取当前用户发布的书籍
function getMyPublishBooks(id, limit, skip) {
    return Book.find({issuer: id}).sort({_id: -1}).skip(parseInt(skip)).limit(parseInt(limit))
}

// 获取当前用户发布的书籍数量
function getMyPublishBooksCount(id) {
    return Book.find({issuer: id}).countDocuments()
}

// 根据用户的收藏数组获取书籍
function getMyCollectionBooks(bookIds) {
    return Book.find({$or: bookIds}).sort({_id: -1})
}

// 获取待审核上架的书籍数量
function getPostBookReviewCount() {
    return Book.find({state: 0}).countDocuments()
}

// 获取待审核上架的书籍
function getPostBookReviewList(limit, skip) {
    return Book.find({state: 0}).sort({_id: -1}).skip(parseInt(skip)).limit(parseInt(limit))
}

// 通过待上架书籍审核
function passPostBook(id) {
    return Book.findOneAndUpdate({_id: id}, {state: 1})
}

// 修改书籍剩余数量
function updateBooksNum(id, num) {
    return Book.findOneAndUpdate({_id: id}, {number: num}, {new: true})
}

// 驳回待上架书籍审核
function rejectPostBook(id, rejectReason) {
    return Book.findOneAndUpdate({_id: id}, {state: 2, rejectReason})
}

module.exports = {
    getFirstFiveBooks,
    getClassificationBooks,
    getClassificationBooksCount,
    getBookDetail,
    postBook,
    getLatestFourBooks,
    getMyPublishBooks,
    getMyPublishBooksCount,
    getMyCollectionBooks,
    getPostBookReviewCount,
    getPostBookReviewList,
    passPostBook,
    rejectPostBook,
    updateBooksNum
}