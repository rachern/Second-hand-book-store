const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const db = require('./db/connect');
const router = require('./router');
const socketServer = require('./router/socket')

const app = express();
const server = app.listen(3001)
const io = require('socket.io').listen(server)

//body-parser中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
//静态资源管理中间件
app.use(express.static(path.join(__dirname,'public')));

socketServer(io);
router(app);

app.listen(3000,(err,doc)=>{
    if(err){
        console.log('服务器启动失败');
    }else{
        console.log('服务器启动成功');
    }
});