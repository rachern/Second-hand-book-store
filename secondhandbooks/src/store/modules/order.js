import { placeOrder, paid, getOrderById, confirmReceipt } from '@/api/order'

const state = {

}

const mutations = {

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
    confirmReceipt({ commit }, id) {
        return new Promise((resolve, reject) => {
            confirmReceipt(id).then(res => {
                resolve(res)
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