<template>
    <div class="classification-contain">
        <div class="classification-contain-inner">
            <tab></tab>
            <div class="crumbs-nav">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>{{classificationBooks[0].classifications[0].level_1}}</el-breadcrumb-item>
                    <el-breadcrumb-item>{{classificationBooks[0].classifications[0].level_2}}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <!-- <commodity-screening></commodity-screening> -->
            <show-books></show-books>
            <pagination :pageSize="pageSize"></pagination>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import tab from '@/components/tab/tab'
// import commodityScreening from '@/components/classification/classification_commodityScreening'
import showBooks from '@/components/classification/classification_showBooks'
import pagination from '@/components/classification/classification_pagination'

export default {
    props: ['pageSize'],
    components: {
        tab,
        // commodityScreening,
        showBooks,
        pagination
    },
    computed: {
        ...mapGetters([
            'classificationBooks'
        ])
    }
}
</script>

<style lang='scss'>
    .classification-contain{
        // height: 1000px;
        background-color: rgba(255,255,255,.8);
        .classification-contain-inner{
            width: 90vw;
            min-width: 1170px;
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