import { placeOrder, paid, getOrderById, confirmReceipt, evaluate } from '@/api/order'

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
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}