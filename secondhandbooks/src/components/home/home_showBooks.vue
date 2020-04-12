// 书籍展示区域
<template>
    <div class="home_showBooks">
        <div class="level_1_tab_wrap">
            <div class="level_1_tab">
                <div ref="classify" class="pointer level_1_classify" 
                    :class="[index==nowIndex?'active':'']"
                    v-for="(booktype,index) in booktypes" 
                    :key="index"
                    @click="select(index)">
                    {{booktype.level_1}}
                </div>
            </div>
        </div>
        <div class="bookShow">
            <div class="bookShow_inner" v-for="(value,key) in homeBooks" :key="key">
                <div class="title">
                    <span class="titleName">{{key}}</span> / <span class="pointer" @click="more(value[0].classification)">更多</span>
                </div>
                <book v-for="(book_message,index) in value" :key="index" :book_message="book_message"></book>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import book from '@/components/home/home_book.vue'

export default {
    props: ['index'],
    components:{
        book
    },
    watch:{
        index(data) {
            this.nowIndex = data
        },
        nowIndex(data) {
            this.$store.dispatch('book/getHomeBooks',this.booktypes[data].level_2)
        }
    },
    computed:{
        ...mapGetters([
            'booktypes',
            'homeBooks'
        ])
    },
    data(){
        return {
            nowIndex: 0
        }
    },
    methods:{
        select(index){
            this.nowIndex = index;
        },
        more(id) {
            this.$router.push({ path: `/Classification/${id}` })
        }
    }
}
</script>

<style lang="scss">
    .home_showBooks{
        width: 100%;
        color: #c3c3c3;
        .level_1_tab_wrap{
            width: 100%;
            height: 39px;
            background-color: #313030;
            opacity: 0.8;
            .level_1_tab{
                width: 100%;
                white-space: nowrap;
                overflow-x: auto;
                overflow-y: hidden;
                &::-webkit-scrollbar{
                    height: 4px;
                }
                &::-webkit-scrollbar-thumb {
                    background-color: rgba(128,128,128,.6);
                    border-radius: 5px;
                }
                .level_1_classify{
                    display: inline-block;
                    padding: 0 10px;
                    line-height: 32px;
                    &.active{
                        font-size: 22px;
                        color: #fff;
                    }
                }
            }
        }
        
        .bookShow{
            padding: 20px;
            .bookShow_inner{
                .title{
                    color: black;
                    .titleName{
                        font-size: 20px;
                        font-weight: bold;
                    }
                }
            }
        }
    }
</style>