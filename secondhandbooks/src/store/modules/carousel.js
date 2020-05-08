import { getCarousel, getAllCarousel, deleteCarousel, addCarousels } from '@/api/carousel'

const state = {
    carousels: [],
    allCarousels: []
}

const mutations = {
    SET_CAROUSELS: (state, carousels) => {
        state.carousels = carousels
    },
    SET_ALLCAROUSELS: (state, allCarousels) => {
        state.allCarousels = allCarousels
    }
}

const actions = {
    // 获取轮播图
    getCarousel({ commit }) {
        return new Promise((resolve,reject) => {
            getCarousel().then(res => {
                // console.log(res)
                const { data } = res.data
                commit('SET_CAROUSELS', data)
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    },

    // 获取所有轮播图
    getAllCarousel({ commit }) {
        return new Promise((resolve, reject) => {
            getAllCarousel().then(res => {
                const { data } = res.data
                commit('SET_ALLCAROUSELS', data)
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    },

    // 删除轮播图
    deleteCarousel({ commit }, id) {
        return new Promise((resolve, reject) => {
            deleteCarousel(id).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },

    // 添加轮播图
    addCarousels({ commit }, carousels) {
        return new Promise((resolve, reject) => {
            addCarousels(carousels).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
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