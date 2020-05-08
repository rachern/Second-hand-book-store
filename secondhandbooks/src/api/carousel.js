import request from '@/utils/request'

// 获取首页轮播图
export function getCarousel() {
    return request({
        url: '/carousel/getCarousel',
        method: 'get'
    })
}

// 获取所有轮播图
export function getAllCarousel() {
    return request({
        url: '/carousel/getAllCarousel',
        method: 'get'
    })
}

// 删除轮播图
export function deleteCarousel(id) {
    return request({
        url: '/carousel/deleteCarousel',
        method: 'post',
        data: { id }
    })
}

// 添加轮播图
export function addCarousels(carousels) {
    return request({
        url: '/carousel/addCarousels',
        method: 'post',
        data: { carousels }
    })
}