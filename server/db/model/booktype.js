const mongoose = require('mongoose');

//书籍类型集合结构
const booksTypesSchema = new mongoose.Schema({
    level_1:{//一级分类
        type:String,
        trim:true
    },
    level_2:{//二级分类
        type:String,
        trim:true
    }
    // books:[{type:mongoose.Schema.Types.ObjectId,ref:'book'}]
})

//书籍类型集合模型
const BookType = mongoose.model('books_type',booksTypesSchema);

module.exports = BookType