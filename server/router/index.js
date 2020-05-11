const boom = require('boom');

const Result = require('../utils/Result');
const jwtAuth = require('../utils/jwt')

module.exports = function(app){
    app.use(jwtAuth)

    app.all('*',(req,res,next)=>{
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,WG-App-Version, WG-Device-Id, WG-Network-Type, WG-Vendor, WG-OS-Type, WG-OS-Version, WG-Device-Model, WG-CPU, WG-Sid, WG-App-Id, WG-Token");
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By",' 3.2.1')
        res.header("Content-Type", "application/json;charset=utf-8");
        res.header("Access-Control-Max-Age", "0")
        next();
    })

    app.use('/user',require('./user'));
    app.use('/carousel',require('./carousel'));
    app.use('/booktype',require('./booktype'));
    app.use('/book',require('./book'))
    app.use('/comment',require('./comment'))
    app.use('/askingBook',require('./askingBook'))
    app.use('/file',require('./file'))
    app.use('/address',require('./address'))

    /**
     * 集中处理404请求的中间件
     * 注意：该中间件必须放在正常处理流程之后
     * 否则，会拦截正常请求
     */
    app.use((req, res, next) => {
        next(boom.notFound('接口不存在'));
    })

    /**
     * 自定义路由异常处理中间件
     * 注意两点：
     * 第一，方法的参数不能减少
     * 第二，方法的必须放在路由最后
     */
    app.use((err, req, res, next) => {
        console.log(err)
        if(err.name && err.name === 'UnauthorizedError') {
            const { status = 401, message } = err
            new Result(null, 'Token验证失败', {
                error: status,
                errorMsg: message
            }).jwtError(res.status(status)) 
        } else {
            const msg = (err && err.message) || '系统错误';
            const statusCode = (err.output && err.output.statusCode) || 500;
            const errorMsg = (err.output && err.output.payload && err.output.payload.error) || err.message;
            new Result(null, msg, {
                error: statusCode,
                errorMsg
            }).fail(res.status(statusCode))
        }
    })
}