const express = require('express')
const multer = require('multer')
const upload = multer({dest: 'uploads/'})
const path = require('path')
const fs = require('fs')

const Result = require('../utils/Result')

const router = express.Router()

// 上传头像
router.post('/postAvatar', upload.single('avatar'), async (req, res) => {
    if(req.file) {
        //图片名称，避免重复
        let filename = new Date().getTime() + parseInt(Math.random()*9999) + '.' + req.file.originalname
        //上传图片保存的路径
        let des_file = path.join(__dirname, '../public/imgs/avatars/') + filename
        // console.log('des_file',des_file)
        fs.readFile(req.file.path, (err, data) => {
            if(err) {
                new Result('头像上传失败').fail(res)
                return
            }
            fs.writeFile(des_file, data, err => {
                if(err) {
                    new Result('头像上传失败').fail(res)
                    return
                }
                new Result({ url: `http://localhost:3000/imgs/avatars/${filename}` }, '头像上传成功').success(res)
            })
        })
    }
})

// 上传征书墙图片
router.post('/postAskingBook', upload.array('askingBook'), async (req, res) => {
    if(req.files) {
        let picUrls = []
        for(let file of req.files) {
            // 图片名称，避免重复
            let filename = new Date().getTime() + parseInt(Math.random()*9999) + '.' + file.originalname
            // 上传图片保存路径
            let des_file = path.join(__dirname, '../public/imgs/askingBook/') + filename

            picUrls.push(new Promise((resolve, reject) => {
                fs.readFile(file.path, (err, data) => {
                    if(err) {
                        new Result('图片上传失败').fail(res)
                        return
                    }
                    fs.writeFile(des_file, data, err => {
                        if(err) {
                            new Result('图片上传失败').fail(res)
                            return
                        }
                        resolve({url: `http://localhost:3000/imgs/askingBook/${filename}`})
                    })
                })
            }))
        }
        Promise.all(picUrls).then(picUrls => {
            new Result({picUrls}, '图片上传成功').success(res)
        })
    }
})

// 上传书籍封面
router.post('/postCoverPic', upload.single('coverPic'), async (req, res) => {
    if(req.file) {
        //图片名称，避免重复
        let filename = new Date().getTime() + parseInt(Math.random()*9999) + '.' + req.file.originalname
        //上传图片保存的路径
        let des_file = path.join(__dirname, '../public/imgs/bookCoverPic/') + filename
        fs.readFile(req.file.path, (err, data) => {
            if(err) {
                new Result('书籍封面图片上传失败').fail(res)
                return
            }
            fs.writeFile(des_file, data, err => {
                if(err) {
                    new Result('书籍封面图片上传失败').fail(res)
                    return
                }
                new Result({ url: `http://localhost:3000/imgs/bookCoverPic/${filename}` }, '书籍封面图片上传成功').success(res)
            })
        })
    }
})

// 上传书籍特色图片
router.post('/postFeaturePic', upload.array('featurePic'), async (req, res) => {
    if(req.files) {
        let picUrls = []
        for(let file of req.files) {
            // 图片名称，避免重复
            let filename = new Date().getTime() + parseInt(Math.random()*9999) + '.' + file.originalname
            // 上传图片保存路径
            let des_file = path.join(__dirname, '../public/imgs/bookFeaturePic/') + filename

            picUrls.push(new Promise((resolve, reject) => {
                fs.readFile(file.path, (err, data) => {
                    if(err) {
                        new Result('书籍特色图片上传失败').fail(res)
                        return
                    }
                    fs.writeFile(des_file, data, err => {
                        if(err) {
                            new Result('书籍特色图片上传失败').fail(res)
                            return
                        }
                        resolve({url: `http://localhost:3000/imgs/bookFeaturePic/${filename}`})
                    })
                })
            }))
        }
        Promise.all(picUrls).then(picUrls => {
            new Result({picUrls}, '书籍特色图片上传成功').success(res)
        })
    }
})
module.exports = router