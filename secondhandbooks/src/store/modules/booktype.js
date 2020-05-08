import { getBookType, addBookType } from '@/api/booktype'

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
                resolve(data)
            }).catch(err => {
                reject(err)
            })
        })
    },

    // 添加书籍分类
    addBookType({ commit }, bookType) {
        return new Promise((resolve, reject) => {
            addBookType(bookType).then(res => {
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