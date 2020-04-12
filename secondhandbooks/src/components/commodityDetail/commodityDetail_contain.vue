<template>
    <div class="commodity-detail-contain">
        <div class="commodity-detail-contain-inner">
            <tab></tab>
            <div class="crumbs-nav">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>{{bookDetail.classification.level_1}}</el-breadcrumb-item>
                    <el-breadcrumb-item>{{bookDetail.classification.level_2}}</el-breadcrumb-item>
                    <el-breadcrumb-item>{{bookDetail.title}}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <product-intro></product-intro>
            <detail :pageSize="pageSize"></detail>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

import tab from '@/components/tab/tab'
import productIntro from '@/components/commodityDetail/commodityDetail_productIntro'
import detail from '@/components/commodityDetail/commodityDetail_detail'

export default {
    props: ['pageSize'],
    components:{
        tab,
        productIntro,
        detail
    },
    computed: {
        ...mapGetters([
            'bookDetail'
        ])
    }
}
</script>

<style lang="scss">
    .commodity-detail-contain{
        // height: 1000px;
        background-color: rgba(255,255,255,.8);
        .commodity-detail-contain-inner{
            width: 90vw;
            margin: 0 auto;
            .crumbs-nav{
                text-align: left;
                margin-top: 2vh;
                .el-breadcrumb{
                    font-size: 16px;
                }
            }
        }
    }
</style>