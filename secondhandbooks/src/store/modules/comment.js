import { getComments } from '@/api/comment'

const state = {
    comments: []
}

const mutations = {
    SET_COMMENTS: (state, comments) => {
        state.comments = comments
    }
}

const actions = {
    // 获取评论
    getComments({ commit }, obj) {
        const { id, limit, skip = 0 } = obj
        return new Promise((resolve, reject) => {
            getComments(id, limit, skip).then(res => {
                // console.log(res)
                const { data } = res.data
                commit('SET_COMMENTS', data)
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