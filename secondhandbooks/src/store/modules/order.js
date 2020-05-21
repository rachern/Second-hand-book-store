import { placeOrder, 
         paid, 
         getOrderById, 
         confirmReceipt, 
         evaluate, 
         getMyOrders,
         getMyOrdersByType } from '@/api/order'

const state = {
    orderList: []
}

const mutations = {
    SET_ORDERLIST: (state, orderList) => {
        state.orderList = orderList
    }
}

const actions = {
    // 提交订单
    placeOrder({ commit }, sendMessageObj) {
        return new Promise((resolve, reject) => {
            placeOrder(sendMessageObj).then(res => {
                resolve(res.data.data)
            })
        })
    },

    // 已支付
    paid({ commit }, id) {
        return new Promise((resolve, reject) => {
            paid(id).then(res => {
                resolve(res)
            })
        })
    },

    // 获取订单详情
    getOrderById({ commit }, id) {
        return new Promise((resolve, reject) => {
            getOrderById(id).then(res => {
                resolve(res.data.data)
            })
        })
    },

    // 确认收货
    confirmReceipt({ commit }, obj) {
        return new Promise((resolve, reject) => {
            confirmReceipt(obj).then(res => {
                resolve(res)
            })
        })
    },

    // 已评价
    evaluate({ commit }, comments) {
        return new Promise((resolve, reject) => {
            evaluate(comments).then(res => {
                resolve(res)
            })
        })
    },

    // 获取订单
    getMyOrders({ commit }, obj) {
        const { skip = 0, limit } = obj
        return new Promise((resolve, reject) => {
            getMyOrders(limit, skip).then(res => {
                commit('SET_ORDERLIST', res.data.data)
                resolve(res.data.data)
            })
        })
    },

    // 根据订单类型获取用户订单
    getMyOrdersByType({ commit }, obj) {
        const { skip = 0, limit, type } = obj
        return new Promise((resolve, reject) => {
            getMyOrdersByType(type, limit, skip).then(res => {
                commit('SET_ORDERLIST', res.data.data)
                resolve(res.data.data)
            })
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}