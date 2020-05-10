<template>
    <div class="post-book-review-by-id">
        <div class="title" id="post-book-review-by-id-title"><h4>书籍审核</h4></div>
        <div class="book-message">
            <el-form ref="bookDetail" :model="bookDetail" label-width="120px" :disabled="true">
                <el-form-item label="书籍名称" prop="title">
                    <el-input :value="bookDetail.title"></el-input>
                </el-form-item>
                <el-form-item label="书籍作者">
                    <el-input :value="bookDetail.author"></el-input>
                </el-form-item>
                <el-form-item label="书籍原价" prop="originalPrice">
                    <el-input :value="bookDetail.originalPrice.toFixed(2) + '元'"></el-input>
                </el-form-item>
                <el-form-item label="书籍售价" prop="presentPrice">
                    <el-input :value="bookDetail.presentPrice.toFixed(2) + '元'"></el-input>
                </el-form-item>
                <el-form-item label="书籍数量" prop="number">
                    <el-input :value="bookDetail.number + '本'"></el-input>
                </el-form-item>
                <el-form-item label="出版社">
                    <el-input :value="bookDetail.publisher"></el-input>
                </el-form-item>
                <el-form-item label="出版时间">
                    <el-input :value="bookDetail.publishingTime"></el-input>
                </el-form-item>
                <el-form-item label="ISBN">
                    <el-input :value="bookDetail.ISBN"></el-input>
                </el-form-item>
                <el-form-item label="书籍版次">
                    <el-input :value="bookDetail.edition"></el-input>
                </el-form-item>
                <el-form-item label="书籍编码">
                    <el-input :value="bookDetail.code"></el-input>
                </el-form-item>
                <el-form-item label="书籍包装">
                    <el-input :value="bookDetail.pack"></el-input>
                </el-form-item>
                <el-form-item label="书籍尺寸">
                    <el-input :value="bookDetail.size"></el-input>
                </el-form-item>
                <el-form-item label="书籍用纸">
                    <el-input :value="bookDetail.paper"></el-input>
                </el-form-item>
                <el-form-item label="编辑推荐">
                    <el-input type="textarea" :rows="8" :value="bookDetail.recommend"></el-input>
                </el-form-item>
                <el-form-item label="内容简介">
                    <el-input type="textarea" :rows="8" :value="bookDetail.contentIntroduction"></el-input>
                </el-form-item>
                <el-form-item label="作者简介">
                    <el-input type="textarea" :rows="8" :value="bookDetail.authorIntroduction"></el-input>
                </el-form-item>
                <el-form-item label="书籍目录">
                    <el-input type="textarea" :rows="8" :value="bookDetail.digest"></el-input>
                </el-form-item>
                <el-form-item label="书籍类别" prop="classification">
                    <el-input :value="bookDetail.classification.level_1 + '/' + bookDetail.classification.level_2"></el-input>
                </el-form-item>
                
                <el-form-item label="书籍封面图片" prop="coverPic">
                    <img :src="bookDetail.url" />
                </el-form-item>
                <el-form-item label="书籍特色图片" prop="featurePic">
                    <img v-for="(img,index) in bookDetail.feature" :key="index" :src="img.url" />
                </el-form-item>
            </el-form>
            <div class="btn">
                <el-button type="primary" class="pass" @click="pass">通过</el-button>
                <el-button type="danger" @click="reject">驳回</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { MessageBox } from 'element-ui'

export default {
    methods: {
        pass() {
            this.$store.dispatch('book/passPostBook', this.$route.params.id).then(res => {
                this.$message({
                    type: 'success',
                    message: '操作成功'
                }); 
                this.$router.push({path:"/ManagementEnd/bookReview/post"})  
            })
        },
        reject() {
            MessageBox.prompt('请输入驳回原因', '消息', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(({value}) => {
                if(!value || value.trim().length == 0) {
                    this.$message({
                        type: 'error',
                        message: '驳回内容不可为空'
                    });   
                } else {
                    this.$store.dispatch('book/rejectPostBook', {id:this.$route.params.id, rejectReason: value}).then(res => {
                        this.$message({
                            type: 'success',
                            message: '驳回成功'
                        }); 
                        this.$router.push({path:"/ManagementEnd/bookReview/post"}) 
                    })
                }
            })
        }
    },
    computed: {
        ...mapGetters([
            'bookDetail'
        ])
    },
    created() {
        const { id } = this.$route.params
        this.$store.dispatch('book/getBookDetail', id)
    }
}
</script>

<style lang="scss">
    .post-book-review-by-id{
        .el-textarea.is-disabled .el-textarea__inner,.el-input.is-disabled .el-input__inner{
            color: #666;
        }
        padding-top: 20px;
        .title{
            text-align: left;
            margin: 0 auto;
            width: 80vw;
            min-width: 1040px;
            background-color: #dad7d7;
            border: 1px solid #eee;
            padding: 10px 20px;
        }
        .book-message{
            width: 80vw;
            min-width: 1040px;
            text-align: left;
            margin-top: 40px;
            margin-bottom: 20px;
            .btn{
                text-align: center;
                .pass{
                    margin-right: 20px;
                }
            }
        }
    }
</style>