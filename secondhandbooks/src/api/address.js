import request from '@/utils/request'

// 新增收货地址
export function addAddress(addressData) {
    return request({
        url: '/address/postAddress',
        method: 'post',
        data: addressData
    })
}

// 获取地址列表
export function getAddress() {
    return request({
        url: '/address/getAddress',
        method: 'get'
    })
}

// 切换默认地址
export function toggleDefaultAddress(id) {
    return request({
        url: '/address/toggleDefaultAddress',
        method: 'post',
        data: {id}
    })
}

// 删除地址信息
export function deleteAddress(id) {
    return request({
        url: '/address/deleteAddress',
        method: 'post',
        data: {id}
    })
}

// 修改地址信息
export function updateAddress(id, address) {
    return request({
        url: '/address/updateAddress',
        method: 'post',
        data: {id, address}
    })
}