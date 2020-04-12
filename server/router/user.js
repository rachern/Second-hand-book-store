const express = require('express');
const MD5 = require('crypto-js/md5')
const jwt = require('jsonwebtoken')
// const boom = require('boom');

const Result = require('../utils/Result');
const { PWD_SALT, PRIVATE_KEY, JWT_EXPIRED } = require('../utils/constant');
const { createUser, findUser } = require('../service/user')

const router = express.Router();

// 注册
router.post('/register', async (req, res) => {
    let { username, password, phoneNumber } = req.body
    let user = await findUser({ username })
    if (!user || user.length === 0) {
        password = MD5(`${password}${PWD_SALT}`).toString()
        user = await createUser(username, password, phoneNumber)
        if (!user || user.length === 0) {
            new Result('注册失败').fail(res)
        } else {
            new Result('注册成功').success(res)
        }
    } else {
        new Result('用户名已存在').fail(res)
    }
})

// 登录
router.post('/login', async (req, res) => {
    // console.log(req.body)
    let { username, password } = req.body
    password = MD5(`${password}${PWD_SALT}`).toString()

    const user = await findUser({ username, password })
    if (!user || user.length === 0) {
        new Result('用户名或密码错误').fail(res)
    } else {
        console.log(user)
        const { email, introduction, phoneNumber, role, sex, url } = user
        const token = jwt.sign(
            { username },
            PRIVATE_KEY,
            { expiresIn: JWT_EXPIRED }
        )
        // username, email, introduction, phoneNumber, roles, sex, url, 
        new Result({ token }, '登录成功').success(res)
    }
})

module.exports = router;