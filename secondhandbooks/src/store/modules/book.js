import { getHomeBooks, 
         getClassificationBooks, 
         getBookDetail,
         postBook,
         getLatestFourBooks,
         getMyPublishBooks} from '@/api/book'

const state = {
    homeBooks: null,
    classificationBooks: [],
    bookDetail: null,
    myPublishBooks: []
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
    },
    SET_MYPUBLISHBOOKS: (state, myPublishBooks) => {
        state.myPublishBooks = myPublishBooks
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
    },

    // 上传书籍信息
    postBook({ commit }, bookForm) {
        return new Promise((resolve, reject) => {
            postBook(bookForm).then(res => {
                resolve(res.data)
            })
        })
    },

    // 获取当前用户最新发布的4本书
    getLatestFourBooks({ commit }) {
        return new Promise((resolve, reject) => {
            getLatestFourBooks().then(res => {
                resolve(res.data.data)
            })
        })
    },

    // 获取当前用户发布的所有书籍
    getMyPublishBooks({ commit }, obj) {
        const { skip = 0, limit } = obj
        return new Promise((resolve, reject) => {
            getMyPublishBooks(limit, skip).then(res => {
                const { data } = res.data
                commit('SET_MYPUBLISHBOOKS', data)
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