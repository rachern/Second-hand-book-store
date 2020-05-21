const Order = require('../db/model/order')
const moment = require('moment')

// 提交订单
function placeOrder(orderMessage) {
    return Order.create(orderMessage)
}

// 删除订单
function deleteOrder(id) {
    return Order.findByIdAndUpdate(id, {state: 4}, {new: true})
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

// 发表评价
function evaluate(id) {
    return Order.findByIdAndUpdate(id, {state: 3}, {new: true})
}

// 获取订单
function getMyOrders(id, limit, skip) {
    return Order.find({user: id, state: {$ne: 4}}).sort({_id: -1}).skip(parseInt(skip)).limit(parseInt(limit))
}

// 根据订单状态获取用户订单
function getMyOrdersByType(id, type, limit, skip) {
    return Order.find({user: id, state: parseInt(type)}).populate('address').populate('user').sort({_id: -1}).skip(parseInt(skip)).limit(parseInt(limit))
}

// 根据订单状态获取用户订单数量
function getMyOrderCountByType(id, type) {
    if(type == undefined) {
        return Order.find({user: id}).countDocuments()
    } else {
        return Order.find({user: id, state: parseInt(type)}).countDocuments()
    }
}

module.exports = {
    placeOrder,
    deleteOrder,
    getOrderById,
    paid,
    confirmReceipt,
    evaluate,
    getMyOrders,
    getMyOrdersByType,
    getMyOrderCountByType
}