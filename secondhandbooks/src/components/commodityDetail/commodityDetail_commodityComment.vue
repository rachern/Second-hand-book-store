<template>
    <div class="commodity-comment">
        <div class="title" id="title"><h4>商品评价</h4></div>
        <div class="comment-list">
            <div class="comment-item clearfix" v-for="(comment, index) in comments" :key="index">
                <div class="user-info">
                    <el-avatar :src="comment.reviewer.url" :size="40"></el-avatar>
                    <span>{{comment.reviewer.username}}</span>
                </div>
                <div class="comment-column">
                    <el-rate
                        v-model="comment.score"
                        disabled
                        show-score
                        text-color="#ff9900"
                        score-template="{value}">
                    </el-rate>
                    <p class="comment-con">{{comment.content}}</p>
                    <p class="comment-date">{{comment.createdTime}}</p>
                </div>
            </div>
        </div>
        <pagination :pageSize="pageSize"></pagination>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import pagination from '@/components/classification/classification_pagination'

export default {
    props: ['pageSize'],
    components: {
        pagination
    },
    computed: {
        ...mapGetters([
            'comments'
        ])
    }
}
</script>

<style lang="scss">
    .commodity-comment{
        text-align: left;
        .title{
            background-color: #f7f7f7;
            border: 1px solid #eee;
            padding: 10px 20px;
        }
        .comment-list{
            .comment-item{
                padding: 15px;
                border-bottom: 1px solid rgb(221, 221, 221);
                .user-info{
                    width: 200px;
                    float: left;
                    span{
                        display: inline-block;
                        vertical-align: middle;
                        margin-left: 20px;
                    }
                }
                .comment-column{
                    margin-left: 200px;
                    .comment-con{
                        font-size: 14px;
                        line-height: 180%;
                        color: rgb(51, 51, 51);
                        padding: 10px 0;
                        white-space: pre-line;
                    }
                    .comment-date{
                        font-size: 12px;
                        color: rgb(153, 153, 153);
                    }
                }
            }
        }
    }
</style>