<template>
    <div class="login">
        <h3>登录</h3>
        <el-form 
            :model="loginForm" 
            :rules="loginRules" 
            ref="loginForm" 
            label-width="22%" 
            class="demo-loginForm form"
            hide-required-asterisk>
            <el-form-item label="用户昵称" prop="username">
                <el-input v-model="loginForm.username" 
                        placeholder="请输入用户昵称" 
                        ref="loginUsername"
                        @keyup.enter.native="onLogin"></el-input>
            </el-form-item>
            <el-form-item label="用户密码" prop="password" :error="errMsg">
                <el-input v-model="loginForm.password" placeholder="请输入用户密码" ref="loginPassword" show-password @keyup.enter.native="onLogin"></el-input>
            </el-form-item>
            <el-form-item class="btn">
                <el-button type="info" plain @click="onLogin">登录</el-button>
                <el-button type="info" plain @click="register">没有账号，去注册</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { login } from '@/api/user'
import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'

export default {
    props: ['redirect'],
    data(){
        const validatePassword = (rule, value, callback) => {
            if (!value || value.length === 0) {
                callback(new Error('密码不能为空'))
            } else if (value.length < 6) {
                callback(new Error('密码不能少于6位'))
            } else {
                callback()
            }
        }

        return {
            errMsg: '',
            loginForm: {
                username: '',
                password: ''
            },
            loginRules: {
                username: [
                    { required: true, message: '用户昵称不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, trigger: 'blur', validator: validatePassword }
                ]
            }
        }
    },
    methods:{
        onLogin(){
            this.$refs['loginForm'].validate(valid => {
                if (valid) {
                    this.errMsg = ""
                    this.$store.dispatch('user/login', this.loginForm)
                        .then(res => {
                            if(this.redirect){
                                this.$router.push({ path: this.redirect })
                            }
                            this.$router.push({ path: '/' })
                        })
                        .catch(err => {
                            console.log(err)
                        })
                } else {
                    return false
                }
            })
        },
        register(){
            this.$refs['loginForm'].resetFields();
            this.$emit('register');
        }
    }
}
</script>

<style lang="scss">
    .login{
        position: absolute;
        top: 50%;
        left: 50%;
        // transform: translateX(-50%) translateY(-50%);
        transition: transform 1s;
        width: 460px;
        height: 300px;
        background-color: rgba(65, 63, 63, 0.3);
        border-radius: 15px;
        box-shadow: 0px 0px 10px 10px rgba(27, 24, 24, 0.6);
        padding: 20px 12px;
        // transform: translateX(100%);
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
            }
        }
    }
    .el-form-item__label{
        font-size: 18px;
        color: rgb(29, 28, 28);
    }
    .el-form-item__content{
        text-align: left;
    }
    .el-form-item__error{
        font-size: 16px;
        color: #e73232
    }
    .el-input{
        font-size: 16px;
        width: 100%;
        // border-radius: 15px;
        .el-input__inner{
            border-radius: 20px;
            border: 1.5px solid rgba(27, 24, 24, 0.6);
        }
    }
    .el-switch.is-checked .el-switch__core{
        border-color: #292829;
        background-color: #292829;
    }
    .el-button{
        border-radius: 20px;
        border: 1.5px solid rgba(27, 24, 24, 0.6);
        width: 40%;
        font-size: 16px;
    }
    .el-button--info.is-plain{
        border: 1.5px solid rgba(27, 24, 24, 0.6);
    }
</style>