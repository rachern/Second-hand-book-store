const express = require('express')

const Result = require('../utils/Result')
const { getAddress, 
        postAddress, 
        updateAddressState, 
        toggleDefaultAddress, 
        deleteAddress,
        findOneAndUpdate,
        updateAddress } = require('../service/address')
const { decoded } = require('../utils')

const router = express.Router()

// 新增地址信息
router.post('/postAddress', async (req, res) => {
    const decode = decoded(req)
    if(decode && decode._id) {
        const has_address = await getAddress(decode._id)
        // console.log(has_address)
        if(has_address.length === 0) {
            req.body.defaultAddress = true
        } else if(has_address.length < 20) {
            if(req.body.defaultAddress === true) {
                //如果新增地址为默认地址，需要将数据库中的默认地址置为0
                await updateAddressState(decode._id)
                // console.log(update_address_state)
            }
        } else {
            new Result('地址数量不能多于20条').fail(res)
        }
        const result = await postAddress(decode._id, req.body)
        if(result) {
            new Result('地址新增成功').success(res)
        } else {
            new Result('地址新增失败').fail(res)
        }
    }
})

// 获取地址列表
router.get('/getAddress', async (req, res) => {
    const decode = decoded(req)
    if(decode && decode._id) {
        const addressList = await getAddress(decode._id)
        new Result({ addressList }, '地址列表获取成功').success(res)
    }
})

// 切换默认地址
router.post('/toggleDefaultAddress', async (req, res) => {
    const decode = decoded(req)
    if(decode && decode._id) {
        // 先将数据库中的地址状态全部置为0
        await updateAddressState(decode._id) 
        // 将默认地址的状态置为1
        await toggleDefaultAddress(req.body.id)
        const addressList = await getAddress(decode._id)
        new Result({ addressList }, '地址列表获取成功').success(res)
    }
})

// 删除地址信息
router.post('/deleteAddress', async (req, res) => {
    const decode = decoded(req)
    if(decode && decode._id) {
        // 删除选中的地址
        const delete_address = await deleteAddress(req.body.id)
        if(delete_address.state === 1) {
            await findOneAndUpdate(decode._id)
        }
        const addressList = await getAddress(decode._id)
        new Result({ addressList }, '地址列表获取成功').success(res)
    }
})

// 更新地址信息
router.post('/updateAddress', async (req, res) => {
    const decode = decoded(req)
    if(decode && decode._id) {
        const {id, address} = req.body
        const result = await updateAddress(id, address)
        if(result) {
            new Result('修改地址成功').success(res)
        } else {
            new Result('修改地址失败').fail(res)
        }
    }
})

module.exports = router