<template>
    <div class="find-books-result-contain">
        <div class="find-books-result-contain-inner">
            <tab></tab>
            <div class="find-books-result-showBooks">
                <div class="nothing" v-if="findResult.length === 0">
                    <i class="iconfont icon-ganga"></i>
                    没有搜索到任何书籍！
                </div>
                <book v-else style="width: 16.6%" v-for="(book,index) in findResult" :key="index" :book_message="book"></book>
            </div>
            <pagination :pageSize="pageSize"></pagination>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import tab from '@/components/tab/tab'
// import commodityScreening from '@/components/classification/classification_commodityScreening'
import book from '@/components/home/home_book'
import pagination from '@/components/classification/classification_pagination'

export default {
    props: ['pageSize'],
    components: {
        tab,
        // commodityScreening,
        book,
        pagination
    },
    computed: {
        ...mapGetters([
            'findResult'
        ])
    }
}
</script>

<style lang='scss'>
    .find-books-result-contain{
        // height: 1000px;
        background-color: rgba(255,255,255,.8);
        .find-books-result-contain-inner{
            width: 90vw;
            min-width: 1170px;
            margin: 0 auto;
            .find-books-result-showBooks{
                border: 1px solid rgb(223, 220, 220);
                margin-top: 2vh;
                text-align: left;
                min-height: 536px;
                .nothing{
                    font-size: 34px;
                    color: #b8aeae;
                    text-align: center;
                    margin: 186px auto 0;
                    i{
                        font-size: 50px;
                    }
                }
            }
        }
    }
</style>