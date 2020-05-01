const mongoose = require('mongoose')

// 用户地址集合结构
const addressSchema = new mongoose.Schema({
    province: Object, // 省份
    city: Object, // 市区
    area: Object, // 县、区
    town: Object, // 街道
    address: { // 详细地址
        type: String,
        trim: true
    },
    name: String, // 收货人姓名
    phone: String, // 收货人号码
    user: { // 用户
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    state: Number // 是否为默认地址，0 非默认地址 1 默认地址
})

//用户地址集合模型
const Address = mongoose.model('address', addressSchema) 

module.exports = Address