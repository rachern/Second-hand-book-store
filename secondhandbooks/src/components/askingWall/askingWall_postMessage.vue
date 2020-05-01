<template>
    <div class="post-message">
        <el-form ref="postAskingForm" :model="postAskingForm" label-width="100px" :rules="postAskingRules">
            <el-form-item label="书籍名称" prop="title">
                <el-input v-model="postAskingForm.title"></el-input>
            </el-form-item>
            <el-form-item label="出版社">
                <el-input v-model="postAskingForm.press"></el-input>
            </el-form-item>
            <el-form-item label="出版时间">
                <el-date-picker type="date" placeholder="选择日期" v-model="postAskingForm.publishingTime" style="width: 100%;"></el-date-picker>
            </el-form-item>
            <el-form-item label="书籍作者">
                <el-input v-model="postAskingForm.author"></el-input>
            </el-form-item>
            <el-form-item label="书籍图片">
                <el-upload action="#" 
                           accept="image/png, image/jpeg"
                           list-type="picture-card" 
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
                        </span>
                    </div>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即发布</el-button>
                <el-button @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>  
</template>

<script>
import moment from 'moment'
export default {
    data() {
        return {
            postAskingForm: {
                title: '',
                press: '',
                publishingTime: '',
                author: '',
                pictures: [],
                state: 0
            },
            postAskingRules: {
                title: [
                    {required: true, message: '请输入书籍名称', trigger: 'blur'}
                ]
            },
            dialogImageUrl: '',
            dialogVisible: false,
            disabled: false,
            fileList: [],
            picList: []
        }
    },
    methods: {
        onSubmit() {
            this.$refs['postAskingForm'].validate(async valid => {
                if (valid) {
                    if(this.picList) {
                        let formData = new FormData()
                        this.picList.forEach(pic => {
                            formData.append('askingBook', pic)
                        })
                        const { picUrls } = await this.$store.dispatch('file/postAskingBook', formData)
                        this.postAskingForm.pictures = picUrls
                    } 
                    if(this.postAskingForm.publishingTime) {
                        this.postAskingForm.publishingTime = moment(this.postAskingForm.publishingTime).format('YYYY-MM-DD')
                    }
                    this.$store.dispatch('askingBook/postAskingBook', this.postAskingForm)
                        .then(res => {
                            this.$message.success(res.msg)
                            this.$router.push({path: '/AskingWall'})
                        })
                } else {
                    return false;
                }
            });
            
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleExceed(files, fileList) {
            console.log(fileList)
            this.$message.warning(`当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        handleChange(file, fileList) {
            this.picList.push(file.raw)
        },
        cancel() {
            this.$router.push({path: '/AskingWall'})
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