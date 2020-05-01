<template>
    <div class="personalCenter_personalInformation">
        <el-form ref="informationForm" :model="informationForm" label-width="80px">
            <el-form-item label="当前头像">
                <el-upload
                    class="avatar-uploader"
                    action="#"
                    :auto-upload="false"
                    :show-file-list="false"
                    :on-change="handlePreview"
                    list-type="picture">
                    <img v-if="informationForm.imageUrl" :src="informationForm.imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="用户名">
                <el-input v-model="informationForm.username"></el-input>
            </el-form-item>
            <el-form-item label="手机号码">
                <el-input v-model="informationForm.phoneNumber"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="informationForm.email"></el-input>
            </el-form-item>
            <el-form-item label="性别">
                <el-radio-group v-model="informationForm.sex">
                    <el-radio :label=0>男</el-radio>
                    <el-radio :label=1>女</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="个人简介">
                <el-input type="textarea" v-model="informationForm.introduction" :rows="5"></el-input>
            </el-form-item>
            <el-form-item>  
                <el-button type="primary" @click="onSubmit">确认</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            informationForm: {
                username: this.$store.getters.username || '',
                imageUrl: this.$store.getters.avatar || '',
                sex: this.$store.getters.sex || 0,
                introduction: this.$store.getters.introduction || '',
                phoneNumber: this.$store.getters.phoneNumber || '',
                email: this.$store.getters.email || ''
            },
            file: ''
        }
    },
    methods: {
        async onSubmit() {
            if(this.file) {
                let formData = new FormData()
                formData.append('avatar', this.file)
                const { url } = await this.$store.dispatch('file/postAvatar', formData)
                let information = this.informationForm
                information.imageUrl = url
                this.$store.dispatch('user/updateInformation', information).then(res => {
                    this.$message.success('个人信息修改成功')
                    if(information.username !== this.$store.getters.username) {
                        //修改了用户名，需要重新登录
                        this.$store.dispatch('user/resetToken').then(() => {
                            location.reload()
                        })
                    }
                    location.reload()
                }).catch(err => {
                    console.log(err)
                })
            }
        },
        handlePreview(file,fileList) {
            this.informationForm.imageUrl = file.url
            this.file = file.raw
        }
    }
}
</script>

<style lang="scss">
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 150px;
        height: 150px;
        line-height: 150px;
        text-align: center;
    }
    .avatar {
        width: 150px;
        height: 150px;
        display: block;
    }
    .personalCenter_personalInformation{
        float: right;
        width: 52vw;
        min-width: 676px;
        // height: 400px;
        background-color: #fff;
        padding: 20px 100px 30px 50px;
        text-align: left;
        margin-bottom: 20px;
    }
</style>