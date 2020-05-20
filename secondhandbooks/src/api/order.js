import request from '@/utils/request'

// 提交订单
export function placeOrder(sendMessageObj) {
    return new request({
        url: '/order/placeOrder',
        method: 'post',
        data: sendMessageObj
    })
}

// 已支付
export function paid(id) {
    return new request({
        url: '/order/paid',
        method: 'post',
        data: { id }
    })
}

// 获取订单详情
export function getOrderById(id) {
    return new request({
        url: '/order/getOrderById',
        method: 'get',
        params: { id }
    })
}

// 确认收货
export function confirmReceipt(id) {
    return new request({
        url: '/order/confirmReceipt',
        method: 'post',
        data: { id }
    })
}