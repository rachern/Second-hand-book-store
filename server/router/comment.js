const express = require('express')

const Result = require('../utils/Result')
const { getCommentCount, getComments } = require('../service/comment')

const router = express.Router()

// 获取评论数量
router.get('/getCommentCount', async (req, res) => {
    const { id } = req.query
    const commentCount = await getCommentCount(id)
    // console.log(commentCount)
    new Result(commentCount, '查询成功').success(res)
})

// 获取评论
router.get('/getComments', async (req, res) => {
    const { id, limit, skip } = req.query
    const comments = await getComments(id, limit, skip)
    new Result(comments, '查询成功').success(res)
})

module.exports = router