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

// 上传书籍信息
export function postBook(bookForm) {
    return request({
        url: '/book/postBook',
        method: 'post',
        data: { bookForm }
    })
}

// 获取当前用户最新发布的4本书籍
export function getLatestFourBooks() {
    return request({
        url: '/book/getLatestFourBooks',
        method: 'get'
    })
}

// 获取当前用户发布的书籍
export function getMyPublishBooks(limit, skip) {
    return request({
        url: '/book/getMyPublishBooks',
        method: 'get',
        params: { limit, skip }
    })
}

// 获取当前用户发布的书籍数量
export function getMyPublishBooksCount() {
    return request({
        url: '/book/getMyPublishBooksCount',
        method: 'get'
    })
}

// 获取待审核上架的书籍数量
export function getPostBookReviewCount() {
    return request({
        url: '/book/getPostBookReviewCount',
        method: 'get'
    })
}

// 获取待审核上架的书籍
export function getPostBookReviewList(limit, skip) {
    return request({
        url: '/book/getPostBookReviewList',
        method: 'get',
        params: { limit, skip }
    })
}

// 审核待上架书籍通过
export function passPostBook(id) {
    return request({
        url: '/book/passPostBook',
        method: 'post',
        data: { id }
    })
}

// 驳回待上架书籍
export function rejectPostBook(obj) {
    return request({
        url: '/book/rejectPostBook',
        method: 'post',
        data: obj
    })
}

// 根据关键词搜索书籍
export function findBooks(query, limit, skip) {
    return request({
        url: '/book/findBooks',
        method: 'get',
        params: { query, limit, skip }
    })
}

// 获取根据关键词搜索书籍的数量
export function getfindBooksResultCount(query) {
    return request({
        url: '/book/getfindBooksResultCount',
        method: 'get',
        params: { query }
    })
}