import request from '@/utils/request'

//获取征书墙数量
export function getAskingBookCount() {
    return request({
        url: '/askingBook/getAskingBookCount',
        method: 'get'
    })
}

//获取征书墙书籍
export function getAskingBooks(limit, skip) {
    return request({
        url: '/askingBook/getAskingBooks',
        method: 'get',
        params: { limit, skip }
    })
}