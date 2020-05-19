const express = require('express');
const MD5 = require('crypto-js/md5')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
// const boom = require('boom');

const Result = require('../utils/Result');
const { PWD_SALT, PRIVATE_KEY, JWT_EXPIRED } = require('../utils/constant');
const { createUser, 
        findUser, 
        checkPassword, 
        updatePassword, 
        updateInformation,
        getCollections,
        getMyCartList,
        updateCartList,
        updateCollections,
        getUsers,
        resetPassword,
        removeUser,
        getUserRolesById,
        updateUserRolesById,
        addToShoppingCart,
        moveToShoppingCart,
        moveToCollections,
        getAllUsers } = require('../service/user')
const { getMyCollectionBooks } = require('../service/book')
const { decoded } = require('../utils')

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
    if (!user) {
        new Result('用户名或密码错误').fail(res)
    } else {
        // console.log(user)
        // const { email, introduction, phoneNumber, role, sex, url } = user
        const token = jwt.sign(
            { _id: user._id  },
            PRIVATE_KEY,
            { expiresIn: JWT_EXPIRED }
        )
        // username, email, introduction, phoneNumber, roles, sex, url, 
        new Result({ token }, '登录成功').success(res)
    }
})

// 获取用户信息
router.get('/getInfo', async (req, res) => {
    const decode = decoded(req)
    if(decode && decode._id) {
        const user = await findUser({ _id: decode._id })
        // console.log(1,user)
        if(user) {
            // const { username, email, introduction, phoneNumber, roles, sex, url } = user
            new Result(user, '用户信息查询成功').success(res)
        } else {
            new Result('用户信息查询失败').fail(res)
        }
    } else {
        new Result('用户信息查询失败').fail(res)
    }
})

// 修改密码
router.post('/changePassword', async (req, res) => {
    let { originalPassword, newPassword } = req.body
    const decode = decoded(req)
    if(decode && decode._id) {
        originalPassword = MD5(`${originalPassword}${PWD_SALT}`).toString()
        const user = await checkPassword(decode._id, originalPassword)
        if(user) {
            newPassword = MD5(`${newPassword}${PWD_SALT}`).toString()
            const result = await updatePassword(decode._id, newPassword)
            if(result) {
                new Result('密码修改成功').success(res)
            } else {
                new Result('密码修改失败').fail(res)
            }
        } else {
            new Result('密码错误').fail(res)
        }
    }
})

// 修改用户信息
router.post('/updateInformation', async (req, res) => {
    const decode = decoded(req)
    if(decode && decode._id) {
        const result = await updateInformation(decode._id, req.body)
        if(result) {
            new Result('个人信息修改成功').success(res)
        } else {
            new Result('个人信息修改失败').fail(res)
        }
    }
})

// 获取用户最新收藏的4本书籍
router.get('/getLatestFourCollections', async (req, res) => {
    const decode = decoded(req)
    if(decode && decode._id){
        const col = await getCollections(decode._id)
        let { collections } = col
        if(collections.length > 4) {
            collections = collections.slice(0, 4)
        }
        // console.log(collections)
        let bookIds = []
        collections.forEach(element => {
            bookIds.push({_id: element})
        })
        // console.log(bookIds)
        const latestCollections = await getMyCollectionBooks(bookIds)
        // console.log(latestCollections)
        if(latestCollections) {
            new Result({latestCollections}, '获取成功').success(res)
        } else {
            new Result('获取失败').fail(res)
        }
    }
})

// 获取用户收藏的书籍
router.get('/myCollectionBooks', async (req, res) => {
    const decode = decoded(req)
    if(decode && decode._id) {
        // const a = await cartList(decode._id)
        // console.log("a",a)
        const col = await getCollections(decode._id)
        let { collections } = col
        const { limit, skip } = req.query
        collections = collections.reverse().slice(skip, skip+limit)
        let bookIds = []
        collections.forEach(element => {
            bookIds.push({_id: element})
        })
        const myCollectionBooks = await getMyCollectionBooks(bookIds)
        if(myCollectionBooks) {
            new Result(myCollectionBooks, '获取成功').success(res)
        } else {
            new Result('获取失败').fail(res)
        }
    }
})

// 获取用户收藏的书籍数量
router.get('/getMyCollectionBooksCount', async (req, res) => {
    const decode = decoded(req)
    if(decode && decode._id) {
        const col = await getCollections(decode._id)
        let { collections } = col
        new Result(collections.length, '获取成功').success(res)
    }
})

// 获取用户的购物车列表
router.get('/getMyCartList', async (req, res) => {
    const decode = decoded(req)
    console.log(decode._id)
    if(decode && decode._id) {
        const myCartList = await getMyCartList(decode._id)
        if(myCartList) {
            new Result(myCartList, '获取成功').success(res)
        } else {
            new Result('获取失败').fail(res)
        }
    }
})

