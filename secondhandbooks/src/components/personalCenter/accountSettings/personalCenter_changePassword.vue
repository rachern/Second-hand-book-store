<template>
    <div class="personalCenter_changePassword">
        <el-form ref="passwordForm" :model="passwordForm" :rules="passwordRules" label-width="80px">
            <el-form-item label="原密码" prop="originalPassword">
                <el-input v-model="passwordForm.originalPassword"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPassword">
                <el-input v-model="passwordForm.newPassword" show-password></el-input>
            </el-form-item>
            <el-form-item label="重复密码" prop="repeatPassword">
                <el-input v-model="passwordForm.repeatPassword" show-password></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">确认</el-button>
                <el-button @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        //原密码验证
        let validateOriginalPassword = (rule,value,callback) => {
            if(!value || value.length === 0){
                callback(new Error('原密码不能为空'));
            }else{
                callback();
            }
        }

        //新密码验证
        let validateNewPassword = (rule,value,callback) => {
            if(!value || value.length === 0){
                callback(new Error('新密码不能为空'));
            }else if(!(/\w{6,16}/.test(value))){
                callback(new Error('新密码必须由6-16个字符组成'));
            }else if(value === this.passwordForm.repeatPassword){
                callback(this.$refs['passwordForm'].clearValidate('repeatPassword'))
            }else{
                callback();
            }
        }

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
                originalPassword: [{ validator: validateOriginalPassword, trigger: 'blur' }],
                newPassword: [{ validator: validateNewPassword, trigger: 'blur' }],
                repeatPassword: [{ validator: validateRePassword, trigger: 'blur' }]
            }
        }
    },
    methods: {
        onSubmit() {
            this.$refs['passwordForm'].validate(valid => {
                if (valid) {
                    this.$store.dispatch('user/changePassword', this.passwordForm)
                        .then(response => {
                            this.$message.success('密码修改成功')
                            this.$store.dispatch('user/resetToken').then(() => {
                                location.reload()
                            })
                        }).catch(err => {
                            console.log(err)
                        })
                } else {
                    return false
                }
            })
        },
        cancel() {
            this.passwordForm = {
                originalPassword: '',
                newPassword: '',
                repeatPassword: ''
            }
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