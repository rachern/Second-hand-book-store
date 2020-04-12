const mongoose = require('mongoose');

//轮播图集合结构
const carouselSchema = new mongoose.Schema({
    name:{//图片名称
        type:String
    },
    url:{//图片路径
        type:String,
        required:true,
        trim:true
    }
})

//轮播图集合模型
const Carousel = mongoose.model('carousel',carouselSchema);

module.exports = Carousel