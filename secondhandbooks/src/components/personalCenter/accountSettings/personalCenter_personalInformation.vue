<template>
    <div class="personalCenter_personalInformation">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="当前头像">
                <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :auto-upload="false"
                    :show-file-list="false"
                    :on-change="handlePreview"
                    list-type="picture">
                    <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="用户名">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="手机号码">
                <el-input v-model="form.phoneNumber"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="性别">
                <el-radio-group v-model="form.sex">
                    <el-radio :label=0>男</el-radio>
                    <el-radio :label=1>女</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="个人简介">
                <el-input type="textarea" v-model="form.introduction" :rows="5"></el-input>
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
        return {
            form: {
                username: '',
                imageUrl: '',
                sex: 0,
                introduction: '',
                phoneNumber: '',
                email: ''
            },
            dialogImageUrl: '',
            dialogVisible: false,
            disabled: false
        }
    },
    methods: {
        onSubmit() {
            console.log('submit!');
        },
        handlePreview(file,fileList) {
            console.log(file,fileList)
            this.form.imageUrl = file.url
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