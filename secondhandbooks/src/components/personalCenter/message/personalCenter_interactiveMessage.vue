<template>
    <div class="personalCenter_interactiveMessage">
        <div class="user_list">
            <el-menu
                :default-active="activeIndex"
                class="el-menu-vertical-demo"
                @select="handleSelect">
                <el-menu-item
                    v-for="value in userList"
                    :key="value"
                    :index="value">
                    <el-avatar :size="30" :src="JSON.parse(value).avatar"></el-avatar>
                    <span slot="title" class="name" :title="JSON.parse(value).username">
                        {{ JSON.parse(value).username }}
                        <span class="message-count" v-if="messages.unread[value].length > 0">
                            {{ messages.unread[value].length }}
                        </span>
                    </span>
                </el-menu-item>
            </el-menu>
        </div>
        <div v-if="!activeIndex" class="nothing">暂无互动消息</div>
        <div v-else class="chat_wrap">
            <div class="chat_title">
                <el-avatar :size="20" :src="JSON.parse(activeIndex).avatar"></el-avatar>
                <span slot="title" class="name" :title="JSON.parse(activeIndex).username">
                    {{ JSON.parse(activeIndex).username }}
                </span>
            </div>
            <div class="chat_contain clearfix" ref="chat_contain">
                <div v-for="(value, i) in messages.read[activeIndex]" :key="i" class="message-wrap">
                    <div v-if="value.from" class="other">
                        <el-avatar :size="20" :src="value.from.avatar"></el-avatar>
                        <div class="other-content">
                            {{ value.content }}
                        </div>
                    </div>
                    <div v-else class="clearfix">
                        <div class="mine clearfix">
                            <el-avatar :size="20" :src="$store.getters.avatar"></el-avatar>
                            <div class="mine-content">
                                {{ value.content }}
                            </div>
                        </div>
                    </div>
                </div>
                <div v-for="(value, i) in messages.unread[activeIndex]" :key="i" class="message-wrap">
                    <div v-if="value.from" class="other">
                        <el-avatar :size="20" :src="value.from.avatar"></el-avatar>
                        <div class="other-content">
                            {{ value.content }}
                        </div>
                    </div>
                    <div v-else class="clearfix">
                        <div class="mine clearfix">
                            <el-avatar :size="20" :src="$store.getters.avatar"></el-avatar>
                            <div class="mine-content">
                                {{ value.content }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="chat_send">
                <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入要发送的内容"
                    v-model="sendContent">
                </el-input>
            </div>
            <div class="button_send">
                <el-button type="primary" size="mini" @click="send">发送</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
            activeIndex: '',
            sendContent: '',
            userList: []
        }
    },
    methods: {
        handleSelect(key) {
            this.activeIndex = key
            this.$socket.emit('hasReadInteractiveMessage', {
                user: this.$store.getters.username,
                other: this.activeIndex
            })
            this.$nextTick(() => {
                this.scrollToBottom()
            })
            this.$store.dispatch('user/nowIndex', key)
        },
        send() {
            this.$socket.emit('send interactiveMessage', {
                to: JSON.parse(this.activeIndex),
                from: {username:this.$store.getters.username,
                        avatar:this.$store.getters.avatar},
                content: this.sendContent
            })
            // this.$socket.emit('send interactiveMessage', {
            //     to: {username:'jun',
            //             avatar:'http://localhost:3000/imgs/avatars/1588351740614.timg (4).jpg'},
            //     from: {username:'rachern',
            //             avatar:'http://localhost:3000/imgs/default_avatar.png'},
            //     content: 'nihao'
            // })
            this.sendContent = ''
        },
        scrollToBottom() {
            if(this.$refs.chat_contain) {
                this.$refs.chat_contain.scrollTop = this.$refs.chat_contain.scrollHeight
            }
        }
    },
    watch: {
        $route: {
            handler: function(route) {
                if(route.query.toUser) {
                    this.activeIndex = route.query.toUser
                    this.$store.dispatch('user/nowIndex', route.query.toUser)
                }
            },
            immediate: true
        },
        messages: {
            handler: function(value) {
                let userSet = new Set([
                    ...Object.keys(value.unread),
                    ...Object.keys(value.read)
                ])
                this.userList = [...userSet]
            },
            immediate: true
        }
    },
    computed: {
        messages() {
            let userSet = new Set([
                ...Object.keys(this.$store.getters.messages.interactiveMessage.unread),
                ...Object.keys(this.$store.getters.messages.interactiveMessage.read)
            ])
            this.userList = [...userSet]
            return this.$store.getters.messages.interactiveMessage
        }
    },
    mounted() {
        this.scrollToBottom()
    },
    beforeDestroy() {
        this.$store.dispatch('user/nowIndex', '')
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
            float: left;
            width: 25%;
            height: 100%;
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
                position: relative;
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
                text-align: center;
                position: absolute;
                right: 16px;
                top: 18px;
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
            float: right;
            width: 75%;
            height: 100%;
            .chat_title{
                padding-bottom: 5px;
                border-bottom: 1px solid #b9b8b8;
                background-color: #b9b8b8;
                padding: 10px;
                font-size: 12px;
            }
            .el-avatar{
                margin-right: 10px;
            }
            .chat_contain{
                &::-webkit-scrollbar{
                    width: 6px;
                }
                &::-webkit-scrollbar-thumb {
                    background-color: rgba(128,128,128,.6);
                    border-radius: 5px;
                }
                overflow: auto;
                height: 344px;
                margin: 10px;
                padding: 5px;
                color: #666;
                .message-wrap{
                    margin-bottom: 5px;
                }
                .other{
                    width: 50%;
                    .other-content{
                        background-color: #c8c5c5;
                        display: inline-block;
                        max-width: 85%;
                        vertical-align: top;
                        border-radius: 0 6px 6px 6px;
                        padding: 3px;
                    }
                }
                .mine{
                    float: right;
                    width: 50%;
                    .el-avatar{
                        float: right;
                    }
                    .mine-content{
                        background-color: #4ef64e;
                        float: right;
                        max-width: 85%;
                        padding: 3px;
                        border-radius: 6px 0 6px 6px;
                    }
                }
            }
            .chat_send{
                height: 55px;
                margin: 0 10px;
                margin-bottom: 5px;
            }
            .button_send{
                text-align: right;
                margin: 0 10px;
            }
        }
    }
</style>