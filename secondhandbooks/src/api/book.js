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
        methos: 'get',
        params: { limit, skip }
    })
}

// 获取当前用户发布的书籍数量
export function getMyPublishBooksCount() {
    return request({
        url: '/book/getMyPublishBooksCount',
        methods: 'get'
    })
}