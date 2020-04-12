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
    role:{//权限
        //超级管理员  3
        //管理员      2
        //普通用户    1
        //游客        0
        type:Number,
        enum:[]
    }
})

//用户集合模型
const User = mongoose.model('user', userSchema)

export default User