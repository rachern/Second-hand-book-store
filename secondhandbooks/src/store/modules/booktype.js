import { getBookType } from '@/api/booktype'

const state = {
    booktypes: []
}

const mutations = {
    SET_BOOKTYPES: (state, booktypes) => {
        state.booktypes = booktypes
    }
}

const actions = {
    // 获取书籍分类
    getBookType({ commit }) {
        return new Promise((resolve, reject) => {
            getBookType().then(res => {
                const { data } = res.data
                commit('SET_BOOKTYPES', data)
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