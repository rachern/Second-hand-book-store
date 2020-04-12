const express = require('express');

const Result = require('../utils/Result');
const { getCarousel } = require('../service/carousel')

const router = express.Router();

//获取首页轮播图
router.get('/getCarousel', async (req, res)=>{
    const carousels = await getCarousel()
    // console.log(carousels)
    new Result(carousels, '查询成功').success(res)
})

module.exports = router;