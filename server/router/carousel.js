const express = require('express');

const Result = require('../utils/Result');
const { getCarousel, getAllCarousel, deleteCarousel, addCarousels } = require('../service/carousel')

const router = express.Router();

//获取首页轮播图
router.get('/getCarousel', async (req, res)=>{
    const carousels = await getCarousel()
    // console.log(carousels)
    new Result(carousels, '查询成功').success(res)
})

//获取所有轮播图
router.get('/getAllCarousel', async (req, res) => {
    const carousels = await getAllCarousel()
    new Result(carousels, '查询成功').success(res)
})

// 根据ID删除轮播图
router.post('/deleteCarousel', async (req, res) => {
    const { id } = req.body;
    const result = await deleteCarousel(id)
    if(result) {
        new Result('删除成功').succerr(res)
    } else {
        new Result('删除失败')
    }
})

// 添加轮播图
router.post('/addCarousels', async (req, res) => {
    const { carousels } = req.body;
    const result = await addCarousels(carousels)
    if(result) {
        new Result('添加成功').success(res)
    } else {
        new Result('添加失败')
    }
})

module.exports = router;