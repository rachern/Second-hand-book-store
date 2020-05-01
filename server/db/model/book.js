const mongoose = require('mongoose');

//书籍集合结构
const bookSchema = new mongoose.Schema({
    author:{//作者
        type:String,
        trim:true
    },
    title:{//书名
        type:String,
        trim:true
    },
    originalPrice:{//原价
        type:Number
    },
    presentPrice:{//现价
        type:Number
    },
    number:{//数量
        type:Number
    },
    url:{//图片地址
        type:String,
        trim:true
    },
    feature:[Object], //产品特色
    publisher:{//出版社
        type:String,
        trim:true
    },    
    ISBN:{//国际标准书号
        type:String,
        trim:true
    },
    edition:{//版次
        type:Number
    },
    code:{//商品编码
        type:String,
        trim:true
    },
    classification:{//所属分类
        type:mongoose.Schema.Types.ObjectId,
        ref:'books_type'
    },
    pack:{//包装
        type:String,
        trim:true
    },
    size:{//开本
        type:String,
        trim:true
    },
    publishingTime:{//出版时间
        type:String,
        trim:true
    },
    paper:{//用纸
        type:String,
        trim:true
    },
    recommend:{//编辑推荐
        type:String
    },
    contentIntroduction:{//内容简介
        type:String
    },
    authorIntroduction:{//作者简介
        type:String
    },
    digest:{//目录
        type:String
    },
    issuer:{//发布者
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    state:{//书籍状态
        //待审核  0
        //已发布  1
        //已驳回  2
        type:Number,
        enum:[0,1,2]
    },
    rejectReason: {//驳回原因
        type: String,
        default: ''
    }
})

//书籍集合模型
const Book = mongoose.model('book',bookSchema);

module.exports = Book