import request from '@/utils/request'

// 登录
export function login(data){
    return request({
        url: '/user/login',
        method: 'post',
        data
    })
}

// 获取用户信息
export function getInfo() {
    return request({
        url: '/user/getInfo',
        method: 'get'
    })
}

// 注册
export function register(data){
    return request({
        url: '/user/register',
        method: 'post',
        data
    })
}