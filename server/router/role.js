const express = require('express')

const Result = require('../utils/Result')
const { getRoles } = require('../service/role')

const router = express.Router()

// 获取角色列表
router.get('/getRoles', async (req, res) => {
    const roles = await getRoles()
    if(roles) {
        new Result(roles, '获取成功').success(res)
    } else {
        new Result('获取失败').fail(res)
    }
})

module.exports = router