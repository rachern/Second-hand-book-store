import { postAvatar, postAskingBook, postCoverPic, postFeaturePic, postCarousel } from '@/api/file'

const state = {

}

const mutations = {

}

const actions = {
    // 上传头像
    postAvatar({ commit }, formData) {
        return new Promise((resolve, reject) => {
            postAvatar(formData).then(response => {
                resolve(response.data.data)
            })
        })
    },

    // 上传征书墙图片
    postAskingBook({ commit }, formData) {
        return new Promise((resolve, reject) => {
            postAskingBook(formData).then(response => {
                resolve(response.data.data)
            })
        })
    },

    // 上传书籍封面
    postCoverPic({ commit }, coverPicData) {
        return new Promise((resolve, reject) => {
            postCoverPic(coverPicData).then(response => {
                resolve(response.data.data)
            })
        })
    },

    // 上传书籍特色图片
    postFeaturePic({ commit }, featurePicData) {
        return new Promise((resolve, reject) => {
            postFeaturePic(featurePicData).then(response => {
                resolve(response.data.data)
            })
        })
    },

    // 上传轮播图片
    postCarousel({ commit }, carouselData) {
        return new Promise((resolve, reject) => {
            postCarousel(carouselData).then(response => {
                resolve(response.data.data)
            })
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}