//定义返回码常量
module.exports = {
    CODE_ERROR: -1,
    CODE_SUCCESS: 0,
    CODE_TOKEN_EXPIRED: -2,
    PWD_SALT: 'admin_jun_secondhandbooks',  //用于md5加密的盐值
    PRIVATE_KEY: 'admin_jun_secondhandbooks', //用于jwt加密私钥
    JWT_EXPIRED: 60 * 60  //jwt过期时间
}