const express = require('express')
const mongoose = require('mongoose')

const Result = require('../utils/Result')
const { placeOrder, deleteOrder, getOrderById, paid, confirmReceipt } = require('../service/order')
const { getMyCartList, updateCartList } = require('../service/user')
const { getBookDetail, updateBooksNum } = require('../service/book')
const { decoded } = require('../utils')

const router = express.Router()

// 提交订单
router.post('/placeOrder', async (req, res) => {
    const decode = decoded(req)
    if(decode && decode._id) {
        let orderMessage = req.body
        // console.log(orderMessage)
        orderMessage.user = mongoose.Types.ObjectId(decode._id)
        orderMessage.address = mongoose.Types.ObjectId(orderMessage.address)
        const place_order_result = await placeOrder(orderMessage)
        if(place_order_result) {
            // 订单保存成功，要删除购物车中对应的商品
            const myCartList = await getMyCartList(decode._id)
            // console.log(myCartList)
            let newCartList = []
            myCartList[0].cartList.forEach((element, i) => {
                let inOrder = orderMessage.booksList.cartList.some((e) => {
                    return e.id == element.id
                })
                if(!inOrder) {
                    newCartList.push(element)
                }
            })
            const myNewCartList = await updateCartList(decode._id, newCartList)
            // console.log(myNewCartList)
            // 修改商品剩余数量
            orderMessage.booksList.cartList.forEach(async (element, i) => {
                const book = await getBookDetail(element.id)
                await updateBooksNum(element.id, book.number - element.num)
            })

            // 如果15分钟未付款，自动取消订单
            // setTimeout(async () => {
            //     const order = await getOrderById(place_order_result._id)
            //     // console.log(order)
            //     if(order.state == 0) {
            //         const { cartList } = order.booksList
            //         cartList.forEach(async (element, i) => {
            //             const book = await getBookDetail(element.id)
            //             await updateBooksNum(element.id, book.number - element.num)
            //         })
            //         await deleteOrder(place_order_result._id)
            //     }
            // }, 15 * 60 * 1000)
            new Result(place_order_result._id, '订单提交成功').success(res)
        } else {
            new Result('订单提交失败').fail(res)
        }
    }
})

// 已支付
router.post('/paid', async (req, res) => {
    const { id } = req.body
    const result = await paid(id)
    if(result) {
        new Result('支付成功').success(res)
    } else {
        new Result('支付失败').fail(res)
    }
})

// 获取订单详情
router.get('/getOrderById', async (req, res) => {
    const { id } = req.query
    const orderDetail = await getOrderById(id)
    console.log(orderDetail)
    if(orderDetail) {
        new Result(orderDetail, '获取成功').success(res)
    } else {
        new Result('获取失败').fail(res)
    }
})

// 确认收货
router.post('/confirmReceipt', async (req, res) => {
    const { id } = req.body
    const result = await confirmReceipt(id)
    if(result) {
        new Result('确认收货成功').success(res)
    } else {
        new Result('确认收货失败').fail(res)
    }
})

module.exports = router