const Comment = require('../db/model/comment')

// 获取评论数量
function getCommentCount(id) {
    return Comment.find({book: id}).countDocuments()
}

// 获取所有评论
function getComments(id, limit, skip) {
    return Comment.find({book: id})
                  .sort({_id: -1})
                  .skip(parseInt(skip))
                  .limit(parseInt(limit))
                  .populate('reviewer')
}

// 发表评论
function addComments(comment) {
    return Comment.create(comment)
}

module.exports = {
    getCommentCount,
    getComments,
    addComments
}