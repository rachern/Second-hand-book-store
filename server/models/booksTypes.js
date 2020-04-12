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
    },
    books:[{type:mongoose.Schema.Types.ObjectId,ref:'book'}]
})

//书籍类型集合模型
const BooksTypes = mongoose.model('books_type',booksTypesSchema);

//向外暴露操作数据库的接口
module.exports = {
    //创建一个新的分类
    create:function(bookstype){
        return BooksTypes.create(bookstype);
    },
    //删除一个分类
    delete:function(id){
        return BooksTypes.findOneAndDelete(id);
    },
    //查询全部分类
    findAll:function(){
        return BooksTypes.find();
    }
}