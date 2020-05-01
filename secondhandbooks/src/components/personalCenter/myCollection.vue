<template>
    <div class="my-collection">
        <div class="title" id="my-publish-books-title"><h4>我收藏的书籍</h4></div>
        <div class="my-collection-book pointer" 
             v-for="(books, index) in myCollectionBooks" 
             :key="index"
             @click="bookDetail(books._id)">
            <div class="img"><img :src="books.url" :title="books.title" :alt="books.title"></div>
            <p class="bookName" :title="books.title">{{books.title}}</p>
            <p class="bookPrice" v-if="books.number !== 0">￥{{books.presentPrice.toFixed(2)}}</p>
            <p class="sorry" v-else><i class="iconfont icon-ganga"></i>宝贝失效了</p>
        </div>
        <pagination :pageSize="pageSize"></pagination>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import pagination from '@/components/classification/classification_pagination'

export default {
    components: {
        pagination
    },
    data() {
        return {
            pageSize: 10
        }
    },
    methods: {
        bookDetail(id) {
            this.$router.push({ path: `/CommodityDetail/${id}` })
        }
    },
    computed: {
        ...mapGetters([
            'myCollectionBooks'
        ])
    },
    created() {
        this.$store.dispatch('user/getMyCollections', {limit: this.pageSize})
    }
}
</script>

<style lang="scss">
    .my-collection{
        width: 80vw;
        min-width: 1040px;
        margin: 20px auto;
        background-color: #fff;
        min-height: 510px;
        padding: 20px;
        text-align: left;
        .title{
            background-color: #f7f7f7;
            border: 1px solid #eee;
            padding: 10px 20px;
            margin-bottom: 20px;
        }
        .my-collection-book{
            height: 265px;
            display: inline-block;
            overflow: hidden;
            width: 20%;
            padding-top: 10px;
            text-align: center;
            &:hover{
                border: 1px solid rgb(187, 180, 180);
                border-radius: 10px;
            }
            .img{
                text-align: center;
                img{
                    height: 160px;
                    max-width: 160px;
                    max-height: 160px;
                }
            }
            .bookName{
                color: black;
                padding-top: 5px;
                width: 80%;
                margin: 0 auto;
                font-size: 13px;
                height: 32px;
                line-height: 14px;
                overflow: hidden;
                font-weight: bold;
            }
            .bookPrice{
                width: 80%;
                margin: 0 auto;
                font-size: 15px;
                font-weight: bold;
                color: #DA0000;
            }
            .sorry{
                font-size: 14px;
                i{
                    color: #666;
                    padding-right: 5px;
                }
            }
        }
    }
</style>