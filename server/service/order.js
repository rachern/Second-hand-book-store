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

// 根据类型获取订单记录统计
function getOrderRecord(type) {
    if(type === 'year') {
        return Order.aggregate([
            {
                $match: {
                    // 获取状态为2或3的数据
                    state: {$in: [2,3]}
                }
            },
            {
                $project: {
                    // 输出closingTime和number
                    // closingTime截取前4个字符，即年份
                    closingTime: {$substr: ['$closingTime', 0, 4]},
                    number: 1
                }
            },
            {
                $group: {
                    // 根据closingTime分组查询
                    _id: '$closingTime',
                    number: {$sum: 1}
                }
            },
            {
                // 按时间逆序排列
                $sort: {
                    closingTime: -1
                }
            },
            { $limit: 7 } // 获取前7条数据
        ])
    } else if (type === 'month') {
        let year = new Date().getFullYear()
        let reg = new RegExp(year+'')
        return Order.aggregate([
            {
                $match: {
                    // 获取状态为2或3的数据
                    state: {$in: [2,3]},
                    closingTime: {$regex: reg}
                }
            },
            {
                $project: {
                    // 输出closingTime和number
                    // closingTime截取从第5个字符开始的2个字符，即月份
                    closingTime: {$substr: ['$closingTime', 5, 2]},
                    number: 1
                }
            },
            {
                $group: {
                    // 根据closingTime分组查询
                    _id: '$closingTime',
                    number: {$sum: 1}
                }
            }
        ])
    } else if (type === 'day') {
        // let year = new Date().getFullYear()
        // let month = new Date().getMonth() + 1
        // if(month < 10) {
        //     month = '0' + month
        // }
        // let reg = `${year}-${month}`
        return Order.aggregate([
            {
                $match: {
                    // 获取状态为2或3的数据
                    state: {$in: [2,3]},
                    // closingTime: {$regex: reg}
                }
            },
            {
                $project: {
                    // 输出closingTime和number
                    // closingTime截取从第8个字符开始的2个字符，即日期
                    closingTime: {$substr: ['$closingTime', 0, 10]},
                    number: 1
                }
            },
            {
                $group: {
                    // 根据closingTime分组查询
                    _id: '$closingTime',
                    number: {$sum: 1}
                }
            }
        ])
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
    getMyOrderCountByType,
    getOrderRecord
}