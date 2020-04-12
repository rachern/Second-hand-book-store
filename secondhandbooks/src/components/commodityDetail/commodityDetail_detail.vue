<template>
    <div class="detail">
        <el-tabs type="border-card">
            <el-tab-pane label="商品介绍">
                <commodity-introduction></commodity-introduction>
            </el-tab-pane>
            <el-tab-pane label="商品评价">
                <commodity-comment :pageSize="pageSize"></commodity-comment>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import commodityIntroduction from '@/components/commodityDetail/commodityDetail_commodityIntroduction'
import commodityComment from '@/components/commodityDetail/commodityDetail_commodityComment'

export default {
    props: ['pageSize'],
    components:{
        commodityIntroduction,
        commodityComment
    }
}
</script>

<style lang="scss">
    .detail{
        // height: 1000px;
        // border: 3px solid black;
        margin-top: 20px;
        padding-bottom: 20px;
    }

    .el-tabs__item{
        font-size: 16px;
    }
</style>