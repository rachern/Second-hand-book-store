// 导航
<template>
    <div class="home_tab">
        <div class="tab_menu" v-for="menu in menus" :key="menu" @click="handleClick(menu)">
            {{menu}}
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            menus:['首页','征书墙','发布征书信息','发布书籍']
        }
    },
    methods: {
        handleClick(menu) {
            switch(menu) {
                case '首页':
                    this.$router.push({path: '/'})
                    break;
                case '征书墙':
                    this.$router.push({path: '/AskingWall'})
                    break;
                case '发布征书信息':
                    this.$router.push({path: '/AskingWall/postMessage'})
                    break;
                case '发布书籍':
                    this.$router.push({path: '/PublishBook'})
                    break;
                default:
                    break;
            }
        }
    }
}
</script>

<style lang="scss">
    .home_tab{
        height: 32px;
        background-color: #575555;
        opacity: .7;
        color: white;
        margin: 0 auto;
        text-align: left;
        .tab_menu{
            display: inline-block;
            width: 22.5vw;
            min-width: 292.5px;
            height: 100%;
            line-height: 2;
            text-align: center;
            border-right: 1px solid #c3c3c3;
            &:hover{
                cursor: pointer;
                background-color: #222121;
                font-weight: bold;
            }
        }
    }
</style>