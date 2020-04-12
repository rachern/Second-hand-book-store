import {getAskingBooks} from '@/api/askingBook'

const state = {
    askingBooks: []
}

const mutations = {
    SET_ASKINGBOOKS: (state, askingBooks) => {
        state.askingBooks = askingBooks
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
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}