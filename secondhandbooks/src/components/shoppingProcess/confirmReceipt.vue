<template>
    <div class="confirm-Receipt">
        <div class="order-status">
            <div class="status">
                当前订单状态：已付款待收货
                <span class="pointer confirm" @click="confirmReceipt">确认收货</span>
            </div>
        </div>
        <div class="order-detail">
            <div class="title">订单信息</div>
            <div class="order-message">
                <div class="personalInformation">
                    <div class="address">
                        <span class="label">收货地址：</span>
                        {{orderDetail.address.name}}，{{orderDetail.address.phone}}，
                        {{orderDetail.address.province.value+orderDetail.address.city.value+orderDetail.address.area.value+orderDetail.address.town.value+orderDetail.address.address}}
                    </div>
                    <div class="shipping-method">
                        <span class="label">运送方式：</span>
                        快递
                    </div>
                </div>
                <div class="message">
                    <span class="label">订单信息：</span>
                    <div class="message-detail">
                        <span class="detail orderId">订单编号：{{orderDetail._id}}</span>
                        <span class="detail createdTime">创建时间：{{orderDetail.createdTime}}</span>
                        <span class="detail paymentTime">付款时间：{{orderDetail.paymentTime}}</span>
                        <span class="detail closingTime" v-if="orderDetail.closingTime">成交时间：{{orderDetail.closingTime}}</span>
                    </div>
                    <div class="booksList">
                        <div class="cart-thead">
                            <div class="column goods">商品</div>
                            <div class="column bookstatus">状态</div>
                            <div class="column price">单价</div>
                            <div class="column number">数量</div>
                        </div>
                        <div class="shopping-item" 
                            v-for="(book, i) in orderDetail.booksList.linked_cartList"
                            :key="i">
                            <div class="cell goods">
                                <div class="goods-item">
                                    <div class="img">
                                        <img :src="book.url" :alt="book.title" :title="book.title"/>
                                    </div>
                                    <div class="book-title">{{book.title}}</div>
                                </div>
                            </div>
                            <div class="cell bookstatus">
                                已付款待收货
                            </div>
                            <div class="cell price">￥{{book.presentPrice.toFixed(2)}}</div>
                            <div class="cell number">{{ orderDetail.booksList.cartList[i].num }}</div>
                        </div>
                    </div>
                </div>
                <div class="sum">
                    <span class="label">实付款：</span>
                    <span class="sum-num">￥{{orderDetail.sum}}</span> 元
                </div>
            </div>
        </div>
        <div class="btn">
            <el-button type="primary" size="small" @click="cancel">取消</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            orderDetail: {},
            sum: 0
        }
    },
    methods: {
        confirmReceipt() {

        },
        cancel() {
            
        }
    },
    created() {
        const id = this.$route.params.id
        this.$store.dispatch('order/getOrderById', id).then(res => {
            this.orderDetail = res
        })
    }
}
</script>

<style lang="scss">
    .confirm-Receipt{
        margin: 0 auto;
        margin-top: 20px;
        // margin-bottom: 0px;
        width: 70vw;
        min-width: 910px;
        // border: 1px solid black;
        min-height: 462px;
        .order-status{
            margin: 0 auto;
            width: 80%;
            box-shadow: 0 0 3px 3px rgba(235, 137, 14, 0.6);
            background-color: rgba(250, 233, 212, 0.6);
            height: 60px;
            .status{
                line-height: 60px;
                text-align: left;
                padding-left: 40px;
                font-weight: 700;
                .confirm{
                    font-weight: normal;
                    margin-left: 20px;
                    font-size: 14px;
                }
            }
        }
        .order-detail{
            text-align: left;
            width: 80%;
            margin: 0 auto;
            margin-top: 20px;
            .title{
                font-weight: 600;
            }
            .order-message{
                // height: 100px;
                box-shadow: 0 0 3px 3px rgba(0,0,0,.4);
                margin-top: 10px;
                padding: 20px;
                font-size: 14px;
                .label{
                    font-weight: 700;
                    margin-right: 20px;
                }
                .personalInformation{
                    border-bottom: 1px solid #aaa;
                    .address{
                        margin-bottom: 8px;
                    }
                    .shipping-method{
                        margin-bottom: 10px
                    }
                }
                .message{
                    margin-top: 10px;
                    border-bottom: 1px solid #aaa;
                    .message-detail{
                        vertical-align: top;
                        display: inline-block;
                        width: 85%;
                        .detail{
                            display: inline-block;
                            width: 50%;
                            margin-bottom: 5px;
                        }
                    }
                    .booksList{
                        margin-top: 10px;
                        margin-bottom: 20px;
                        text-align: center;
                        .cart-thead{
                            height: 43px;
                            line-height: 43px;
                            padding: 5px 0;
                            background-color: #f3f3f3;
                            border: 1px solid #e9e9e9;
                            font-size: 14px;
                            display: flex;
                            .column{
                                line-height: 32px;
                            }
                            .goods{
                                flex: 1;
                            }
                            .bookstatus{
                                width: 120px;
                            }
                            .price{
                                width: 120px;
                            }
                            .number{
                                width: 120px;
                            }
                        }
                        .shopping-item{
                            display: flex;
                            font-size: 14px;
                            border-bottom: 1px solid #cfcece;
                            border-left: 1px solid #cfcece;
                            border-right: 1px solid #cfcece;
                            .cell{
                                padding: 20px 0 15px 0;
                            }
                            .goods{
                                flex: 1;
                                .goods-item{
                                    display: flex;
                                    .img{
                                        float: left;
                                        width: 80px;
                                        height: 80px;
                                        border: 1px solid #eee;
                                        margin-right: 10px;
                                        background-color: #fff;
                                        overflow: hidden;
                                        img{
                                            height: 100%;
                                        }
                                    }
                                    .book-title{
                                        flex: 1;
                                        text-align: left;
                                        font-size: 16px;
                                    }
                                }
                            }
                            .bookstatus{
                                width: 120px;
                            }
                            .price{
                                width: 120px;
                                color: #E2231A;
                            }
                            .number{
                                width: 120px;
                            }
                        }
                    }
                }
                .sum{
                    margin-top: 20px;
                    text-align: right;
                    .sum-num{
                        font-size: 24px;
                        font-weight: 700;
                        color: tomato;
                    }
                }
            }
        }
        .btn{
            width: 80%;
            margin: 0 auto;
            margin-top: 10px;
            text-align: right;
        }
    }
</style>