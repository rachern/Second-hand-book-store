<template>
    <div class="personalCenter_interactiveMessage">
        <div class="user_list">
            <el-menu
                :default-active="activeIndex"
                class="el-menu-vertical-demo"
                @select="handleSelect">
                <el-menu-item index="systemMessage">
                    <el-avatar :size="30" :src="circleUrl"></el-avatar>
                    <span slot="title" class="name" title="小明">小明</span>
                </el-menu-item>
            </el-menu>
        </div>
        <div v-if="!hasChat" class="nothing">暂无互动消息</div>
        <div v-else class="chat_wrap">
            <div class="chat_title">
                <el-avatar :size="30" :src="circleUrl"></el-avatar>
                <span slot="title" class="name" title="小明">小明</span>
            </div>
            <div class="chat_contain"></div>
            <div class="chat_send"></div>
            <div class="button_send"><el-button type="primary" size="mini">发送</el-button></div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
            hasChat: false,
            activeIndex: ''
        }
    },
    methods: {
        handleSelect(key) {
            
        }
    }
}
</script>

<style lang="scss">
    .personalCenter_interactiveMessage{
        float: right;
        width: 52vw;
        min-width: 676px;
        margin-bottom: 20px;
        text-align: left;
        height: 500px;
        margin-top: 10px;
        background-color: #fff;
        .user_list{
            // display: inline-block;
            float: left;
            width: 25%;
            height: 100%;
            // background-color: pink;
            border-right: 1px solid #c2c2c2;
            overflow: auto;
            &::-webkit-scrollbar{
                width: 6px;
            }
            &::-webkit-scrollbar-thumb {
                background-color: rgba(128,128,128,.6);
                border-radius: 5px;
            }
            .el-avatar{
                margin-right: 10px;
            }
            .name{
                display: inline-block;
                width: 100px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
        .nothing{
            float: right;
            width: 75%;
            height: 100%;
            text-align: center;
            padding-top: 20px;
        }
        .chat_wrap{
            // display: inline-block;
            float: right;
            width: 75%;
            height: 100%;
            // padding: 10px;
            .chat_title{
                padding-bottom: 5px;
                border-bottom: 1px solid #b9b8b8;
                background-color: #b9b8b8;
                padding: 10px;
            }
            .el-avatar{
                margin-right: 10px;
            }
            .chat_contain{
                // background-color: black;
                height: 60%;
                // margin-top: 10px;
                // border: 1px solid #c2c2c2;
            }
            .chat_send{
                // background-color: black;
                height: 20%;
                // margin-top: 10px;
                margin: 0 10px;
                margin-bottom: 5px;
                border: 1px solid #c2c2c2;
            }
            .button_send{
                text-align: right;
                margin: 0 10px;
            }
        }
    }
</style>