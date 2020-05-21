<template>
    <div class="personalCenter_order">
        <div class="title" id="title"><h4>我的订单</h4></div> 
        <div class="order_wrap">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index="all">全部订单</el-menu-item>
                <el-menu-item index="pay">待付款</el-menu-item>
                <el-menu-item index="receive">待收货</el-menu-item>
                <el-menu-item index="evaluation">待评价</el-menu-item>
                <el-menu-item index="after_sales">已完成</el-menu-item>
            </el-menu>
            <div class="nothing" v-if="orderList.length === 0">
                <i class="iconfont icon-ganga"></i>
                {{tip}}
            </div>
            <div class="order_list" v-else>
                <div class="cart-thead">
                    <div class="column order_detail">订单详情</div>
                    <div class="column consignee">收货人</div>
                    <div class="column price">金额</div>
                    <div class="column state">状态</div>
                    <div class="column operation">操作</div>
                </div>
                <div class="cart-list">
                    <!-- <shopping-item v-for="i in num" :key="i"></shopping-item> -->
                    <div class="order-item" v-for="(order, i) in orderList" :key="i">
                        <div class="item-head">
                            <span class="date">{{order.createdTime}}</span>
                            <span class="orderId">订单号： {{order._id}}</span>
                        </div>
                        <div class="item-body">
                            <div class="column order_detail">
                                <div class="order_msg">
                                    <el-image
                                        style="width: 70px; height: 70px"
                                        :src="order.booksList.linked_cartList[0].url"
                                        :title="order.booksList.linked_cartList[0].title"
                                        fit="contain"></el-image>
                                    <div class="order_title">{{order.booksList.linked_cartList[0].title}}</div>
                                </div>
                                <div class="num">x {{order.booksList.cartList[0].num}}</div>
                            </div>
                            <div class="column consignee">{{order.user.username}}</div>
                            <div class="column price">总额 ￥{{order.sum}}</div>
                            <div class="column state">
                                {{order.state === 0 ? 
                                    '待付款' : (order.state === 1 ?
                                    '待收货' : (order.state === 2 ? 
                                    '待评价' : '已完成'))}}
                            </div>
                            <div class="column operations">
                                <span class="pointer" v-if="order.state === 0" @click="toPay(order._id)">去付款</span><br v-if="order.state === 0">
                                <span class="pointer" v-if="order.state === 1" @click="toConfirm(order._id)">确认收货</span><br v-if="order.state === 1">
                                <span class="pointer" v-if="order.state === 2" @click="toComment(order._id)">去评价</span><br v-if="order.state === 2"> 
                                <span class="pointer" @click="orderDetail(order._id)">订单详情</span>
                            </div>
                        </div>
                    </div>
                </div>
                <pagination :pageSize="pageSize"></pagination>
            </div>
        </div>   
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
            activeIndex: 'all',
            tip: '',
            hasOrders: true,
            url: require('../../../assets/img/Computer_and_network/Database/book1.jpg'),
            pageSize: 5
        };
    },
    computed: {
        ...mapGetters([
            'orderList'
        ])
    },
    methods: {
        handleSelect(key) {
            this.$router.push({ path: `/PersonalCenter/order/${key}` })
        },
        toPay(id) {
            this.$router.push({ path: `/ShoppingProcess/payment/${id}` })
        },
        toConfirm(id) {
            this.$router.push({ path: `/ShoppingProcess/confirmReceipt/${id}` })
        },
        toComment(id) {
            this.$router.push({path: `/ShoppingProcess/evaluate/${id}`})
        },
        orderDetail(id) {
            this.$router.push({ path: `/PersonalCenter/orderDetail/${id}` })
        }
    },
    watch: {
        $route: {
            handler: function(route) {
                const type = route.params.type
                this.activeIndex = type
                switch(type) {
                    case 'pay':
                        this.$store.dispatch('order/getMyOrdersByType', {type: 0, limit: this.pageSize})
                        this.tip = '没有待付款的订单哦~'
                        break;
                    case 'receive':
                        this.$store.dispatch('order/getMyOrdersByType', {type: 1, limit: this.pageSize})
                        this.tip = '没有待收货的订单哦~'
                        break;
                    case 'evaluation':
                        this.$store.dispatch('order/getMyOrdersByType', {type: 2, limit: this.pageSize})
                        this.tip = '没有待评价的订单哦~'
                        break;
                    case 'after_sales':
                        this.$store.dispatch('order/getMyOrdersByType', {type: 3, limit: this.pageSize})
                        this.tip = '没有已完成的订单哦~'
                        break;
                    default:
                        this.$store.dispatch('order/getMyOrders', {limit: this.pageSize})
                        this.tip = '您还没有下过订单哦~'
                        break;
                }
            },
            immediate: true
        }
    }
}
</script>

<style lang="scss">
    .personalCenter_order{
        width: 90vw;
        min-width: 1170px;
        margin: 0 auto;
        padding: 20px 0;
        .el-menu{
            padding-left: 50px;
        }
        .title{
            background-color: #fff;
            width: 70vw;
            min-width: 910px;
            margin: 0 auto;
            height: 60px;
            line-height: 60px;
            text-align: left;
            padding-left: 40px;
        }
        .order_wrap{
            min-height: 400px;
            background-color: #fff;
            width: 70vw;
            min-width: 910px;
            margin: 0 auto;
            margin-top: 20px;
            .nothing{
                height: 300px;
                line-height: 300px;
                text-align: center;
                font-size: 18px;
                i{
                    font-size: 80px;
                    color: rgb(184, 184, 184);
                    vertical-align: middle;
                    padding-right: 20px;
                }
            }
            .order_list{
                min-height: 480px;
                background-color: rgba(255,255,255,.8);
                padding: 20px;
                border: 1px solid #eee;
                .cart-thead{
                    height: 43px;
                    line-height: 43px;
                    margin: 0 0 10px;
                    padding: 5px 0;
                    background-color: #f3f3f3;
                    border: 1px solid #e9e9e9;
                    font-size: 14px;
                    display: flex;
                    .column{
                        line-height: 32px;
                        width: 120px;
                    }
                    .order_detail{
                        flex: 1;
                    }
                }
                .cart-list{
                    .order-item{
                        // height: 50px;
                        border: 1px solid #e9e9e9;
                        margin-bottom: 10px;
                        .item-head{
                            background-color: #f3f3f3;
                            height: 30px;
                            line-height: 30px;
                            text-align: left;
                            padding-left: 40px;
                            font-size: 14px;
                            .date{
                                margin-right: 30px;
                            }
                        }
                        .item-body{
                            display: flex;
                            font-size: 12px;
                            .column{
                                line-height: 32px;
                                width: 120px;
                                display: inline-block;
                                // height: 30px;
                                &:not(:last-child){
                                    border-right: 1px solid #e9e9e9;
                                }
                            }
                            .order_detail{
                                flex: 1;
                                display: flex;
                                .order_msg{
                                    flex: 1;
                                    text-align: left;
                                    line-height: 0;
                                    margin: 5px;
                                    .el-image{
                                        // vertical-align: text-top;
                                        margin-right: 10px;
                                        float: left;
                                    }
                                    .order_title{
                                        display: inline-block;
                                        white-space: nowrap;
                                        overflow: hidden;
                                        text-overflow: ellipsis;
                                        line-height: 16px;
                                        width: 215px;
                                    }
                                }
                                .num{
                                    width: 80px;
                                }
                            }
                            .operation{
                                line-height: 16px;
                            }
                        }
                    }
                }
            }
        }
    }
</style>