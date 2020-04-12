import request from '@/utils/request'

// 获取首页展示书籍
export function getHomeBooks(booktypes) {
    return request({
        url: '/book/getHomeBooks',
        method: 'get',
        params: { booktypes }
    })
}
// 获取分类展示页书籍数量
export function getClassificationBooksCount(id) {
    return request({
        url: '/book/getClassificationBooksCount',
        method: 'get',
        params: { id }
    })
}
// 获取分类展示页书籍
export function getClassificationBooks(id, limit, skip) {
    return request({
        url: '/book/getClassificationBooks',
        method: 'get',
        params: { id, limit, skip }
    })
}
// 获取书籍详情
export function getBookDetail(id) {
    return request({
        url: '/book/getBookDetail',
        method: 'get',
        params: { id }
    })
}