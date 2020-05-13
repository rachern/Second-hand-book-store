import request from '@/utils/request'

// 获取角色列表
export function getRoles() {
    return request({
        url: '/role/getRoles',
        method: 'get'
    })
}