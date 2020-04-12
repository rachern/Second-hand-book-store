import request from '@/utils/request'

//获取评论的数量
export function getCommentCount(id) {
    return request({
        url: '/comment/getCommentCount',
        method: 'get',
        params: { id }
    })
}

//获取评论
export function getComments(id, limit, skip) {
    return request({
        url: '/comment/getComments',
        method: 'get',
        params: {id, limit, skip}
    })
}