import request from '@/utils/request'

// 获取书籍分类
export function getBookType() {
    return request({
        url: '/booktype/getBookType',
        method: 'get'
    })
}

// 添加书籍分类
export function addBookType(bookType) {
    return request({
        url: '/booktype/addBookType',
        method: 'post',
        data: { bookType }
    })
}