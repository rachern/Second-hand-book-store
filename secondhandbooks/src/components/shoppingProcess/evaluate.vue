<template>
    <div class="evaluate">
        <div class="comment-inner">
            <div class="bookDetail" 
                v-for="(book, i) in orderDetail.booksList.linked_cartList"
                :key="i">
                <div class="left">
                    <div class="img" :title="book.title">
                        <img :src="book.url">
                    </div>
                    <div class="book-title" :title="book.title">
                        {{book.title}}
                    </div>
                </div>
                <div class="right">
                    <div class="score">
                        <span class="label">评分：</span>
                        <el-rate
                            v-model="comments[i].score"
                            show-score  
                            allow-half
                            text-color="#ff9900"
                            score-template="{value}">
                        </el-rate>
                    </div>
                    <div class="comment">
                        <span class="label">评论：</span>
                        <el-input
                            type="textarea"
                            :rows="6"
                            placeholder="请输入评论内容"
                            v-model="comments[i].content">
                        </el-input>
                    </div>
                </div>
            </div>
        </div>
        <div class="btns">
            <el-button type="warning" @click="cancel">取消</el-button>
            <el-button type="primary" @click="confirm">确定</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            orderDetail: {},
            comments: []
        }
    },
    methods: {
        cancel() {
            // 跳转到待评价订单页面
            this.$router.push({path: '/PersonalCenter/order/evaluation'})
        },
        confirm() {
            this.$store.dispatch('order/evaluate', {id:this.$route.params.id, comments:this.comments}).then(res => {
                this.$message.success('评价成功')
                // 跳转到所有订单页面
                this.$router.push({path: '/PersonalCenter/order/all'})
            })
        }
    },
    created() {
        const id = this.$route.params.id
        this.$store.dispatch('order/getOrderById', id).then(res => {
            this.orderDetail = res
            let comments = []
            res.booksList.cartList.forEach((e, i) => {
                comments.push({book:e.id,score:0,content:''})
            })
            this.comments = comments
        })
    }
}
</script>

<style lang="scss">
    .evaluate{
        margin: 0 auto;
        margin-top: 20px;
        width: 80vw;
        min-width: 1040px;
        // border: 1px solid black;
        min-height: 462px;
        padding: 0 20px;
        margin-top: 40px;
        .comment-inner{
            box-shadow: 0 0 3px 3px rgb(202, 199, 199);
            .bookDetail{
                display: flex;
                border-bottom: 1px solid rgb(206, 203, 203);
                .left{
                    // background-color: pink;
                    margin: 20px;
                    border-right: 1px solid rgb(190, 189, 189);
                    width: 300px;
                    height: 200px;
                    padding: 0 10px;
                    .img{
                        width: 140px;
                        height: 140px;
                        margin: 10px auto;
                        img{
                            width: 100%;
                        }
                    }
                    .book-title{
                        font-size: 14px;
                        font-weight: 700;
                    }
                }
                .right{
                    flex: 1;
                    padding: 40px 10px;
                    .label{
                        margin-right: 20px;
                    }
                    .score{
                        margin-bottom: 10px;
                    }
                    .el-rate, .el-textarea{
                        text-align: left;
                        width: 100%;
                        display: inline-block;
                        max-width: 572px;
                        vertical-align: top;
                    }
                }
            }
        }
        .btns{
            width: 300px;
            margin: 0 auto;
            margin-top: 40px;
            display: flex;
            justify-content: space-between;
        }
    }
</style>