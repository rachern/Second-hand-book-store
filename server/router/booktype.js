const express = require('express')

const Result = require('../utils/Result')
const { getBookType, findBookType, addBookType } = require('../service/booktype')

const router = express.Router()

// 获取书籍分类
router.get('/getBookType', async (req, res) => {
    const booktypes = await getBookType()
    const new_booktypes = []
    booktypes.forEach(booktype => {
        let hasLevel1 = false
        new_booktypes.forEach(new_booktype => {
            if(new_booktype.level_1 === booktype.level_1) {
                new_booktype.level_2.push({_id:booktype._id, level_2:booktype.level_2})
                hasLevel1 = true
            }
        })
        if(!hasLevel1) {
            let obj = {
                level_1: booktype.level_1,
                level_2: [{_id:booktype._id, level_2:booktype.level_2}]
            }
            new_booktypes.push(obj)
        }
    })
    new Result(new_booktypes, '查询成功').success(res)
})

// 添加书籍分类
router.post('/addBookType', async (req, res) => {
    const { bookType } = req.body
    // console.log(bookType)
    const hasBookType = await findBookType(bookType)
    if(!hasBookType) {
        const result = await addBookType(bookType)
        if(result) {
            new Result('添加成功').success(res)
        } else {
            new Result('添加失败').fail(res)
        }
    }
})

module.exports = router