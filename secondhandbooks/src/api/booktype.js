import request from '@/utils/request'

// 获取书籍分类
export function getBookType() {
    return request({
        url: '/booktype/getBookType',
        method: 'get'
    })
}