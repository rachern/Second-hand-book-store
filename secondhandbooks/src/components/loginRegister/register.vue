<template>
    <div class="register">
        <h3>注册</h3>
        <el-form 
            :model="registerForm" 
            :rules="registerRules" 
            ref="registerForm" 
            label-width="22%" 
            class="demo-registerForm form">
            <el-form-item label="用户昵称" prop="username" :error="errMsg">
                <el-input v-model="registerForm.username" placeholder="请输入用户昵称" @keyup.enter.native="onRegister"></el-input>
            </el-form-item>
            <el-form-item label="用户密码" prop="password">
                <el-input type="password" v-model="registerForm.password" placeholder="请输入用户密码（6-16个字符组成，区分大小写）" show-password @keyup.enter.native="onRegister"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="rePassword">
                <el-input type="password" v-model="registerForm.rePassword" placeholder="请再次输入密码" show-password @keyup.enter.native="onRegister"></el-input>
            </el-form-item>
            <el-form-item label="手机号码" prop="phoneNumber">
                <el-input v-model="registerForm.phoneNumber" placeholder="请输入常用的手机号码" @keyup.enter.native="onRegister"></el-input>
            </el-form-item>
            <el-form-item class="btn">
                <el-button type="info" plain @click="login">已有帐号，去登录</el-button>
                <el-button type="info" plain @click="onRegister">注册</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data(){
        //昵称验证
        let validateUsername = (rule,value,callback) => {
            if(!value || value.length === 0){
                callback(new Error('昵称不能为空'));
            }else{
                callback();
            }
        }
        //密码验证
        let validatePassword = (rule,value,callback) => {
            if(!value || value.length === 0){
                callback(new Error('密码不能为空'));
            }else if(!(/\w{6,16}/.test(value))){
                callback(new Error('密码必须由6-16个字符组成'));
            }else if(value === this.registerForm.rePassword){
                callback(this.$refs['registerForm'].clearValidate('rePassword'))
            }else{
                callback();
            }
        }
        //确认密码验证
        let validateRePassword = (rule,value,callback) => {
            if(!value || value.length === 0){
                callback(new Error('请再次输入密码'));
            }else if(value !== this.registerForm.password){
                callback(new Error('两次输入的密码不一致'));
            }else{
                callback();
            }
        }
        //手机号验证
        let validatePhone = (rule,value,callback) => {
            if(!value || value.length === 0){
                callback(new Error('手机号不能为空'));
            }else if(!(/^1[34578]\d{9}$/.test(value))){
                callback(new Error('请输入正确的手机号码'));
            }else{
                callback();
            }
        }
        return {
            errMsg: '',
            registerForm: {
                username: '',
                password: '',
                rePassword: '',
                phoneNumber: ''
            },
            registerRules: {
                username: [{ validator: validateUsername, trigger: 'blur' }],
                password: [{ validator: validatePassword, trigger: 'blur' }],
                rePassword: [{ validator: validateRePassword, trigger: 'blur' }],
                phoneNumber: [{ validator: validatePhone, trigger: 'blur' }]
            }
        }
    },
    methods:{
        onRegister(){
            this.$refs['registerForm'].validate(valid => {
                if (valid) {
                    this.errMsg = ''
                    this.$store.dispatch('user/register', this.registerForm)
                        .then(response => {
                            // if (response.data.msg === '用户名已存在') {
                            //     this.errMsg = '用户名已存在'
                            // } else if (response.data.msg !== '注册成功') {
                            //     this.$message.error(response.data.msg)
                            // } else {
                                this.$message.success('注册成功')
                                this.$refs['registerForm'].resetFields();
                                this.$emit('login');
                            // }
                        }).catch(err => {
                            console.log(err)
                        })
                } else {
                    return false
                }
            })
        },
        login(){
            this.$refs['registerForm'].resetFields();
            this.$emit('login');
        }
    }
}
</script>

<style lang="scss">
    .register{
        position: absolute;
        top: 50%;
        left: 50%;
        // transform: translate(-50%,-50%);
        transition: transform 1s;
        width: 460px;
        height: 420px;
        background-color: rgba(65, 63, 63, 0.3);
        border-radius: 15px;
        box-shadow: 0px 0px 10px 10px rgba(27, 24, 24, 0.6);
        padding: 20px 12px;
        h3{
            font-size: 28px;
            letter-spacing: 20px;
        }
        .form{
            margin-top: 20px;
            .btn{
                margin-top: 40px;
                .el-form-item__content{
                    margin-left: 0 !important;
                    text-align: center;
                }
                .code{
                    width: 70%;
                }
                .getCode{
                    width: 30%;
                }
            }
        }
    }
</style>