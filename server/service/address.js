const mongoose = require('mongoose')

const Address = require('../db/model/address')

// 获取用户地址
function getAddress(_id) {
    return Address.find({user: _id}).sort({_id: -1})
}

// 新增地址
function postAddress(_id, addressData) {
    const {province,city,area,town,address,name,phone,defaultAddress} = addressData
    return Address.create({
        province,
        city,
        area,
        town,
        address,
        name,
        phone,
        state: defaultAddress,
        user: mongoose.Types.ObjectId(_id)
    })
}

// 将默认地址的状态重置为0
function updateAddressState(_id) {
    return Address.findOneAndUpdate({user: _id, state:1}, {state: 0})
}

// 将想要置为默认地址的状态设置为1
function toggleDefaultAddress(_id) {
    return Address.findByIdAndUpdate({_id}, {state: 1})
}

// 删除地址信息
function deleteAddress(_id) {
    return Address.findByIdAndDelete(_id)
}

// 将一个地址的状态设置为1
function findOneAndUpdate(_id) {
    return Address.findOneAndUpdate({user: _id}, {state: 1})
}

// 修改地址信息
function updateAddress(id, addressInfo) {
    const { province, city, area, town, address, name, phone} = addressInfo
    return Address.findByIdAndUpdate({_id: id},{province,city,area,town,address,name,phone})
}

module.exports = {
    getAddress,
    postAddress,
    updateAddressState,
    toggleDefaultAddress,
    deleteAddress,
    findOneAndUpdate,
    updateAddress
}