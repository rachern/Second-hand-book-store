const express = require('express')

const Result = require('../utils/Result')
const { getAskingBookCount, 
        getAskingBooks, 
        postAskingBook, 
        getFirstThreeBooks,
        getMyAskingBooksCount,
        getMyAskingBooks } = require('../service/askingBook')
const { decoded } = require('../utils')

const router = express.Router()

//获取征书墙书籍数量
router.get('/getAskingBookCount', async (req, res) => {
    const askingBookCount = await getAskingBookCount()
    new Result(askingBookCount, '查询成功').success(res)
})

//获取征书墙书籍
router.get('/getAskingBooks', async (req, res) => {
    const { limit, skip } = req.query
    const askingBooks = await getAskingBooks(limit, skip)
    new Result(askingBooks, '查询成功').success(res)
})

//发布征书信息
router.post('/postAskingBook', async (req, res) => {
    const decode = decoded(req)
    if(decode && decode._id) {
        const { askingBook } = req.body
        const result = await postAskingBook(decode._id, askingBook)
        if(result) {
            new Result('征书信息发布成功').success(res)
        } else {
            new Result('征书信息发布失败，请重新发布').fail(res)
        }
    }
})

//获取最新3条征书消息
router.get('/getFirstThreeBooks', async (req, res) => {
    const decode = decoded(req)
    if(decode && decode._id) {
        const result = await getFirstThreeBooks(decode._id)
        if(result) {
            new Result({ latestAsking: result }, '获取成功').success(res)
        } else {
            new Result('获取失败').fail(res)
        }
    }
})

//获取本人发布的征书数量
router.get('/getMyAskingBooksCount', async (req, res) => {
    const decode = decoded(req)
    if(decode && decode._id) {
        const myAskingBooksCount = await getMyAskingBooksCount(decode._id)
        new Result(myAskingBooksCount, '查询成功').success(res)
    }
})

//获取本人的征书信息
router.get('/getMyAskingBooks', async (req, res) => {
    const decode = decoded(req)
    if(decode && decode._id) {
        const { limit, skip } = req.query
        const myAskingBooks = await getMyAskingBooks(decode._id, limit, skip)
        new Result(myAskingBooks, '查询成功').success(res)
    }
})

module.exports = router