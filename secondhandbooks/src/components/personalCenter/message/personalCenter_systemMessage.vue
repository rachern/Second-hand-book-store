<template>
    <div class="personalCenter_systemMessage">
        <div class="systemMessage_title"><h4>系统消息</h4></div>
        <div class="message_list">
            <div v-if="!hasSystemMessage" class="nothing">暂无系统消息</div>
            <el-collapse v-else v-model="activeName" accordion>
                <el-collapse-item
                    v-for="(message, i) in systemMessage.unread"
                    :key="i"
                    :title="message.title" :name="`unread${i}`">
                    <div>{{ message.content }}</div>
                </el-collapse-item>
                <el-collapse-item
                    v-for="(message, i) in systemMessage.read"
                    :key="i"
                    :title="message.title" :name="`read${i}`">
                    <div>{{ message.content }}</div>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            hasSystemMessage: true,
            activeName: ''
        }
    },
    computed: {
        systemMessage() {
            return {
                unread: this.$store.getters.messages.systemMessage.unread.reverse(),
                read: this.$store.getters.messages.systemMessage.read.reverse()
            }
        }
    },
    mounted() {
        this.$socket.emit('hasReadSystemMessage', this.$store.getters.username)
    }
}
</script>

<style lang="scss">
    .personalCenter_systemMessage{
        float: right;
        width: 52vw;
        min-width: 676px;
        padding-top: 10px;
        margin-bottom: 20px;
        text-align: left;
        background-color: #fff;
        .systemMessage_title{
            background-color: #f3f3f3;
            height: 40px;
            line-height: 40px;
            padding-left: 20px;
            margin: 0 10px 10px;
        }
        .message_list{
            border: 1px solid #f3f3f3;
            margin: 10px;
            padding: 0 10px;
            min-height: 330px;
            .nothing{
                text-align: center;
            }
            .el-collapse-item__header{
                position: relative;
            }
            .el-button--danger{
                position: absolute;
                right: 55px;
            }
        }
    }
</style>