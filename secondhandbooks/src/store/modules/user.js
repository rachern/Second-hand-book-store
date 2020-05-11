import { login, 
         register, 
         getInfo, 
         changePassword, 
         updateInformation, 
         getLatestFourCollections,
         getMyCollections,
         getMyCartList,
         updateCartList,
         moveToCollection,
         getUsers,
         resetPassword,
         removeUser } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'

const state = {
    token: getToken(),
    email: '',
    introduction: '',
    phoneNumber: '',
    roles: [],
    sex: '',
    avatar: '',
    username: '',
    myCollectionBooks: [],
    myCartList: {},
    userList: []
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
    },
    SET_MYCOLLECTIONBOOKS: (state, myCollectionBooks) =>  {
        state.myCollectionBooks = myCollectionBooks
    },
    SET_MYCARTLIST: (state, myCartList) => {
        state.myCartList = myCartList
    },
    SET_USERLIST: (state, userList) => {
        state.userList = userList
    }
}

const actions = {
    // 登录
    login({ commit }, userInfo) {
        const { username, password } = userInfo;
        return new Promise((resolve, reject) => {
            login({ username: username.trim(), password: password.trim() }).then(response => {
                // console.log("1",response)
                // if(response.data.msg && response.data.msg === '用户名或密码错误'){
                //     resolve(response.data)
                // }
                const { data } = response.data
                commit('SET_TOKEN', data.token)
                setToken(data.token)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // 根据token获取用户信息
    getInfo({ commit }) {
        return new Promise((resolve, reject) => {
            getInfo().then(response => {
                // console.log(1)
                const { data } = response.data
                // console.log(data)
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

    // 重置token
    resetToken({ commit }) {
        return new Promise(resolve => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            removeToken()
            resolve()
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

    // 修改密码
    changePassword({ commit }, passwords) {
        const { originalPassword, newPassword } = passwords
        return new Promise((resolve, reject) => {
            changePassword({ originalPassword: originalPassword.trim(), newPassword: newPassword.trim() })
                .then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
        })
    },

    // 修改个人信息
    updateInformation({ commit }, information) {
        return new Promise((resolve, reject) => {
            updateInformation(information).then(response => {
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
            commit('SET_ROLES', [])
            commit('SET_SEX', '')
            commit('SET_AVATAR', '')
            commit('SET_USERNAME', '')
            removeToken()
            resolve()
        })
    },

    // 获取最新的4个收藏
    getLatestFourCollections({ commit }) {
        return new Promise((resolve, reject) => {
            getLatestFourCollections().then(res => {
                resolve(res.data.data)
            })
        })
    },

    // 获取用户收藏的书籍
    getMyCollections({ commit }, obj) {
        const { skip = 0, limit } = obj
        return new Promise((resolve, reject) =>{
            getMyCollections(limit, skip).then(res => {
                const { data } = res.data
                // console.log(data.a)
                commit('SET_MYCOLLECTIONBOOKS', data)
                resolve(res.data.data)
            })
        })
    },

    // 获取用户的购物车列表
    getMyCartList({ commit }) {
        return new Promise((resolve, reject) => {
            getMyCartList().then(res => {
                const { data } = res.data
                commit('SET_MYCARTLIST', data[0])
                resolve(res.data.data[0])
            })
        })
    },

    // 更新购物车
    updateCartList({ commit }, cartList) {
        return new Promise((resolve, reject) => {
            updateCartList(cartList).then(res => {
                resolve(res)
            })
        })
    },

    // 将当前商品移入收藏夹
    moveToCollection({ commit }, bookIds) {
        return new Promise((resolve, reject) => {
            moveToCollection(bookIds).then(res => {
                resolve(res)
            })
        })
    },

    // 获取用户列表
    getUsers({ commit }, obj) {
        const { skip = 0, limit } = obj
        return new Promise((resolve, reject) => {
            getUsers(limit, skip).then(res => {
                const { data } = res.data
                commit('SET_USERLIST', data)
                resolve(res.data.data)
            })
        })
    },

    // 重置用户密码
    resetPassword({ commit }, id) {
        return new Promise((resolve, reject) => {
            resetPassword(id).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },

    // 删除用户
    removeUser({ commit }, id) {
        return new Promise((resolve, reject) => {
            removeUser(id).then(res => {
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