<template>
    <div class="pagination">
        <el-pagination
            background
            :hide-on-single-page="true"
            :page-size="pageSize"
            layout="prev, pager, next, jumper"
            :total="total || count"
            :current-page = "currentPage"
            prev-text="< 上一页"
            next-text="下一页 >"
            @current-change="handleChangePage">
        </el-pagination>
    </div>
</template>

<script>
import { getAskingBookCount, getMyAskingBooksCount } from '@/api/askingBook'
import { getCommentCount } from '@/api/comment'
import { getClassificationBooksCount, getMyPublishBooksCount, getPostBookReviewCount, getfindBooksResultCount } from '@/api/book'
import { getMyCollectionBooksCount } from '@/api/user'
import { getMyOrderCountByType } from '@/api/order'

export default {
    props: ['pageSize','total'],
    data() {
        return {
            count: 0,
            currentPage: 1
        }
    },
    watch: {
        $route: {
            handler: function(route) {
                // console.log(route.meta.name)
                this.currentPage = 1
                const {query} = route.params
                const {name} = route.meta
                if(name === 'CommodityDetail') {
                    const {id} = route.params
                    getCommentCount(id).then(res => {
                        const { data } = res.data
                        this.count = data
                    })
                } else if(name === 'AskingWall') {
                    getAskingBookCount().then(res => {
                        const { data } = res.data
                        this.count = data
                    })
                } else if(name === 'Classification') {
                    const {id} = route.params
                    getClassificationBooksCount(id).then(res => {
                        const { data } = res.data
                        this.count = data
                    })
                } else if(name === 'myAskingBook') {
                    getMyAskingBooksCount().then(res => {
                        const { data } = res.data
                        this.count = data
                    })
                } else if(name === 'myPublish') {
                    getMyPublishBooksCount().then(res => {
                        const { data } = res.data
                        this.count = data
                    })
                } else if(name === 'myCollection') {
                    getMyCollectionBooksCount().then(res => {
                        const { data } = res.data
                        this.count = data
                    })
                } else if(name === 'postBookReview') {
                    getPostBookReviewCount().then(res => {
                        const { data } = res.data
                        this.count = data
                    })
                } else if(name === 'FindBooksResult') {
                    getfindBooksResultCount(query).then(res => {
                        const { data } = res.data
                        this.count = data
                    })
                } else if(name === 'order') {
                    const type = this.$route.params.type
                    switch(type) {
                        case 'all':
                            getMyOrderCountByType().then(res => {
                                const { data } =res.data
                                this.count = data
                            })
                            break;
                        case 'pay':
                            getMyOrderCountByType(0).then(res => {
                                const { data } =res.data
                                this.count = data
                            })
                            break;
                        case 'receive':
                            getMyOrderCountByType(1).then(res => {
                                const { data } =res.data
                                this.count = data
                            })
                            break;
                        case 'evaluation':
                            getMyOrderCountByType(2).then(res => {
                                const { data } =res.data
                                this.count = data
                            })
                            break;
                        case 'after_sales':
                            getMyOrderCountByType(3).then(res => {
                                const { data } =res.data
                                this.count = data
                            })
                            break;
                        default:
                            break;
                    }
                }
            },
            immediate: true
        }
    },
    methods: {
        handleChangePage(val) {
            // console.log(val)
            this.currentPage = val
            const { id, query } = this.$route.params
            const { name } = this.$route.meta
            if(name === 'CommodityDetail') {
                this.$store.dispatch('comment/getComments',{ id, limit: this.pageSize, skip: (val-1)*this.pageSize })
                document.querySelector('#title').scrollIntoView()
            } else if(name === 'AskingWall') {
                this.$store.dispatch('askingBook/getAskingBooks', { limit: this.pageSize, skip: (val-1)*this.pageSize })
                document.querySelector('#asking-message-title').scrollIntoView()
            } else if(name === 'myAskingBook') {
                this.$store.dispatch('askingBook/getMyAskingBooks', { limit: this.pageSize, skip: (val-1)*this.pageSize })
                document.querySelector('#my-asking-message-title').scrollIntoView()
            } else if(name === 'myPublish') {
                this.$store.dispatch('book/getMyPublishBooks', { limit: this.pageSize, skip: (val-1)*this.pageSize })
                document.querySelector('#my-publish-books-title').scrollIntoView()
            } else if(name === 'myCollection') {
                this.$store.dispatch('user/getMyCollections', { limit: this.pageSize, skip: (val-1)*this.pageSize })
                document.querySelector('#my-collection-books-title').scrollIntoView()
            } else if(name === 'postBookReview') {
                this.$store.dispatch('book/getPostBookReviewList', {limit: this.pageSize, skip: (val-1)*this.pageSize })
                document.querySelector('#post-book-review-list-title').scrollIntoView()
            } else if(name === 'FindBooksResult') {
                this.$store.dispatch('book/findBooks', { query, limit: this.pageSize, skip: (val-1)*this.pageSize })
            } else if(name === 'order') {
                const type = this.$route.params.type
                switch(type) {
                    case 'all':
                        this.$store.dispatch('order/getMyOrders', {limit: this.pageSize, skip: (val-1)*this.pageSize})
                        break;
                    case 'pay':
                        this.$store.dispatch('order/getMyOrdersByType', {type: 0, limit: this.pageSize, skip: (val-1)*this.pageSize})
                        break;
                    case 'receive':
                        this.$store.dispatch('order/getMyOrdersByType', {type: 1, limit: this.pageSize, skip: (val-1)*this.pageSize})
                        break;
                    case 'evaluation':
                        this.$store.dispatch('order/getMyOrdersByType', {type: 2, limit: this.pageSize, skip: (val-1)*this.pageSize})
                        break;
                    case 'after_sales':
                        this.$store.dispatch('order/getMyOrdersByType', {type: 3, limit: this.pageSize, skip: (val-1)*this.pageSize})
                        break;
                    default:
                        break;
                }
            }
            else {
                this.$store.dispatch('book/getClassificationBooks', { id, limit: this.pageSize, skip: (val-1)*this.pageSize })
            }
        }
    }
}
</script>

<style lang="scss">
    .pagination{
        text-align: right;
        margin-top: 10px;
        padding-bottom: 10px;
    }
    li.number, .el-pagination span:not([class*=suffix]){
        font-size: 16px;
    }
    .el-pagination span:not([class*=suffix]){
        min-width: 80.5px;
    }
</style>