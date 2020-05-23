const express = require('express')

const Result = require('../utils/Result')
const { getFirstFiveBooks, 
        getClassificationBooks, 
        getClassificationBooksCount,
        getBookDetail,
        postBook,
        getLatestFourBooks,
        getMyPublishBooks,
        getMyPublishBooksCount,
        getPostBookReviewList,
        getPostBookReviewCount,
        passPostBook,
        rejectPostBook,
        findBooks,
        getfindBooksResultCount } = require('../service/book')
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
        if(myPublishBooksCount >= 0) {
            new Result(myPublishBooksCount, '获取成功').success(res)
        } else {
            new Result('获取失败').fail(res)
        }
    }
})

// 获取待审核上架的书籍
router.get('/getPostBookReviewList', async (req, res) => {
    const { limit, skip } = req.query
    const postBookReviewList = await getPostBookReviewList(limit, skip)
    if(postBookReviewList) {
        new Result(postBookReviewList, '获取成功').success(res)
    } else {
        new Result('获取失败').fail(res)
    }
})

// 获取待审核上架的书籍数量
router.get('/getPostBookReviewCount', async (req, res) => {
    const postBookReviewCount = await getPostBookReviewCount()
    if(postBookReviewCount >= 0) {
        new Result(postBookReviewCount, '获取成功').success(res)
    } else {
        new Result('获取失败').fail(res)
    }
})

// 审核待上架书籍通过
router.post('/passPostBook', async (req, res) => {
    const { id } = req.body
    const result = await passPostBook(id)
    if(result) {
        new Result('提交成功').success(res)
    } else {
        new Result('提交失败').fail(res)
    }
})

// 驳回待上架书籍
router.post('/rejectPostBook', async (req, res) => {
    const { id, rejectReason } = req.body
    const result = await rejectPostBook(id, rejectReason)
    if(result) {
        new Result('提交成功').success(res)
    } else {
        new Result('提交失败').fail(res)
    }
})

// 根据关键词搜索书籍
router.get('/findBooks', async (req, res) => {
    const { query, limit, skip } = req.query
    const result = await findBooks(query, limit, skip)
    if(result) {
        new Result(result, '查询成功').success(res)
    } else {
        new Result('查询失败').fail(res)
    }
})

// 获取根据关键词搜索书籍的数量
router.get('/getfindBooksResultCount', async (req, res) => {
    // console.log(1)
    const { query } = req.query
    const count = await getfindBooksResultCount(query)
    // console.log(count)
    new Result(count, '获取成功').success(res)
})

module.exports = router