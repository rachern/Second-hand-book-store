<template>
    <div class="post-book-review-list">
        <div class="title" id="add-classification-title"><h4>待审核上架的书籍列表</h4></div>
        <div class="msg">
            <el-collapse v-model="activeName" accordion>
                <el-collapse-item v-for="(askingBook,index) in askingBooks" :key="index"
                    :title="askingBook.title" 
                    :name="index">
                    <ul class="parameter-list">
                        <li :title="askingBook.press">出版社：{{askingBook.press}}</li>
                        <li :title="askingBook.publishingTime">出版时间：{{askingBook.publishingTime}}</li>
                        <li :title="askingBook.author">作者：{{askingBook.author}}</li>
                        <li :title="askingBook.askingPerson.username">
                            发布人：{{askingBook.askingPerson.username}}
                            <el-button type="danger" icon="el-icon-chat-dot-round" size="mini">联系买家</el-button>
                        </li>
                        <div class="pic-wrap">
                            图片：
                            <div class="pic" v-for="(pic,index) in askingBook.pictures" :key="index">
                                <img :src="pic.url"/>
                            </div>
                        </div>
                        <div class="createdTime" :title="askingBook.createdTime">
                            发布时间：{{askingBook.createdTime}}
                        </div>
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
    components:{
        pagination
    },
    computed: {
        ...mapGetters([
            'askingBooks'
        ])
    },
    created() {
        this.$store.dispatch('askingBook/getAskingBooks',{ limit: this.pageSize })
    },
    data(){
        return {
            activeName: '',
            pageSize: 15
        }
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