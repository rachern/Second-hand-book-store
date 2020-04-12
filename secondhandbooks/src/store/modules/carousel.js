import { getCarousel } from '@/api/carousel'

const state = {
    carousels: []
}

const mutations = {
    SET_CAROUSELS: (state, carousels) => {
        state.carousels = carousels
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
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}