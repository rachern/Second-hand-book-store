<template>
    <div class="personalCenter_message">
        <div class="nav">
            <el-menu
                :default-active="activeIndex"
                class="el-menu-vertical-demo"
                @select="handleSelect">
                <el-menu-item index="systemMessage">
                    <i class="iconfont icon-xitongxiaoxi"></i>
                    <span slot="title">系统消息</span>
                </el-menu-item>
                <el-menu-item index="interactiveMessage">
                    <i class="iconfont icon-hudong"></i>
                    <span slot="title">互动消息</span>
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
    }
</style>