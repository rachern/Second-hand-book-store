import axios from 'axios';
import store from '@/store';
import { getToken } from '@/utils/auth'
import { MessageBox, Message } from 'element-ui'

const service = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
    config => {
        if( store.getters.token ){
            config.headers['Authorization'] = `Bearer ${getToken()}`
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

//响应拦截器
service.interceptors.response.use(
    response => {
        // return response
        const res = response.data
        // console.log(res)
        if(res.code !== 0) {
            // res.code === 50008 || res.code === 50012 || res.code === 50014
            if(res.code === -2) {
                MessageBox.confirm('Token 已失效，是否重新登录', '确认登出', {
                    confirmButtonText: '重新登录',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    store.dispatch('user/resetToken').then(() => {
                        location.reload()
                    })
                })
            }
            const errMsg = res.msg || '请求失败'
            Message({
                message: errMsg,
                type: 'error',
                duration: 5 * 1000
            })
            return Promise.reject(new Error(errMsg))
        } else {
            return response
        }
    },
    error => {
        const { msg } = error.response.data
        Message({
            message: msg || '请求失败',
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service