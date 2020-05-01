import request from '@/utils/request'

// 上传头像文件
export function postAvatar(formData) {
    return request({
        url: '/file/postAvatar',
        method: 'post',
        data: formData
    })
}

// 上传征书墙图片
export function postAskingBook(formData) {
    return request({
        url: '/file/postAskingBook',
        method: 'post',
        data: formData
    })
}

// 上传书籍封面
export function postCoverPic(coverPicData) {
    return request({
        url: '/file/postCoverPic',
        method: 'post',
        data: coverPicData
    })
}

// 上传书籍特色图片
export function postFeaturePic(featurePicData) {
    return request({
        url: '/file/postFeaturePic',
        method: 'post',
        data: featurePicData
    })
}