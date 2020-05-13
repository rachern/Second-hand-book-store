import { getRoles } from '@/api/role'

const state = {
    // roles: []
}

const mutations = {
    // SET_ROLES: (state, roles) => {
    //     state.roles = roles
    // }
}

const actions = {
    getRoles({ commit }) {
        return new Promise((resolve, reject) => {
            getRoles().then(res => {
                // commit('SET_ROLES', res.data.data)
                resolve(res.data.data)
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