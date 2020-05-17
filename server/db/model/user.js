const mongoose = require('mongoose');

//创建用户集合规则
const userSchema = new mongoose.Schema({
    username:{//用户名
        type:String,
        required:true,
        trim:true
    },
    password:{//密码
        type:String,
        required:true,
        trim:true
    },
    url:{//头像路径
        type:String,
        trim:true
    },
    sex:{//性别
        //男  0
        //女  1
        type:Number,
        enum:[0,1]
    },
    introduction:{//个人简介
        type:String
    },
    phoneNumber:{//手机号码
        type:String,
        trim:true
    },
    email:{//邮箱
        type:String,
        trim:true
    },
    roles:{//权限
        //超级管理员  superAdmin
        //管理员      admin
        //普通用户    user
        type:Array
    },
    collections:{//收藏
        type:Array
    },
    cartList:[Object],//购物车
    message: { // 消息
        type: Object
    }
})

//将Schema对象转化为数据模型
const User = mongoose.model('user', userSchema);//该数据对象和集合关联（'集合名',schema对象）

module.exports = User;