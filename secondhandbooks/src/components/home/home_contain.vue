// home页面内容
<template>
    <div class="home_contain">
        <div class="home_contain_inner">
            <tab></tab>
            <div class="contain">
                <home-books-classification @changeIndex="changeIndex"></home-books-classification>
                <div class="right">
                    <home-carousel></home-carousel>
                    <home-show-books :index="index"></home-show-books>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import tab from '@/components/tab/tab.vue';
import homeBooksClassification from '@/components/home/home_booksClassification.vue';
import homeCarousel from '@/components/home/home_carousel.vue';
import homeShowBooks from '@/components/home/home_showBooks.vue';

export default {
    name:'home_contain',
    components:{
        tab,
        homeBooksClassification,
        homeCarousel,
        homeShowBooks
    },
    methods:{
        changeIndex(index){
            // console.log('contain',index)
            this.index = index
        }
    },
    data(){
        return {
            index: 0
        }
    }
    // data(){
    //     return {
    //         // carousels:[]
    //         carousels:[
    //             {name:"carsouel1",url:require('../../assets/img/carousel/carousel1.jpg')},
    //             {name:"carsouel1",url:require('../../assets/img/carousel/carousel2.jpg')},
    //             {name:"carsouel1",url:require('../../assets/img/carousel/carousel3.jpg')},
    //             {name:"carsouel1",url:require('../../assets/img/carousel/carousel4.jpg')},
    //             {name:"carsouel1",url:require('../../assets/img/carousel/carousel5.jpg')},
    //             {name:"carsouel1",url:require('../../assets/img/carousel/carousel6.jpg')},
    //             {name:"carsouel1",url:require('../../assets/img/carousel/carousel7.jpg')},
    //             {name:"carsouel1",url:require('../../assets/img/carousel/carousel8.jpg')}
    //         ]
    //     }
    // },
    // methods:{
    //     //获取首页轮播图
    //     _getAllCarousels(){
    //         console.log(this.$api.getAllCarousels)
    //         return this.$axios({
    //             method:'get',
    //             url:this.$api.getAllCarousels
    //         })
    //     }
    // },
    // mounted(){
    //     // this._getAllCarousels().then(res=>{
    //     //     console.log(res);
    //     //     this.carousels = res.data;
    //     // })
    // }
}
</script>

<style lang="scss">
    .home_contain{
        background-color: rgba(255,255,255,.8);
        .home_contain_inner{
            width: 90vw;
            margin: 0 auto;
            .contain{
                text-align: left;
                display: flex;
                .right{
                    display: inline-block;
                    width: 76vw;
                }
            }
        }
       
    }
</style>