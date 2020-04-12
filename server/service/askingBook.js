const AskingBook = require('../db/model/askingbook')

function getAskingBookCount() {
    return AskingBook.find({state: 0}).countDocuments()
}

function getAskingBooks(limit, skip) {
    return AskingBook.find({state: 0})
                     .skip(parseInt(skip))
                     .limit(parseInt(limit))
                     .populate('askingPerson')
}

module.exports = {
    getAskingBookCount,
    getAskingBooks
}