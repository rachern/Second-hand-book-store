import request from '@/utils/request'

// 获取首页轮播图
export function getCarousel() {
    return request({
        url: '/carousel/getCarousel',
        method: 'get'
    })
}