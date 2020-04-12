import { login, register, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'

const state = {
    token: getToken(),
    email: '',
    introduction: '',
    phoneNumber: '',
    roles: [],
    sex: '',
    avatar: '',
    username: ''
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_EMAIL: (state, email) => {
        state.email = email
    },
    SET_INTRODUCTION: (state, introduction) => {
        state.introduction = introduction
    },
    SET_PHONENUMBER: (state, phoneNumber) => {
        state.phoneNumber = phoneNumber
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles
    },
    SET_SEX: (state, sex) => {
        state.sex = sex
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
    SET_USERNAME: (state, username) => {
        state.username = username
    }
}

const actions = {
    // 登录
    login({ commit }, userInfo) {
        const { username, password } = userInfo;
        return new Promise((resolve, reject) => {
            login({ username: username.trim(), password: password.trim() }).then(response => {
                // console.log("1",response)
                if(response.data.msg && response.data.msg === '用户名或密码错误'){
                    resolve(response.data)
                }
                const { data } = response.data
                commit('SET_TOKEN', data.token)
                setToken(data.token)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    //根据token获取用户信息
    getInfo({ commit }) {
        return new Promise((resolve, reject) => {
            getInfo().then(response => {
                const { data } = response.data
                if(!data) {
                    reject('验证失败，请重新登录')
                }
                const { username, email, introduction, phoneNumber, roles, sex, url } = data
                commit('SET_EMAIL', email)
                commit('SET_INTRODUCTION', introduction)
                commit('SET_PHONENUMBER', phoneNumber)
                commit('SET_ROLES', roles)
                commit('SET_SEX', sex)
                commit('SET_AVATAR', url)
                commit('SET_USERNAME', username)
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // 注册
    register({ commit }, userInfo) {
        const { username, password, phoneNumber } = userInfo;
        return new Promise((resolve, reject) => {
            register({ username: username.trim(), password: password.trim(), phoneNumber: phoneNumber.trim() })
                .then(response => {
                    // console.log(response)
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
        })
    },

    // 登出
    logout({ commit }) {
        return new Promise((resolve, reject) => {
            commit('SET_TOKEN', '')
            commit('SET_EMAIL', '')
            commit('SET_INTRODUCTION', '')
            commit('SET_PHONENUMBER', '')
            commit('SET_ROLES', '')
            commit('SET_SEX', '')
            commit('SET_AVATAR', '')
            commit('SET_USERNAME', '')
            removeToken()
            resolve()
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}