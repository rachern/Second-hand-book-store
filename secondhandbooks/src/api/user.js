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

// 修改密码
export function changePassword(data) {
    return request({
        url: '/user/changePassword',
        method: 'post',
        data
    })
}

// 修改用户信息
export function updateInformation(information) {
    return request({
        url: '/user/updateInformation',
        method: 'post',
        data: information
    })
}

// 获取用户最新收藏的4本书籍
export function getLatestFourCollections() {
    return request({
        url: '/user/getLatestFourCollections',
        method: 'get'
    })
}

// 获取用户收藏的书籍
export function getMyCollections(limit, skip) {
    return request({
        url: '/user/myCollectionBooks',
        method: 'get',
        params: {limit, skip}
    })
}

// 获取用户收藏的书籍数量
export function getMyCollectionBooksCount() {
    return request({
        url: '/user/getMyCollectionBooksCount',
        method: 'get'
    })
}

// 获取用户的购物车列表
export function getMyCartList() {
    return request({
        url: '/user/getMyCartList',
        method: 'get'
    })
}

// 更新购物车
export function updateCartList(cartList) {
    return request({
        url: '/user/updateCartList',
        method: 'post',
        data: { cartList }
    })
}

// 将当前商品移入收藏夹
export function moveToCollection(bookIds) {
    return request({
        url: '/user/moveToCollection',
        method: 'post',
        data: { bookIds }
    })
}

// 获取用户列表
export function getUsers(limit, skip) {
    return request({
        url: '/user/getUsers',
        method: 'get',
        params: { limit, skip }
    })
}