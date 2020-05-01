import { addAddress, 
         getAddress, 
         toggleDefaultAddress, 
         deleteAddress,
         updateAddress } from '@/api/address'

const state = {
    addressList: []
}

const mutations = {
    SET_ADDRESSLIST: (state, addressList) => {
        state.addressList = addressList
    }
}

const actions = {
    // 新增地址信息
    addAddress({ commit },addressData) {
        return new Promise((resolve, reject) => {
            addAddress(addressData).then(res => {
                resolve(res.data)
            })
        })
    },

    // 获取地址列表
    getAddress({ commit }) {
        return new Promise((resolve, reject) => {
            getAddress().then(res => {
                const { data } = res.data
                commit('SET_ADDRESSLIST', data.addressList)
                resolve(res.data)
            })
        })
    },

    // 切换默认地址
    toggleDefaultAddress({ commit }, id) {
        return new Promise((resolve, reject) => {
            toggleDefaultAddress(id).then(res => {
                const { data } = res.data
                commit('SET_ADDRESSLIST', data.addressList)
                resolve(res.data)
            })
        })
    },

    // 删除地址信息
    deleteAddress({ commit }, id) {
        return new Promise((resolve, reject) => {
            deleteAddress(id).then(res => {
                const { data } = res.data
                commit('SET_ADDRESSLIST', data.addressList)
                resolve(res.data)
            })
        })
    },

    // 修改地址信息
    updateAddress({ commit }, addressInfo) {
        const { id, address } = addressInfo
        return new Promise((resolve, reject) => {
            updateAddress(id, address).then(res => {
                resolve(res.data)
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