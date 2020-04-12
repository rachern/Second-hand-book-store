// 轮播图
<template>
    <div class="home_carousel" :style="{height:bannerHeight+'px'}">
        <el-carousel :height="bannerHeight+'px'">
            <el-carousel-item v-for="item in carousels" :key="item.url">
                <img ref="bannerHeight" :src="item.url" @load="imgLoad">
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    // props:['carousels'],
    data(){
        return {
            bannerHeight:0
        }
    },
    methods:{
        imgLoad(){
            this.$nextTick(()=>{
                this.bannerHeight = this.$refs.bannerHeight[0].height;
            })
        }
    },
    computed:{
        ...mapGetters([
            'carousels'
        ])
    },
    mounted(){
        this.imgLoad();
        window.addEventListener('resize', ()=>{
            this.bannerHeight = this.$refs.bannerHeight[0].height;
            this.imgLoad();
        },false)
    }
}
</script>

<style lang="scss"> 
    .home_carousel{
        margin: 10px 20px;
        img{
            width: 100%;
        }
    }
</style>