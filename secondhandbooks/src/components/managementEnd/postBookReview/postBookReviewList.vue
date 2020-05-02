<template>
    <div class="post-book-review-list">
        <div class="title" id="add-classification-title"><h4>待审核上架的书籍列表</h4></div>
        <div class="msg">
            <el-collapse v-model="activeName" accordion>
                <el-collapse-item v-for="(book,index) in myPublishBooks" :key="index"
                    :title="book.title" 
                    :name="index">
                    <ul class="parameter-list" @click="bookReview(book._id)">
                        <li :title="book.press">出版社：{{book.publisher}}</li>
                        <li :title="book.publishingTime">出版时间：{{book.publishingTime}}</li>
                        <li :title="book.author">作者：{{book.author}}</li>
                        <li :title="book.state === 0 ? '待审核' : (book.state === 1 ? '已发布' : '已驳回')">
                            发布状态：{{book.state === 0 ? '待审核' : (book.state === 1 ? '已发布' : '已驳回')}}
                        </li>
                        <li :title="book.ISBN">ISBN：{{book.ISBN}}</li>
                        <li :title="book.edition">版次：{{book.edition}}</li>
                        <li :title="book.code">商品编码：{{book.code}}</li>
                        <li :title="book.pack">包装：{{book.pack}}</li>
                        <li :title="book.size">开本：{{book.size}}</li>
                        <li :title="book.paper">用纸：{{book.paper}}</li>
                    </ul>
                </el-collapse-item>
            </el-collapse>
            <pagination :pageSize="pageSize"></pagination>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import pagination from '@/components/classification/classification_pagination'

export default {
    components: {
        pagination
    },
    data() {
        return {
            pageSize: 15,
            activeName: ''
        }
    },
    methods: {
        bookReview(id) {
            this.$router.push({path: `/ManagementEnd/postBookReview/${id}`})
        }
    },
    computed: {
        ...mapGetters([
            "myPublishBooks"
        ])
    },
    created() {
        this.$store.dispatch('book/getMyPublishBooks', {limit: this.pageSize})
    }
}
</script>

<style lang="scss">
    .post-book-review-list{
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
        .msg{
            margin: 20px auto;
            // margin-top: 10px;
            width: 70vw;
            min-width: 910px;
            border: 1px solid #e8e2e2;
            padding: 0 20px;
            font-size: 20px;
            .parameter-list{
                padding: 20px 0 15px;
                overflow: hidden;
                cursor: pointer;
                li{
                    text-align: left;
                    line-height: 22px;
                    width: 16.8vw;
                    padding-left: 2.5vw;
                    float: left;
                    margin-bottom: 5px;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                }
                .pic-wrap{
                    // height: 12px;
                    padding-left: 2.5vw;
                    .pic{
                        display: inline-block;
                        width: 150px;
                        height: 150px;
                        border: 1px solid rgb(196, 195, 195);
                        vertical-align: top;
                        margin-right: 5px;
                        text-align: center;
                        img{
                            // width: 100%;
                            width: 100%;
                            height: 100%;
                            object-fit: contain;
                        }
                    }
                }
                .createdTime{
                    padding-left: 2.5vw;
                    margin-top: 5px;
                }
            }
        }
    }
</style>