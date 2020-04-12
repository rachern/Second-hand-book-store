<template>
    <div class="post-message">
        <el-form ref="form" :model="form" label-width="100px" :rules="rules">
            <el-form-item label="书籍名称" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="出版社">
                <el-input v-model="form.publisher"></el-input>
            </el-form-item>
            <el-form-item label="出版时间">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.publishingTime" style="width: 100%;"></el-date-picker>
            </el-form-item>
            <el-form-item label="书籍作者">
                <el-input v-model="form.author"></el-input>
            </el-form-item>
            <el-form-item label="书籍图片">
                <el-upload action="http://localhost:3000/upload/askingBook" 
                           accept="image/png, image/jpeg"
                           list-type="picture-card" 
                           name="askingBook"
                           ref="askingBookUpload"
                           multiple
                           :auto-upload="false"
                           :limit="5" 
                           :on-exceed="handleExceed" 
                           :file-list="fileList"
                           :on-change="handleChange">
                    <i slot="default" class="el-icon-plus"></i>
                    <div slot="file" slot-scope="{file}">
                        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                        <span class="el-upload-list__item-actions">
                            <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                                <i class="el-icon-zoom-in"></i>
                            </span>
                            <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
                                <i class="el-icon-download"></i>
                            </span>
                            <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                                <i class="el-icon-delete"></i>
                            </span>
                        </span>
                    </div>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即发布</el-button>
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
                name: '',
                publisher: '',
                publishingTime: '',
                author: '',
                pics: []
            },
            rules: {
                name: [
                    {required: true, message: '请输入书籍名称', trigger: 'blur'}
                ]
            },
            dialogImageUrl: '',
            dialogVisible: false,
            disabled: false,
            fileList: []
        }
    },
    methods: {
        onSubmit() {
            this.$refs.askingBookUpload.submit();
            console.log('submit!');
        },
        handleRemove(file) {
            console.log(file);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleDownload(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            console.log(fileList)
            this.$message.warning(`当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        handleChange(file, fileList) {
            console.log(file, fileList)
        }
    }
}
</script>

<style lang="scss">
    .el-form-item__label{
        padding-right: 20px;
    }
    .post-message{
        background-color: #fff;
        text-align: left;
        border: 1px solid #eee;
        margin-top: 20px;
        padding: 20px 100px;
    }
</style>