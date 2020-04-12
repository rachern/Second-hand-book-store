const Carousel = require('../db/model/carousel')

function  getCarousel() {
    return Carousel.find().limit(8)
}

module.exports = {
    getCarousel
}