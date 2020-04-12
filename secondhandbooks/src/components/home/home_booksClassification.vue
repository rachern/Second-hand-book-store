// 图书分类（左部导航）
<template>
    <div class="home_booksClassification">
        <div class="classify" v-for="(booktype, index) in booktypes" :key="index">
            <div class="level_1" @click="changeIndex(index)">
                {{booktype.level_1}}
                <span><i class="iconfont icon-right"></i></span>
            </div>
            <div class="level_2">
                <div class="level_2_title" 
                     v-for="(lev_2, index) in booktype.level_2" 
                     :key="index"
                     :style="{transitionDelay:index*50+'ms'}"
                     @click="select(lev_2)">
                    {{lev_2.level_2}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed:{
        ...mapGetters([
            'booktypes'
        ])
    },
    methods:{
        select(lev_2){
            // console.log(lev_2)
            this.$router.push({ path: `/Classification/${lev_2._id}` })
        },
        changeIndex(index){
            // console.log(index)
            this.$emit('changeIndex',index)
        }
    }
}
</script>

<style lang="scss">
    .home_booksClassification{
        width: 18vw;
        background-color: rgba(255,255,255,.4);
        z-index: 10;
        .classify{
            font-weight: 600;
            height: 45px;
            line-height: 45px;
            &:last-child{
                .level_1{
                    border: none;
                }
            }
            &:hover{
                cursor: pointer;
                >.level_1{
                    transform: translateX(13.5vw);
                    color: rgb(201, 41, 41);
                    span{
                        transform: rotate(90deg);
                    }
                }
                >.level_2{
                    max-height: 2000;
                    .level_2_title{
                        transform: rotateY(0);
                    }
                }
            }
            .level_1{
                width: 13vw;
                margin: 0 auto;
                border-bottom: 1px solid #c3c3c3;
                padding-left: 8%;
                position: relative;
                transition: transform 1.2s;
                span{
                    position: absolute;
                    right: 10%;
                    transition: transform 1s 0.5s;
                }
            }
            .level_2{
                width: 13vw;
                text-align: center;
                max-height: 0;
                transform: translateX(14vw);
                .level_2_title{
                    background-color: #302f2f;
                    color: white;
                    margin-bottom: 1px;
                    transform: rotateY(90deg);
                    transition: transform 0.5s;
                    &:hover{
                        background-color: #424141;
                    }
                }
            }
        }
    }
</style>