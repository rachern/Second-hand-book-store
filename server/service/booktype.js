const BookType = require('../db/model/booktype')

function getBookType() {
    // return BookType.aggregate([{$group : {_id: "$level_1",arr: { $push: {_id:'$_id',level_2:'$level_2'} }}}])
    return BookType.find()
}

module.exports = {
    getBookType
}