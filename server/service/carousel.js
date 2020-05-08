const Carousel = require('../db/model/carousel')

// 获取首页轮播图
function  getCarousel() {
    return Carousel.find().sort({_id: -1}).limit(8)
}

// 获取所有轮播图
function getAllCarousel() {
    return Carousel.find()
}

//根据id删除轮播图
function deleteCarousel(id) {
    return Carousel.findOneAndDelete({_id: id})
}

//添加轮播图
function addCarousels(carousels) {
    return Carousel.insertMany(carousels)
}

module.exports = {
    getCarousel,
    getAllCarousel,
    deleteCarousel,
    addCarousels
}