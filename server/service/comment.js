const Comment = require('../db/model/comment')

function getCommentCount(id) {
    return Comment.find({book: id}).countDocuments()
}

function getComments(id, limit, skip) {
    return Comment.find({book: id})
                  .skip(parseInt(skip))
                  .limit(parseInt(limit))
                  .populate('reviewer')
}

module.exports = {
    getCommentCount,
    getComments
}