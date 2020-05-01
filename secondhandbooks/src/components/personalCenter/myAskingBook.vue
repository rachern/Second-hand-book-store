<template>
    <div class="my-asking-book">
        <div class="title" id="my-asking-message-title"><h4>我的书籍求购信息</h4></div>
        <div class="msg">
            <el-collapse v-model="activeName" accordion>
                <el-collapse-item v-for="(askingBook,index) in myAskingBooks" :key="index"
                    :title="askingBook.title" 
                    :name="index">
                    <ul class="parameter-list">
                        <li :title="askingBook.press">出版社：{{askingBook.press}}</li>
                        <li :title="askingBook.publishingTime">出版时间：{{askingBook.publishingTime}}</li>
                        <li :title="askingBook.author">作者：{{askingBook.author}}</li>
                        <li :title="askingBook.state === 0 ? '已发布' : (askingBook.state === 1 ? '已完成' : '已取消')">
                            发布状态：{{askingBook.state === 0 ? '已发布' : (askingBook.state === 1 ? '已完成' : '已取消')}}
                        </li>
                        <div class="pic-wrap">
                            图片：
                            <div class="pic" v-for="(pic,index) in askingBook.pictures" :key="index">
                                <img :src="pic.url"/>
                            </div>
                        </div>
                        <div class="createdTime" :title="askingBook.createdTime">
                            发布时间：{{askingBook.createdTime}}
                            <span class="operate" v-if="askingBook.state === 0">
                                操作：
                                <el-button type="success" size="mini">完成</el-button>
                                <el-button type="danger" size="mini">取消</el-button>
                            </span>
                        </div>
                    </ul>
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
            'myAskingBooks'
        ])
    },
    created() {
        this.$store.dispatch('askingBook/getMyAskingBooks', {limit: this.pageSize})
    }
}
</script>

<style lang="scss">
    .el-collapse-item__content{
        padding-bottom: 0;
    }
    .my-asking-book {
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
                    .operate{
                        margin-left: 173px;
                    }
                }
            }
        }
    }
</style>