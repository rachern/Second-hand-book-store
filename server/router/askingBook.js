const express = require('express')

const Result = require('../utils/Result')
const { getAskingBookCount, getAskingBooks } = require('../service/askingBook')

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

module.exports = router