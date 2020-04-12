<template>
    <div class="menubar-wrap">
        <el-menu :default-active="activeIndex" 
                 class="el-menu-demo" 
                 mode="horizontal" 
                 @select="handleSelect">
            <el-menu-item index="">首页</el-menu-item>
            <el-submenu index="/accountSettings">
                <template slot="title">账户设置</template>
                <el-menu-item index="/accountSettings/changePassword">修改密码</el-menu-item>
                <el-menu-item index="/accountSettings/personalInformation">个人信息</el-menu-item>
                <el-menu-item index="/accountSettings/address">收货地址</el-menu-item>
            </el-submenu>
            <el-submenu index="/message">
                <template slot="title">消息</template>
                <el-menu-item index="/message/systemMessage">系统消息</el-menu-item>
                <el-menu-item index="/message/interactiveMessage">互动消息</el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeIndex: ''
        }
    },
    methods: {
        handleSelect(key) {
            // console.log(key)
            if(this.$route.path.replace(/\/PersonalCenter/,'') !== key){
                this.$router.push({path: `/PersonalCenter${key}`})
            }
        }
    },
    watch: {
        $route: {
            handler: function(route) {
                // console.log(route)
                this.activeIndex = route.path.replace(/\/PersonalCenter/,'')
            },
            immediate: true
        }
    }
}
</script>

<style lang="scss">
    .menubar-wrap{
        background-color: #fff;
        .el-menu.el-menu--horizontal{
            display: inline-block;
            border-bottom: none;
            .el-menu-item{
                margin: 0 30px;
                font-size: 18px;
            }
        }
        .el-submenu__title{
            margin: 0 30px;
            font-size: 18px;
            i{
                font-size: 16px;
            }
        }
    }
    .el-menu--horizontal .el-menu .el-menu-item{
        background-color: #545c64;
        color: #fff;
        &:not(.is-disabled):hover,
        &:not(.is-disabled):focus,
        &:not(.is-disabled).is-active{
            color: #ffd04b;
        }
    }
</style>