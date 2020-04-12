const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const db = require('./db/connect');
const router = require('./router');

const app = express();

//body-parser中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
//静态资源管理中间件
app.use(express.static(path.join(__dirname,'public')));

router(app);

app.listen(3000,(err,doc)=>{
    if(err){
        console.log('服务器启动失败');
    }else{
        console.log('服务器启动成功');
    }
});