import axios from 'axios';
import store from '@/store';
import { getToken } from '@/utils/auth'
import { Message } from 'element-ui'

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
        return response
    },
    error => {
        const { msg } = error.response.data
        Message({
            message: msg || '请求失败',
            type: 'error'
        })
        return Promise.reject(error)
    }
)

export default service