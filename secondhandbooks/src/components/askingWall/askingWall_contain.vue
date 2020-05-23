<template>
    <div class="asking-wall-contain">
        <div class="asking-wall-contain-inner">
            <tab></tab>
            <div class="content">
                <div class="post-asking-message">
                    <el-button type="info" @click="postMessage">发布征书信息</el-button>
                </div>
                <router-view></router-view>
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
    methods: {
        postMessage() {
            this.$router.push({path: '/AskingWall/postMessage'})
        }
    }
}
</script>

<style lang="scss">
    .el-collapse-item__header{
        font-size: 16px;
    }
    .asking-wall-contain{
        // height: 1000px;
        min-height: 604px;
        background-color: rgba(255,255,255,.8);
        .asking-wall-contain-inner{
            padding-bottom: 30px;
            width: 90vw;
            margin: 0 auto;
            // border: 1px solid black;
            .content{
                margin: 30px 30px 0;
                // height: 500px;
                // border: 1px solid red;
                .post-asking-message{
                    text-align: left;
                }
            }
        }
    }
</style>