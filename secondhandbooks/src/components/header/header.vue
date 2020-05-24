<template>
    <div class="header">
        <div class="header_contain">
            <div class="menu clearfix">
                <div class="pointer menu_item message" @click="toView('/PersonalCenter/message/systemMessage')">
                    消息
                    <span class="message-count" v-if="unreadMessage > 0">
                        {{unreadMessage}}
                    </span>
                </div>
                <div class="pointer menu_item personal_center" @click="toView('/PersonalCenter')">
                    个人中心
                </div>
                <div class="pointer menu_item order" @click="toView('/PersonalCenter/order/all')">
                    我的订单
                </div>
                <div class="pointer menu_item cart" @click="toView('/ShoppingCart')">
                    购物车
                </div>
                <div class="pointer menu_item user" v-if="showUser">
                    <div class="user_name">
                        <el-dropdown @command="handleCommand">
                            <span class="el-dropdown-link">
                                {{ username }}
                                <el-avatar :size="40" :src="avatar"></el-avatar>
                                <i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="/PersonalCenter/myPublish">我的发布</el-dropdown-item>
                                <el-dropdown-item command="/PersonalCenter/myCollection">我的收藏</el-dropdown-item>
                                <el-dropdown-item command="/PersonalCenter/myAuction">我的竞拍</el-dropdown-item>
                                <el-dropdown-item command="/PersonalCenter/myAskingBook">我的征书</el-dropdown-item>
                                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>
                <div class="login_register menu_item" v-else>
                    <span class="pointer" @click="login">登录</span>/
                    <span class="pointer" @click="register">注册</span>
                </div>
            </div>
            <div class="search">
                <input type="search" v-model="searchText" @keyup.enter="search">
                <span @click="search"><i class="iconfont icon-search"></i></span>
            </div>
            <div class="webHome" @click="toView('/')">网站首页</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showUser: false,
            unreadMessage: 0,
            searchText: ''
        }
    },
    mounted() {
        this.showUser = (this.username && this.avatar) ? true : false
    },
    watch: {
        messages: {
            handler: function(newValue) {
                console.log(newValue)
                let unreadMessage = 0
                unreadMessage += newValue.systemMessage.unread.length
                for(let key in newValue.interactiveMessage.unread) {
                    unreadMessage += newValue.interactiveMessage.unread[key].length
                }
                this.unreadMessage = unreadMessage
            }
        }
    },
    computed: {
        username() {
            return this.$store.getters.username
        },
        avatar() {
            return this.$store.getters.avatar
        },
        messages() {
            return this.$store.getters.messages
        }
    },
    methods: {
        login(){
            this.$router.push({name:'LoginRegister',params:{select:'login'}})
        },
        register(){
            this.$router.push({name:'LoginRegister',params:{select:'register'}})
        },
        handleCommand(command) {
            // this.$message('click on item ' + command);
            if(command === "logout") {
                this.$store.dispatch('user/logout').then(() => {
                    if(this.$route.path !== '/') {
                        this.$router.push({ path: '/' })
                    } else {
                        this.showUser = false
                    }
                })
            } else {
                this.toView(command)
            }
        },
        toView(path) {
            this.$router.push({ path: path })
        },
        search() {
            this.$router.push({ path: `/FindBooksResult/${this.searchText}` })
        }
    }
}
</script>

<style lang="scss">
    .el-avatar{
        display: inline-block;
        vertical-align: middle;
        margin-left: 10px;
    }
    .el-dropdown{
        font-size: 16px;
    }
    .header{
        width: 100%;
        height: 100px;
        background-color: rgba(255,255,255,.4);
        .header_contain{
            width: 95vw;
            min-width: 1235px;
            padding-top: 15px;
            margin: 0 auto;
            .menu{
                // position: absolute;
                // right: 20px;
                // height: 30px;
                float: right;
                width: 413px;
                .menu_item{
                    float: right;
                    margin-right: 15px;
                    line-height: 35px;
                }
                .message{
                    position: relative;
                    .message-count{
                        display: inline-block;
                        padding: 3px;
                        min-width: 16px;
                        min-height: 16px;
                        background-color: rgba(237,31,31,0.9);
                        border-radius: 50%;
                        position: absolute;
                        top: -4px;
                        right: -16px;
                        line-height: 1;
                        font-size: 12px;
                        color: white;
                    }
                }
            }
            .search{
                width: 800px;
                float: right;
                input{
                    width: 500px;
                    height: 35px;
                    border: none;
                    border-top-left-radius: 3px;
                    border-bottom-left-radius: 3px;
                    background-color: #777676;
                    color: white;
                    padding: 0 20px;
                }
                span{
                    display: inline-block;
                    vertical-align: middle;
                    height: 35px;
                    width: 45px;
                    background-color: #4e4e4e;
                    border-top-right-radius: 3px;
                    border-bottom-right-radius: 3px;
                    i{
                        line-height: 35px;
                        color: white;
                    }
                    &:hover{
                        opacity: .9;
                    }
                }
            }
            .webHome{
                float: right;
                line-height: 50px;
                font-size: 50px;
                font-weight: bold;
                color: rgba(0,0,0,.3);
                background: linear-gradient(140deg,rgba(0,0,0,0) 10px,rgba(0,0,0,1) 20px,rgba(0,0,0,0) 54px,
                                            rgba(0,0,0,1) 80px,rgba(0,0,0,0) 120px,rgba(0,0,0,1) 150px);
                -webkit-background-clip: text;
                background-clip: text;
                background-repeat: no-repeat;
                cursor: pointer;
            }
        }
    }
</style>