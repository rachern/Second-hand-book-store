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

// 删除书籍分类
export function deleteBookType(bookType) {
    return request({
        url: '/booktype/deleteBookType',
        method: 'post',
        data: { bookType }
    })
}

// 修改书籍分类
export function updateBookType(obj) {
    return request({
        url: '/booktype/updateBookType',
        method: 'post',
        data: obj
    })
}