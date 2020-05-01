import {getAskingBooks, 
        postAskingBook, 
        getFirstThreeBooks, 
        getMyAskingBooks} from '@/api/askingBook'

const state = {
    askingBooks: [],
    myAskingBooks: []
}

const mutations = {
    SET_ASKINGBOOKS: (state, askingBooks) => {
        state.askingBooks = askingBooks
    },
    SET_MYASKINGBOOKS: (state, myAskingBooks) => {
        state.myAskingBooks = myAskingBooks
    }
}

const actions = {
    //获取征书墙书籍
    getAskingBooks({ commit }, obj) {
        const { limit, skip = 0 } = obj
        return new Promise((resolve, reject) => {
            getAskingBooks(limit, skip).then(res => {
                // console.log(res)
                const { data } = res.data
                commit('SET_ASKINGBOOKS', data)
                resolve()
            }).catch(err => {
                // console.log(err)
                reject(err)
            })
        })
    },

    //发布征书信息
    postAskingBook({ commit }, askingBook) {
        return new Promise((resolve, reject) => {
            postAskingBook(askingBook).then(res => {
                resolve(res.data)
            })
        })
    },

    //获取最近三条征书信息
    getFirstThreeBooks({ commit }) {
        return new Promise((resolve, reject) => {
            getFirstThreeBooks().then(res => {
                resolve(res.data.data)
            })
        })
    },

    //获取本人发布的征书信息
    getMyAskingBooks({ commit }, obj) {
        const { skip = 0, limit } = obj
        return new Promise((resolve, reject) => {
            getMyAskingBooks(limit, skip).then(res => {
                const { data } = res.data
                commit('SET_MYASKINGBOOKS', data)
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