const express = require('express')

const Result = require('../utils/Result')
const { getFirstFiveBooks, 
        getClassificationBooks, 
        getClassificationBooksCount,
        getBookDetail } = require('../service/book')

const router = express.Router()

// 获取首页展示书籍
router.get('/getHomeBooks',async (req, res) => {
    const { booktypes } = req.query
    let books = {}
    for(let booktype of booktypes) {
        const book_type = JSON.parse(booktype)
        const book = await getFirstFiveBooks(book_type._id)
        books[book_type.level_2] = book
    }
    new Result(books, '查询成功').success(res)
})

// 获取分类展示页书籍数量
router.get('/getClassificationBooksCount', async (req, res) => {
    const { id } = req.query
    const count = await getClassificationBooksCount(id)
    new Result(count, '查询成功').success(res)
})

// 获取分类展示页书籍
router.get('/getClassificationBooks', async (req, res) => {
    const { id, limit, skip } = req.query
    // console.log(req.query)
    const result = await getClassificationBooks(id, limit, skip)
    // console.log(result)
    new Result(result, '查询成功').success(res)
})

// 获取书籍详情
router.get('/getBookDetail', async (req, res) => {
    const { id } = req.query
    const bookDetail = await getBookDetail(id)
    new Result(bookDetail, '查询成功').success(res)
})

module.exports = router