<template>
    <div class="publish-book-contain">
        <div class="publish-book-contain-inner">
            <tab></tab>
            <div class="content">
                <div class="title"><h4>发布书籍</h4></div>
                <div class="publish-message">
                    <el-form ref="bookForm" :model="bookForm" label-width="120px" :rules="bookRules">
                        <el-form-item label="书籍名称" prop="title">
                            <el-input v-model="bookForm.title" placeholder="请输入书籍名称" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="书籍作者">
                            <el-input v-model="bookForm.author" placeholder="请输入书籍作者" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="书籍原价" prop="originalPrice">
                            <el-input v-model="bookForm.originalPrice" placeholder="请输入书籍原价" clearable type="number"></el-input>
                        </el-form-item>
                        <el-form-item label="书籍售价" prop="presentPrice">
                            <el-input v-model="bookForm.presentPrice" placeholder="请输入书籍售价" clearable type="number"></el-input>
                        </el-form-item>
                        <el-form-item label="书籍数量" prop="number">
                            <el-input v-model="bookForm.number" placeholder="请输入书籍数量" clearable type="number"></el-input>
                        </el-form-item>
                        <el-form-item label="出版社">
                            <el-input v-model="bookForm.publisher" placeholder="请输入出版社名称" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="出版时间">
                            <el-date-picker type="date" placeholder="请选择出版日期" v-model="bookForm.publishingTime" style="width: 25%;" clearable></el-date-picker>
                        </el-form-item>
                        <el-form-item label="ISBN">
                            <el-input v-model="bookForm.ISBN" placeholder="请输入ISBN" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="书籍版次">
                            <el-input v-model="bookForm.edition" placeholder="请输入书籍版次" clearable type="number"></el-input>
                        </el-form-item>
                        <el-form-item label="书籍编码">
                            <el-input v-model="bookForm.code" placeholder="请输入书籍编码" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="书籍包装">
                            <el-input v-model="bookForm.pack" placeholder="请输入书籍包装" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="书籍尺寸">
                            <el-input v-model="bookForm.size" placeholder="请输入书籍尺寸" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="书籍用纸">
                            <el-input v-model="bookForm.paper" placeholder="请输入书籍用纸" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="编辑推荐">
                            <el-input type="textarea" :rows="4" placeholder="请输入编辑推荐" v-model="bookForm.recommend"
                                      clearable></el-input>
                        </el-form-item>
                        <el-form-item label="内容简介">
                            <el-input type="textarea" :rows="4" placeholder="请输入内容简介" v-model="bookForm.contentIntroduction"
                                      clearable></el-input>
                        </el-form-item>
                        <el-form-item label="作者简介">
                            <el-input type="textarea" :rows="4" placeholder="请输入作者简介" v-model="bookForm.authorIntroduction"
                                      clearable></el-input>
                        </el-form-item>
                        <el-form-item label="书籍目录">
                            <el-input type="textarea" :rows="4" placeholder="请输入书籍目录" v-model="bookForm.digest"
                                      clearable></el-input>
                        </el-form-item>
                        <el-form-item label="书籍类别" prop="classification">
                            <el-cascader
                                v-model="bookForm.classification"  clearable
                                :options="options"
                                :props="{ expandTrigger: 'hover' }"></el-cascader>
                        </el-form-item>
                        
                        <el-form-item label="书籍封面图片" prop="coverPic">
                            <el-upload action="#" list-type="picture-card" :auto-upload="false"
                                    :limit="1" :on-exceed="coverPicExceed" :file-list="coverPicList"
                                    :on-change="coverPicChange">
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
                        <el-form-item label="书籍特色图片" prop="featurePic">
                            <el-upload action="#" list-type="picture-card" :auto-upload="false" multiple
                                    :limit="8" :on-exceed="featurePicExceed" :file-list="featurePicList"
                                    :on-change="featurePicChange">
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
                            <el-button type="primary" @click="onSubmit('bookForm')">立即发布</el-button>
                            <el-button @click="reset">重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import tab from '@/components/tab/tab'

export default {
    components:{
        tab
    },
    data() {
        return {
            bookForm: {
                title: '',
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
                url: '',
                feature: [],
                classification: '',
                state: 0
            },
            bookRules: {
                title: [
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
                ]
            },
            dialogImageUrl: '',
            dialogVisible: false,
            disabled: false,
            coverPicList: [],
            featurePicList: [],
            options: [],
            coverPic: '',
            featurePic: []
        }
    },
    methods: {
        onSubmit(formName) {
            this.$refs[formName].validate(async valid => {
                if (valid) {
                    // 上传书籍封面图片
                    let coverPicData = new FormData()
                    coverPicData.append('coverPic', this.coverPic)
                    const { url } = await this.$store.dispatch('file/postCoverPic', coverPicData)
                    // 上传书籍特色图片
                    let featurePicData = new FormData()
                    this.featurePic.forEach(pic => {
                        featurePicData.append('featurePic', pic)
                    })
                    const { picUrls } = await this.$store.dispatch('file/postFeaturePic', featurePicData)
                    this.bookForm.url = url
                    this.bookForm.feature = picUrls
                    if(this.bookForm.publishingTime) {
                        this.bookForm.publishingTime = moment(this.bookForm.publishingTime).format('YYYY-MM-DD')
                    }
                    await this.$store.dispatch('book/postBook', this.bookForm)
                    this.$message.success('书籍信息发布成功')
                } else {
                    return false;
                }
            });
        },
        reset(){
            this.$refs['bookForm'].resetFields();
            this.bookForm.author = ''
            this.bookForm.publisher = ''
            this.bookForm.publishingTime = ''
            this.bookForm.ISBN = ''
            this.bookForm.edition = ''
            this.bookForm.code = ''
            this.bookForm.pack = ''
            this.bookForm.size = ''
            this.bookForm.paper = ''
            this.bookForm.recommend = ''
            this.bookForm.contentIntroduction = ''
            this.bookForm.authorIntroduction = ''
            this.bookForm.digest = ''
            this.coverPic = ''
            this.featurePic = []
            this.coverPicList = []
            this.featurePicList = []
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        coverPicExceed(files, fileList) {
            this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        featurePicExceed(files, fileList) {
            this.$message.warning(`当前限制选择 8 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        coverPicChange(file, fileList) {
            this.coverPic = file.raw
        },
        featurePicChange(file, fileList) {
            this.featurePic.push(file.raw)
        }
    },
    async created() {
        let classificationOptions = []
        await this.$store.dispatch('booktype/getBookType').then(res => {
            classificationOptions = res.map(option => {
                let level_2 = option.level_2.map(lev2 => {
                    return {
                        value: lev2._id,
                        label: lev2.level_2
                    }
                })
                return {
                    label: option.level_1,
                    children: level_2
                }
            })
        })
        this.options = classificationOptions
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