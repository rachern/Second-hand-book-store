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

//向外暴露操作轮播图的接口
module.exports = {
    //获取所有轮播图
    findAll:function(){
        return Carousel.find();
    },
    //增加一张图片
    create:function(carousel){
        return Carousel.create(carousel);
    }
    //删除图片

    //修改图片
}