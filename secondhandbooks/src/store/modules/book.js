import { getHomeBooks, 
         getClassificationBooks, 
         getBookDetail } from '@/api/book'

const state = {
    homeBooks: null,
    classificationBooks: [],
    bookDetail: null
}

const mutations = {
    SET_HOMEBOOKS: (state, homeBooks) => {
        state.homeBooks = homeBooks
    },
    SET_CLASSIFICATIONBOOKS: (state, classificationBooks) => {
        state.classificationBooks = classificationBooks
    },
    SET_BOOKDETAIL: (state, bookDetail) => {
        state.bookDetail = bookDetail
    }
}

const actions = {
    // 获取首页展示书籍
    getHomeBooks({ commit }, booktypes) {
        return new Promise((resolve, reject) => {
            getHomeBooks(booktypes).then(res => {
                // console.log(res)
                const { data } = res.data
                commit('SET_HOMEBOOKS', data)
                resolve()
            }).catch(err => {
                // console.log(err)
                reject(err)
            })
        })
    },
    // 获取分类展示页书籍
    getClassificationBooks({ commit }, obj) {
        // console.log('1', obj)
        const { id, limit, skip = 0 } = obj
        return new Promise((resolve, reject) => {
            getClassificationBooks(id, limit, skip).then(res => {
                console.log(res)
                const { data } = res.data
                commit('SET_CLASSIFICATIONBOOKS', data)
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    },
    // 获取书籍详情
    getBookDetail({ commit }, id) {
        return new Promise((resolve, rject) => {
            getBookDetail(id).then(res => {
                // console.log(res)
                const { data } = res.data
                commit('SET_BOOKDETAIL', data)
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