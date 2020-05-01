<template>
    <div class="my-publish">
        <div class="title" id="my-publish-books-title"><h4>我发布的书籍</h4></div>
        <div class="msg">
            <el-collapse v-model="activeName" accordion>
                <el-collapse-item v-for="(book,index) in myPublishBooks" :key="index"
                    :title="book.title" 
                    :name="index">
                    <ul class="parameter-list">
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
                        <li :title="book.rejectReason" v-if="book.rejectReason">驳回原因：{{book.rejectReason}}</li>
                    </ul>
                    <div class="pic-wrap">
                        <div>
                            书籍封面：
                            <div class="pic">
                                <img :src="book.url"/>
                            </div>
                        </div>
                    </div>
                </el-collapse-item>
            </el-collapse>
        </div>
        <pagination :pageSize="pageSize"></pagination>
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
    .el-collapse-item__content{
        padding-bottom: 0;
    }
    .my-publish {
        width: 90vw;
        min-width: 1170px;
        text-align: left;
        border: 1px solid #eee;
        padding: 20px;
        background-color: #fff;
        margin: 20px auto;
        .title{
            background-color: #f7f7f7;
            border: 1px solid #eee;
            padding: 10px 20px;
        }
        .msg{
            padding: 0 20px;
            font-size: 20px;
            margin: 30px 30px 0;
            .parameter-list{
                padding: 20px 0 15px;
                overflow: hidden;
                li{
                    text-align: left;
                    line-height: 22px;
                    width: 20vw;
                    min-width: 260px;
                    padding-left: 2.5vw;
                    float: left;
                    margin-bottom: 5px;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                }
            }
            .pic-wrap{
                // height: 12px;
                // padding: 0 20px;
                // padding-left: 2.5vw;
                padding-bottom: 20px;
                &>div{
                    padding-left: 2.5vw;
                }
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
        }
    }
</style>