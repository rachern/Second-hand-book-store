<template>
    <div class="pagination">
        <el-pagination
            background
            :page-size="pageSize"
            layout="prev, pager, next, jumper"
            :total="total || count"
            prev-text="< 上一页"
            next-text="下一页 >"
            @current-change="handleChangePage">
        </el-pagination>
    </div>
</template>

<script>
import { getAskingBookCount, getMyAskingBooksCount } from '@/api/askingBook'
import { getCommentCount } from '@/api/comment'
import { getClassificationBooksCount, getMyPublishBooksCount } from '@/api/book'
import { getMyCollectionBooksCount } from '@/api/user'

export default {
    props: ['pageSize','total'],
    data() {
        return {
            count: 0
        }
    },
    watch: {
        $route: {
            handler: function(route) {
                // console.log(route.meta.name)
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
                }
                else if(name === 'order') {
                    
                }
            },
            immediate: true
        }
    },
    methods: {
        handleChangePage(val) {
            // console.log(val)
            const { id } = this.$route.params
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