const jwt = require('express-jwt')

const { PRIVATE_KEY } = require('../utils/constant')

module.exports = jwt({
    secret: PRIVATE_KEY,
    credentialsRequired: true
}).unless({
    path: [
        '/user/login',//登录
        '/user/register',//注册
        '/carousel/getCarousel',//获取首页轮播图
        '/booktype/getBookType',//获取书籍分类
        '/book/getHomeBooks',//获取首页展示书籍
        '/book/getClassificationBooksCount',//获取分类展示页书籍的数量
        '/book/getClassificationBooks',//获取分类展示页书籍
        '/book/getBookDetail',//获取书籍详情
        '/book/getfindBooksResultCount',//获取根据关键词搜索书籍的数量
        '/book/findBooks', //根据关键词搜索书籍
        '/comment/getCommentCount',//获取评论数量
        '/comment/getComments',//获取评论
        '/askingBook/getAskingBookCount',//获取征书墙书籍数量
        '/askingBook/getAskingBooks',//获取征书墙书籍
    ]
})