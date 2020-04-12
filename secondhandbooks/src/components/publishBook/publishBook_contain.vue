<template>
    <div class="publish-book-contain">
        <div class="publish-book-contain-inner">
            <tab></tab>
            <div class="content">
                <div class="title"><h4>发布书籍</h4></div>
                <div class="publish-message">
                    <el-form ref="ruleForm" :model="form" label-width="120px" :rules="rules">
                        <el-form-item label="书籍名称" prop="name">
                            <el-input v-model="form.name" placeholder="请输入书籍名称" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="书籍作者">
                            <el-input v-model="form.author" placeholder="请输入书籍作者" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="书籍原价" prop="originalPrice">
                            <el-input v-model="form.originalPrice" placeholder="请输入书籍原价" clearable type="number"></el-input>
                        </el-form-item>
                        <el-form-item label="书籍售价" prop="presentPrice">
                            <el-input v-model="form.presentPrice" placeholder="请输入书籍售价" clearable type="number"></el-input>
                        </el-form-item>
                        <el-form-item label="书籍数量" prop="number">
                            <el-input v-model="form.number" placeholder="请输入书籍数量" clearable type="number"></el-input>
                        </el-form-item>
                        <el-form-item label="出版社">
                            <el-input v-model="form.publisher" placeholder="请输入出版社名称" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="出版时间">
                            <el-date-picker type="date" placeholder="请选择出版日期" v-model="form.publishingTime" style="width: 25%;" clearable></el-date-picker>
                        </el-form-item>
                        <el-form-item label="ISBN">
                            <el-input v-model="form.ISBN" placeholder="请输入ISBN" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="书籍版次">
                            <el-input v-model="form.edition" placeholder="请输入书籍版次" clearable type="number"></el-input>
                        </el-form-item>
                        <el-form-item label="书籍编码">
                            <el-input v-model="form.code" placeholder="请输入书籍编码" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="书籍包装">
                            <el-input v-model="form.pack" placeholder="请输入书籍包装" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="书籍尺寸">
                            <el-input v-model="form.size" placeholder="请输入书籍尺寸" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="书籍用纸">
                            <el-input v-model="form.paper" placeholder="请输入书籍用纸" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="编辑推荐">
                            <el-input type="textarea" :rows="4" placeholder="请输入编辑推荐" v-model="form.recommend"
                                      clearable></el-input>
                        </el-form-item>
                        <el-form-item label="内容简介">
                            <el-input type="textarea" :rows="4" placeholder="请输入内容简介" v-model="form.contentIntroduction"
                                      clearable></el-input>
                        </el-form-item>
                        <el-form-item label="作者简介">
                            <el-input type="textarea" :rows="4" placeholder="请输入作者简介" v-model="form.authorIntroduction"
                                      clearable></el-input>
                        </el-form-item>
                        <el-form-item label="书籍目录">
                            <el-input type="textarea" :rows="4" placeholder="请输入书籍目录" v-model="form.digest"
                                      clearable></el-input>
                        </el-form-item>
                        <el-form-item label="书籍类别" prop="classification">
                            <el-cascader
                                v-model="form.classification"  clearable
                                :options="options"
                                :props="{ expandTrigger: 'hover' }"></el-cascader>
                        </el-form-item>
                        
                        <el-form-item label="书籍封面图片" prop="coverPic">
                            <el-upload action="#" list-type="picture-card" :auto-upload="false" multiple
                                    :limit="1" :on-exceed="handleExceed" :file-list="fileList"
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
                        <el-form-item label="书籍特色图片" prop="featurePic">
                            <el-upload action="#" list-type="picture-card" :auto-upload="false" multiple
                                    :limit="5" :on-exceed="handleExceed" :file-list="fileList"
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
                            <el-button type="primary" @click="onSubmit('ruleForm')">立即发布</el-button>
                            <el-button>取消</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import tab from '@/components/tab/tab'

export default {
    components:{
        tab
    },
    data() {
        return {
            form: {
                name: '',
                originalPrice: '',
                presentPrice: '',
                number: '',
                publisher: '',
                publishingTime: '',
                author: '',
                ISBN: '',
                edition: '',
                code: '',
                pack: '',
                size: '',
                paper: '',
                recommend: '',
                contentIntroduction: '',
                authorIntroduction: '',
                digest: '',
                pics: [],
                classification: []
            },
            rules: {
                name: [
                    {required: true, message: '请输入书籍名称', trigger: 'blur'}
                ],
                originalPrice: [
                    {required: true, message: '请输入书籍原价', trigger: 'blur'}
                ],
                presentPrice: [
                    {required: true, message: '请输入书籍售价', trigger: 'blur'}
                ],
                number: [
                    {required: true, message: '请输入书籍数量', trigger: 'blur'}
                ],
                classification: [
                    {required: true, message: '请选择书籍类别', trigger: 'change'}
                ],
                coverPic: [
                    {required: true, message: '请上传书籍封面图片', trigger: 'change'}
                ],
                featurePic: [
                    {required: true, message: '请上传书籍特色图片', trigger: 'change'}
                ]
            },
            dialogImageUrl: '',
            dialogVisible: false,
            disabled: false,
            fileList: [],
            options: [{
                value: 'zhinan',
                label: '指南',
                children: [{
                    value: 'shejiyuanze',
                    label: '设计原则',
                }, {
                    value: 'daohang',
                    label: '导航',
                }]
            }, {
                value: 'zujian',
                label: '组件',
                children: [{
                    value: 'basic',
                    label: 'Basic',
                }, {
                    value: 'form',
                    label: 'Form',
                }, {
                    value: 'data',
                    label: 'Data',
                }, {
                    value: 'notice',
                    label: 'Notice',
                }, {
                    value: 'navigation',
                    label: 'Navigation',
                }, {
                    value: 'others',
                    label: 'Others',    
                }]
            }, {
                value: 'ziyuan',
                label: '资源',
            }]
        }
    },
    methods: {
        onSubmit(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
            // console.log('submit!');
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
    .publish-book-contain{
        // height: 1000px;
        min-height: 604px;
        background-color: rgba(255,255,255,.8);
        .publish-book-contain-inner{
            padding-bottom: 30px;
            width: 90vw;
            margin: 0 auto;
            .content{
                // border: 1px solid red;
                margin: 30px 30px 0;
                background-color: #fff;
                text-align: left;
                border: 1px solid #eee;
                padding: 20px;
                .title{
                    background-color: #f7f7f7;
                    border: 1px solid #eee;
                    padding: 10px 20px;
                }
                .publish-message{
                    background-color: #fff;
                    text-align: left;
                    border: 1px solid #eee;
                    padding: 20px 100px;
                }
            }
        }
    }
</style>