const Order = require('../db/model/order')
const moment = require('moment')

// 提交订单
function placeOrder(orderMessage) {
    return Order.create(orderMessage)
}

// 删除订单
function deleteOrder(id) {
    return Order.findByIdAndDelete(id)
}

// 根据id获取订单
function getOrderById(id) {
    return Order.findById(id).populate('address').populate('user')
}

// 已支付
function paid(id) {
    const time = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    return Order.findByIdAndUpdate(id, {state: 1, paymentTime: time}, {new: true})
}

// 确认收货
function confirmReceipt(id) {
    const time = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    return Order.findByIdAndUpdate(id, {state: 2, closingTime: time}, {new: true})
}

module.exports = {
    placeOrder,
    deleteOrder,
    getOrderById,
    paid,
    confirmReceipt
}