// 更新购物车
router.post('/updateCartList', async (req, res) => {
    const decode = decoded(req)
    if(decode && decode._id) {
        const { cartList } = req.body
        cartList.forEach(element => {
            element.id = mongoose.Types.ObjectId(element.id)
        })
        const result = await updateCartList(decode._id, cartList)
        if(result) {
            new Result('更新成功').success(res)
        } else {
            new Result('更新失败').fail(res)
        }
    }
})

// 将选中的商品移入收藏夹
router.post('/moveToCollection', async (req, res) => {
    const decode = decoded(req)
    if(decode && decode._id) {
        const { bookIds } = req.body;
        const col = await getCollections(decode._id);
        let { collections } = col;
        bookIds.forEach((bookId, index) => {
            if(!collections.includes(bookId)) {
                collections.push(mongoose.Types.ObjectId(bookId))
            }
        })
        const result = await updateCollections(decode._id, collections)
        if(result) {
            new Result('移入收藏夹成功').success(res)
        } else {
            new Result('移入收藏夹失败').fail(res)
        }
    }
})

// 获取用户列表
router.get('/getUsers', async (req, res) => {
    const { limit, skip } = req.query;
    const userList = await getUsers(limit, skip)
    // console.log(userList)
    if(userList) {
        new Result(userList, '用户列表获取成功').success(res)
    } else {
        new Result('用户列表获取失败').fail(res)
    }
})

// 重置用户密码
router.post('/resetPassword', async (req, res) => {
    const { id } = req.body
    const password = MD5(`123456${PWD_SALT}`).toString()
    const result = await resetPassword(id, password)
    if(result) {
        new Result('重置用户密码成功').success(res)
    } else {
        new Result('重置用户密码失败').fail(res)
    }
})

// 删除用户
router.post('/removeUser', async (req, res) => {
    const { id } = req.body
    const result = await removeUser(id)
    if(result) {
        new Result('删除用户成功').success(res)
    } else {
        new Result('删除用户失败').fail(res)
    }
})

// 根据用户id获取用户权限
router.get('/getUserRolesById', async (req, res) => {
    const { id } = req.query
    const userRoles = await getUserRolesById(id)
    if(userRoles) {
        new Result(userRoles, '获取成功').success(res)
    } else {
        new Result('获取失败').fail(res)
    }
})

// 根据用户id修改用户权限
router.post('/updateUserRolesById', async (req, res) => {
    const { roles, id } = req.body
    const result = await updateUserRolesById(id, roles)
    if(result) {
        new Result('用户权限修改成功').success(res)
    } else {
        new Result('用户权限修改失败').fail(res)
    }
})

// 将商品移入购物车
router.post('/moveToShoppingCart', async (req, res) => {
    const decode = decoded(req)
    if(decode && decode._id) {
        const { id, num } = req.body
        // 获取用户的购物车列表
        const myCartList = await getMyCartList(decode._id)
        console.log(myCartList)
        if(myCartList.length != 0) {
            const { cartList } = myCartList[0]
            // 判断书籍是否已在购物车
            let inCartList = false;
            let now_num;
            cartList.forEach((element,i) => {
                if(element.id == id) {
                    inCartList = true
                    now_num = element.num
                }
            })
            if(inCartList) {
                // 如果已在购物车，只添加数量
                const result = await addToShoppingCart(decode._id, id, now_num + num)
                if(result) {
                    new Result('加入购物车成功').success(res)
                } else {
                    new Result('加入购物车失败').fail(res)
                }
            } else {
                // 如果不在购物车，添加书籍
                const result = await moveToShoppingCart(decode._id, {id:mongoose.Types.ObjectId(id),num,checked:true})
                if(result) {
                    new Result('加入购物车成功').success(res)
                } else {
                    new Result('加入购物车失败').fail(res)
                }
            }
        } else {
            const result = await moveToShoppingCart(decode._id, {id:mongoose.Types.ObjectId(id),num,checked:true})
            if(result) {
                new Result('加入购物车成功').success(res)
            } else {
                new Result('加入购物车失败').fail(res)
            }
        }
    }
})

// 将商品移入收藏夹
router.post('/moveToCollections', async (req, res) => {
    const decode = decoded(req)
    if(decode && decode._id) {
        const { id } = req.body
        const col = await getCollections(decode._id)
        const { collections } = col
        var inCollections = collections.some(element => {
            return element == id
        })
        if(inCollections) {
            // 如果书籍已在收藏夹
            new Result('该书籍已在收藏夹，请勿重复添加').success(res)
        } else {
            // 如果不在收藏夹
            const result = await moveToCollections(decode._id, id)
            if(result) {
                new Result('添加收藏夹成功').success(res)
            } else {
                new Result('添加收藏夹失败').fail(res)
            }
        }
    }

})

// 获取所有的用户
router.get('/getAllUsers', async (req, res) => {
    const userList = await getAllUsers()
    if(userList) {
        new Result(userList, '获取成功').success(res)
    } else {
        new Result('获取失败').fail(res)
    }
})

module.exports = router;