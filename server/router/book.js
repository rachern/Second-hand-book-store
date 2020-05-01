const express = require('express')

const Result = require('../utils/Result')
const { getFirstFiveBooks, 
        getClassificationBooks, 
        getClassificationBooksCount,
        getBookDetail,
        postBook,
        getLatestFourBooks,
        getMyPublishBooks,
        getMyPublishBooksCount } = require('../service/book')
const { decoded } = require('../utils')

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

// 上传书籍信息
router.post('/postBook', async (req, res) => {
    const decode = decoded(req)
    if(decode && decode._id) {
        let { bookForm } = req.body
        let { classification } = bookForm
        bookForm.classification = classification[1]
        const result = await postBook(decode._id, bookForm)
        if(result) {
            new Result('书籍信息发布成功').success(res)
        } else {
            new Result('书籍信息发布失败，请重新发布').fail(res)
        }
    }
})

// 获取当前用户最新发布的4本书
router.get('/getLatestFourBooks', async (req, res) => {
    const decode = decoded(req)
    if(decode && decode._id) {
        const latestBooks = await getLatestFourBooks(decode._id)
        if(latestBooks) {
            new Result({latestBooks}, '获取成功').success(res)
        } else {
            new Result('获取失败').fail(res)
        }
    }
})

// 获取当前用户发布的书籍
router.get('/getMyPublishBooks', async (req, res) => {
    const { limit, skip } = req.query
    const decode = decoded(req)
    if(decode && decode._id) {
        const myPublishBooks = await getMyPublishBooks(decode._id, limit, skip)
        if(myPublishBooks) {
            new Result(myPublishBooks, '获取成功').success(res)
        } else {
            new Result('获取失败').fail(res)
        }
    }
})

// 获取当前用户发布的书籍数量
router.get('/getMyPublishBooksCount', async (req, res) => {
    const decode = decoded(req)
    if(decode && decode._id) {
        const myPublishBooksCount = await getMyPublishBooksCount(decode._id)
        if(myPublishBooksCount) {
            new Result(myPublishBooksCount, '获取成功').success(res)
        } else {
            new Result('获取失败').fail(res)
        }
    }
})

module.exports = router