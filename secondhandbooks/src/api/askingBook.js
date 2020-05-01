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

//发布征书信息
export function postAskingBook(askingBook) {
    return request({
        url: '/askingBook/postAskingBook',
        method: 'post',
        data: { askingBook }
    })
}

//获取最新三条征书信息
export function getFirstThreeBooks() {
    return request({
        url: '/askingBook/getFirstThreeBooks',
        method: 'get'
    })
}

//获取本人发布的征书数量
export function getMyAskingBooksCount() {
    return request({
        url: '/askingBook/getMyAskingBooksCount',
        method: 'get'
    })
}

//获取本人发布的征书信息
export function getMyAskingBooks(limit, skip) {
    return request({
        url: '/askingBook/getMyAskingBooks',
        method: 'get',
        params: { limit, skip }
    })
}