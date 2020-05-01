<template>
    <div class="personalCenter_accountSettings clearfix">
        <div class="nav">
            <el-menu
                :default-active="activeIndex"
                class="el-menu-vertical-demo"
                @select="handleSelect">
                <el-menu-item index="changePassword">
                    <i class="el-icon-lock"></i>
                    <span slot="title">修改密码</span>
                </el-menu-item>
                <el-menu-item index="personalInformation">
                    <i class="el-icon-user"></i>
                    <span slot="title">个人信息</span>
                </el-menu-item>
                <el-menu-item index="address">
                    <i class="el-icon-location-outline"></i>
                    <span slot="title">收货地址</span>
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
            activeIndex: ''
        }
    },
    methods: {
        handleSelect(key) {
            this.$router.push({path: `/PersonalCenter/accountSettings/${key}`})
        }
    },
    watch: {
        $route: {
            handler: function(route) {
                // console.log(route.name)
                this.activeIndex = route.name
            },
            immediate: true
        }
    }
}
</script>

<style lang="scss">
    .personalCenter_accountSettings{
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
            .el-menu-item [class^=el-icon-]{
                font-size: 24px;
            }
        }
    }
</style>