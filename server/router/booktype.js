const express = require('express')

const Result = require('../utils/Result')
const { getBookType, findBookType, findBookType2, addBookType, deleteBookType, updateBookType } = require('../service/booktype')

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
    if(!hasBookType || hasBookType.length == 0) {
        const result = await addBookType(bookType)
        if(result) {
            new Result('添加成功').success(res)
        } else {
            new Result('添加失败').fail(res)
        }
    } else {
        new Result('书籍分类已存在').fail(res)
    }
})

// 删除书籍分类
router.post('/deleteBookType', async (req, res) => {
    const { bookType } = req.body
    // console.log(bookType)
    const result = await deleteBookType(bookType)
    if(result) {
        new Result('删除成功').success(res)
    } else {
        new Result('删除失败').fail(res)
    }
})

// 修改书籍分类
router.post('/updateBookType', async (req, res) => {
    const { updateClassificationForm, updateClassificationForm2 } = req.body
    console.log(updateClassificationForm, updateClassificationForm2)
    // 判断修改后的书籍分类是否存在，如果存在，则提示该分类已存在
    const hasBookType = await findBookType2(updateClassificationForm, updateClassificationForm2)
    // console.log(hasBookType)
    if(!hasBookType || hasBookType.length == 0) {
        const result = await updateBookType(updateClassificationForm, updateClassificationForm2)
        if(result) {
            new Result('修改成功').success(res)
        } else {
            new Result('修改失败').fail(res)
        }
    } else {
        new Result('书籍分类已存在').fail(res)
    }
})

module.exports = router