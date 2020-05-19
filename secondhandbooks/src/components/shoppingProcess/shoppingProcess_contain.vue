<template>
    <div class="shopping-process-contain">
        <div class="shopping-process-contain-inner">
            <tab></tab>
            <el-steps :active="nowActive" align-center>
                <el-step title="查看购物车" :status="nowActive > 0 ? 'success' : ''"></el-step>
                <el-step title="提交订单" :status="nowActive > 1 ? 'success' : ''"></el-step>
                <el-step title="支付" :status="nowActive > 2 ? 'success' : ''"></el-step>
                <el-step title="确认收货" :status="nowActive > 3 ? 'success' : ''"></el-step>
                <el-step title="评价"></el-step>
            </el-steps>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import tab from '@/components/tab/tab'

export default {
    data() {
        return {
            nowActive: 1
        }
    },
    components:{
        tab
    },
    watch: {
        $route: {
            handler: function(route) {
                switch(route.name) {
                    case 'placeOrder':
                        this.nowActive = 1;
                        break;
                    case 'payment':
                        this.nowActive = 2;
                        break;
                    case 'confirmReceipt':
                        this.nowActive = 3;
                        break;
                    case 'evaluate':
                        this.nowActive = 4;
                        break;
                    default:
                        break;
                }
            },
            immediate: true
        }
    }
}
</script>

<style lang="scss">
    .shopping-process-contain {
        background-color: rgba(255,255,255,1);
        .shopping-process-contain-inner{
            width: 90vw;
            margin: 0 auto;
            padding-bottom: 20px;
            .el-steps--horizontal{
                margin-top: 14px;
            }
        }
    }
</style>