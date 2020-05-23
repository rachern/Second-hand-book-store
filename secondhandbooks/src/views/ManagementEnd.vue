<template>
    <div class="management-end">
        <div class="left-nav">
            <div class="logo" @click="toHome">
                <p>二手书交易平台</p>
            </div>
            <el-menu
                :default-active="activeIndex"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                @select="handleSelect"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
                <el-menu-item index="/carouselMapManagement" v-if="roles.includes('superAdmin')">
                    <i class="el-icon-picture"></i>
                    <span slot="title">轮播图管理</span>
                </el-menu-item>
                <el-submenu index="/bookClassificationManagement"  v-if="roles.includes('superAdmin')">
                    <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span>书籍分类管理</span>
                    </template>
                    <el-menu-item index="/bookClassificationManagement/add">
                        <i class="el-icon-circle-plus-outline"></i>
                        <span slot="title">添加书籍分类</span>
                    </el-menu-item>
                    <el-menu-item index="/bookClassificationManagement/update">
                        <i class="el-icon-edit-outline"></i>
                        <span slot="title">修改书籍分类</span>
                    </el-menu-item>
                    <el-menu-item index="/bookClassificationManagement/delete">
                        <i class="el-icon-delete"></i>
                        <span slot="title">删除书籍分类</span>
                    </el-menu-item>
                </el-submenu>
                <el-submenu index="/bookReview">
                    <template slot="title">
                        <i class="el-icon-reading"></i>
                        <span>书籍审核</span>
                    </template>
                    <el-menu-item index="/bookReview/post">
                        <i class="iconfont icon-iconfontzhizuobiaozhunbduan31"></i>
                        <span slot="title">上架书籍审核</span>
                    </el-menu-item>
                    <!-- <el-menu-item index="/bookReview/auction">
                        <i class="iconfont icon-paimaichui"></i>
                        <span slot="title">拍卖书籍审核</span>
                    </el-menu-item> -->
                </el-submenu>
                <el-menu-item index="/userManagement" v-if="roles.includes('superAdmin')">
                    <i class="el-icon-user-solid"></i>
                    <span slot="title">用户管理</span>
                </el-menu-item>
                <el-menu-item index="/messagePush">
                    <i class="el-icon-chat-line-square"></i>
                    <span slot="title">消息推送</span>
                </el-menu-item>
                <el-menu-item index="/orderManagement" v-if="roles.includes('superAdmin')">
                    <i class="el-icon-s-order"></i>
                    <span slot="title">订单管理</span>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="right">
            <div class="head">
                <div class="menu_item user">
                    <div class="pointer user_name">
                        {{ $store.getters.username }}
                        <el-avatar :size="40" :src="$store.getters.avatar"></el-avatar>
                    </div>
                </div>
            </div>
            <div class="contain">
                <router-view></router-view>
            </div>
            <my-footer></my-footer>
        </div>
    </div>
</template>

<script>
import myFooter from '@/components/footer/footer'
export default {
    components: {
        myFooter
    },
    data(){
        return {
            activeIndex: '/carouselMapManagement'
        }
    },
    methods:{
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        handleSelect(key) {
            // console.log(key)
            if(this.$route.path.replace(/\/ManagementEnd/,'') !== key){
                this.$router.push({path: `/ManagementEnd${key}`})
            }
        },
        toHome() {
            this.$router.push({path: '/'})
        }
    },
    watch: {
        $route: {
            handler: function(route) {
                if(route.path.match(/^\/ManagementEnd\/postBookReview/)) {
                    this.activeIndex = '/bookReview/post'
                } else if(route.path.match(/^\/ManagementEnd\/auctionBookReview/)) {
                    this.activeIndex = '/bookReview/auction'
                } else {
                    this.activeIndex = route.path.replace(/\/ManagementEnd/,'')
                }
            },
            immediate: true
        }
    },
    computed: {
        roles() {
            return this.$store.getters.roles
        }
    }
}
</script>

<style lang="scss">
    .el-submenu__title,.el-menu-item{
        height: 66px;
        line-height: 66px;
        font-size: 18px;
        text-align: left;
    }
    .el-submenu .el-menu-item{
        font-size: 14px;
    }
    .el-submenu [class^=el-icon-],.el-menu-item [class^=el-icon-]{
        margin-right: 10px;
        font-size: 25px;
    }
    .el-avatar{
        display: inline-block;
        vertical-align: middle;
        margin-left: 10px;
    }
    .management-end{
        height: auto;
        display: flex;
        .iconfont{
            margin-right: 10px;
            font-size: 25px;
        }
        .left-nav{
            float: left;
            width: 220px;
            height: auto;
            background-color: rgb(84, 92, 100);
            .logo{
                height: 60px;
                font-size: 22px;
                font-weight: bold;
                color: #767474;
                line-height: 60px;
                background-color: #000;
                cursor: pointer;
            }
        }
        .right{
            flex: 1;
            // float: left;
            .head{
                height: 60px;
                background-color: #c9c9c9;
                .user{
                    text-align: right;
                    .user_name{
                        height: 60px;
                        line-height: 60px;
                        display: inline-block;
                        margin-right: 60px;
                        padding: 0 20px;
                    }
                }
            }
            .contain{
                min-height: 644px;
            }
        }
    }
    
</style>