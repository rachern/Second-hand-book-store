<template>
    <div class="personalCenter_message clearfix">
        <div class="nav">
            <el-menu
                :default-active="activeIndex"
                class="el-menu-vertical-demo"
                @select="handleSelect">
                <el-menu-item index="systemMessage">
                    <i class="iconfont icon-xitongxiaoxi"></i>
                    <span slot="title">
                        系统消息
                        <span class="message-count" v-if="messages.systemMessage.unread.length > 0">
                            {{ messages.systemMessage.unread.length }}
                        </span>
                    </span>
                </el-menu-item>
                <el-menu-item index="interactiveMessage">
                    <i class="iconfont icon-hudong"></i>
                    <span slot="title">
                        互动消息
                        <span class="message-count" v-if="unreadMessage > 0">
                            {{ unreadMessage }}
                        </span>
                    </span>
                </el-menu-item>
            </el-menu>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeIndex: '',
            unreadMessage: 0
        }
    },
    methods: {
        handleSelect(key) {
            this.$router.push({path:`/PersonalCenter/message/${key}`})
        }
    },
    watch: {
        $route: {
            handler: function(route) {
                // console.log(route.name)
                this.activeIndex = route.name
            },
            immediate: true
        },
        messages: {
            handler: function(newValue) {
                let unreadMessage = 0
                for(let key in newValue.interactiveMessage.unread) {
                    unreadMessage += newValue.interactiveMessage.unread[key].length
                }
                this.unreadMessage = unreadMessage
            },
            immediate: true
        }
    },
    computed: {
        messages() {
            return this.$store.getters.messages
        }
    }
}
</script>

<style lang="scss">
    .personalCenter_message{
        width: 70vw;
        min-width: 910px;
        margin: 0 auto;
        .nav{
            float: left;
            width: 15vw;
            min-width: 195px;
            height: 400px;
            background-color: #fff;
            .el-menu-item{
                font-size: 16px;
                &.is-active{
                    background-color: #f4f4f5;
                }
            }
            i{
                font-size: 24px;
                padding-right: 10px;
            }
        }
        .message-count{
            display: inline-block;
            border-radius: 50%;
            font-size: 12px;
            line-height: 18px;
            min-height: 18px;
            min-width: 18px;
            background-color: rgba(237,31,31,0.9);
            color: white;
        }
    }
</style>