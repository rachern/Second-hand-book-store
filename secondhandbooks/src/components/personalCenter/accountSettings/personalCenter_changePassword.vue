<template>
    <div class="personalCenter_changePassword">
        <el-form ref="form" :model="passwordForm" :rules="passwordRules" label-width="80px">
            <el-form-item label="原密码">
                <el-input v-model="passwordForm.originalPassword"></el-input>
            </el-form-item>
            <el-form-item label="新密码">
                <el-input v-model="passwordForm.newPassword"></el-input>
            </el-form-item>
            <el-form-item label="重复密码" prop="repeatPassword">
                <el-input v-model="passwordForm.repeatPassword"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">确认</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        //确认密码验证
        let validateRePassword = (rule,value,callback) => {
            if(!value || value.length === 0){
                callback(new Error('请再次输入密码'));
            }else if(value !== this.passwordForm.newPassword){
                callback(new Error('两次输入的密码不一致'));
            }else{
                callback();
            }
        }

        return {
            passwordForm: {
                originalPassword: '',
                newPassword: '',
                repeatPassword: ''
            },
            passwordRules: {
                repeatPassword: [{ validator: validateRePassword, trigger: 'blur' }]
            }
        }
    },
    methods: {
        onSubmit() {
            console.log('submit!');
        }
    }
}
</script>

<style lang="scss">
    .personalCenter_changePassword{
        position: relative;
        right: 0;
        display: inline-block;
        width: 52vw;
        min-width: 676px;
        height: 400px;
        background-color: #fff;
        padding: 50px 100px 0 50px;
    }
</style>