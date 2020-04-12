const mongoose = require('mongoose')

const Book = require('../db/model/book')

function getFirstFiveBooks(id) {
    return Book.find({classification: id},{_id:1,author:1,title:1,presentPrice:1,url:1,classification:1}).limit(5)
}

function getClassificationBooksCount(id) {
    return Book.find({classification: id}).countDocuments()
}

function getClassificationBooks(id, limit, skip) {
    return Book.aggregate([{
        //用于过滤数据，只输出符合条件的文档
        $match: {
            classification: mongoose.Types.ObjectId(id)
        }
    }, {
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

module.exports = {
    getFirstFiveBooks,
    getClassificationBooks,
    getClassificationBooksCount,
    getBookDetail
}