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

// 已评价
export function evaluate(obj) {
    return new request({
        url: '/order/evaluate',
        method: 'post',
        data: obj
    })
}

// 获取订单
export function getMyOrders(limit, skip) {
    return new request({
        url: '/order/getMyOrders',
        method: 'get',
        params: { limit, skip }
    })
}

// 根据订单类型获取用户订单
export function getMyOrdersByType(type, limit, skip) {
    return new request({
        url: '/order/getMyOrdersByType',
        method: 'get',
        params: { type, limit, skip }
    })
}

// 根据订单类型获取订单数量
export function getMyOrderCountByType(type) {
    return new request({
        url: '/order/getMyOrderCountByType',
        method: 'get',
        params: { type }
    })
}
