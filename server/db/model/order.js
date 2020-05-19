const mongoose = require('mongoose')
const moment = require('moment')

// 创建订单集合规则
const orderSchema = mongoose.Schema({
    user: { // 所属用户
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    address: { // 订单地址
        type: mongoose.Schema.Types.ObjectId,
        ref: 'address'
    },
    state: { // 订单状态 0：待付款 1：待收货 2：待评价 3：已完成 4：已取消 
        type: Number
    },
    booksList: { // 商品详情
        type: Object
    },
    sum: { // 总额
        type: String
    },
    createdTime: { // 创建时间
        type: String,
        default: () => moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    },
    paymentTime: { // 付款时间
        type: String
    },
    closingTime: { // 成交时间
        type: String
    }
}) 

// 将Schema对象转化为数据模型
const Order = mongoose.model('order', orderSchema)

module.exports = Order