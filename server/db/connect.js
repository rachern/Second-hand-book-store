const mongoose = require('mongoose');
//数据库连接
mongoose.connect('mongodb://localhost/secondhandbooks',{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false})
    .then(()=>console.log('数据库连接成功'))
    .catch(err=>console.log(err,'数据库连接失败'))