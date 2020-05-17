<template>
    <div class="personalCenter_home">
        <div class="left">
            <!-- 我的购物车 -->
            <div class="myShoppingCart">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>我的购物车</span>
                        <el-button style="float: right; padding: 3px 20px" type="text" @click="shoppingCart">更多 ></el-button>
                    </div>
                    <div class="nothing" v-if="cartList.length == 0">
                        <i class="iconfont icon-gouwuche"></i>
                        您的购物车都空空的，快去挑选合适的商品吧！
                    </div>
                    <el-table :data="cartList"
                              style="width: 100%"
                              :show-header="false"
                              v-else>
                        <el-table-column width="70">
                            <template slot-scope="scope">
                                <el-image
                                    style="width: 60px; height: 60px"
                                    :src="scope.row.url"
                                    fit="contain"></el-image>
                            </template>
                        </el-table-column>
                        <el-table-column prop="title">
                        </el-table-column>
                        <el-table-column width="120">
                            <template slot-scope="scope">
                                <el-button
                                    @click.native.prevent="checkDetail(scope.$index, cartList)"
                                    type="text"
                                    size="small">
                                    查看详情
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </div>
            <!-- 我的订单 -->
            <div class="myOrder">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>我的订单</span>
                    </div>
                    <ul class="order-icon clearfix">
                        <li class="waiting_for_paying">
                            <div class="pointer" @click="order('pay')">
                                <i class="iconfont icon-daifukuan"></i><br>待付款
                            </div>
                        </li>
                        <li class="waiting_for_receiving">
                            <div class="pointer" @click="order('receive')">
                                <i class="iconfont icon-daishouhuo"></i><br>待收货 
                            </div>
                        </li>
                        <li class="waiting_for_evaluation">
                            <div class="pointer" @click="order('evaluation')">
                                <i class="iconfont icon-daipingjia"></i><br>待评价
                            </div>
                        </li>
                        <li class="after_sales">
                            <div class="pointer" @click="order('after_sales')">
                                <i class="iconfont icon-shouhouwuyou"></i><br>退换/售后  
                            </div>
                        </li>
                        <li class="all_orders">
                            <div class="pointer" @click="order('all')">
                                <i class="iconfont icon-x"></i><br>全部订单
                            </div>
                        </li>
                    </ul>
                    <div class="nothing" v-if="!hasOrders">
                        <i class="iconfont icon-gouwuche"></i>
                        您买的东西太少了，这里都空空的，快去挑选合适的商品吧！
                    </div>
                    <div class="order-list" v-else>
                        <el-table :data="orders"
                                  style="width: 100%"
                                  :show-header="false">
                            <el-table-column width="70">
                                <template slot-scope="scope">
                                    <el-image
                                        style="width: 60px; height: 60px"
                                        :src="scope.row.url"
                                        fit="contain"></el-image>
                                </template>
                            </el-table-column>
                            <el-table-column prop="title">
                            </el-table-column>
                            <el-table-column width="120">
                                <template slot-scope="scope">
                                    <el-button
                                        @click.native.prevent="checkDetail(scope.$index, orders)"
                                        type="text"
                                        size="small">
                                        查看详情
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-card>
            </div>
        </div>
        <div class="right">
            <!-- 我的发布 -->
            <div class="myPublish">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>我的发布</span>
                        <el-button style="float: right; padding: 3px 20px" type="text" @click="myPublish">更多 ></el-button>
                    </div>
                    <div class="nothing" v-if="latestBooks.length === 0">
                        <i class="iconfont icon-ganga"></i>
                        您没有发布任何书籍o！
                    </div>
                    <el-image
                        v-for="(book,i) in latestBooks" :key="i"
                        style="width: 100px; height: 100px"
                        :src="book.url"
                        fit="contain"
                        :title="book.title"
                        v-else></el-image>
                </el-card>
            </div>
            <!-- 我的收藏 -->
            <div class="myCollection">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>我的收藏</span>
                        <el-button style="float: right; padding: 3px 20px" type="text" @click="myCollection">更多 ></el-button>
                    </div>
                    <div class="nothing" v-if="latestCollections.length === 0">
                        <i class="iconfont icon-ganga"></i>
                        您还没有收藏的书籍o！
                    </div>
                    <el-image
                        v-for="(collection,i) in latestCollections" :key="i"
                        style="width: 100px; height: 100px"
                        :src="collection.url"
                        :title="collection.title"
                        fit="contain"
                        v-else></el-image>
                </el-card>
            </div>
            <!-- 我的竞拍 -->
            <div class="myAuction">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>我的竞拍</span>
                        <el-button style="float: right; padding: 3px 20px" type="text">更多 ></el-button>
                    </div>
                    <div class="nothing" v-if="!hasOrders">
                        <i class="iconfont icon-ganga"></i>
                        您还没有参与竞拍的书籍o！
                    </div>
                    <el-image
                        v-for="i in 4" :key="i"
                        style="width: 100px; height: 100px"
                        :src="url"
                        fit="contain"
                        v-else></el-image>
                </el-card>
            </div>
            <!-- 我的征书 -->
            <div class="myAskingBook">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>我的征书</span>
                        <el-button style="float: right; padding: 3px 20px" type="text" @click="myAskingBook">更多 ></el-button>
                    </div>
                    <div class="nothing" v-if="latestAsking.length === 0">
                        <i class="iconfont icon-ganga"></i>
                        您还没有发布想要的书籍o！
                    </div>
                    <div class="myAskingBook_box" v-for="(ask, i) in latestAsking" :key="i">
                        <span :title="ask.title">{{ask.title}}</span>
                        <hr>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            orders: [
                {url:require('../../../assets/img/Computer_and_network/Database/book1.jpg'),
                title:"数据库与算法"},
                {url:require('../../../assets/img/Computer_and_network/Database/book1.jpg'),
                title:"数据库与算法"},
                {url:require('../../../assets/img/Computer_and_network/Database/book1.jpg'),
                title:"数据库与算法"},
            ],
            url: require('../../../assets/img/Computer_and_network/Database/book1.jpg'),
            hasOrders: true,
            latestAsking: [],
            latestBooks: [],
            latestCollections: [],
            cartList: []
        }
    },
    methods: {
        checkDetail(index, rows) { 
            // /CommodityDetail/5e82e55178552e24f8784eea
            this.$router.push({ path: `/CommodityDetail/${rows[index]._id}` })
            // console.log(index, rows)
        },
        shoppingCart() {
            this.$router.push({ path: '/ShoppingCart' })
        },
        order(type) {
            this.$router.push({ path: `/PersonalCenter/order/${type}` })
        },
        myAskingBook() {
            this.$router.push({ path: `/PersonalCenter/myAskingBook` })
        },
        myPublish() {
            this.$router.push({ path: `/PersonalCenter/myPublish` })
        },
        myCollection() {
            this.$router.push({ path: `/PersonalCenter/myCollection` })
        }
    },
    created() {
        this.$store.dispatch('askingBook/getFirstThreeBooks').then(res => {
            this.latestAsking = res.latestAsking
        })
        this.$store.dispatch('book/getLatestFourBooks').then(res => {
            this.latestBooks = res.latestBooks
        })
        this.$store.dispatch('user/getLatestFourCollections').then(res => {
            this.latestCollections = res.latestCollections
        })
        this.$store.dispatch('user/getMyCartList').then(res => {
            this.cartList = res.linked_cartList.reverse().slice(0,3)
        })
    }
}
</script>

<style lang="scss"> 
    .el-table .cell{
        white-space: nowrap;
    }
    .personalCenter_home{
        width: 90vw;
        min-width: 1170px;
        // height: 500px;
        // border: 1px solid black;
        margin: 20px auto;
        .left, .right{
            display: inline-block;
            // border: 1px solid red;
            text-align: left;
        }
        .left{
            width: 54vw;
            min-width: 710px;
            .myShoppingCart{
                margin-bottom: 20px;
            }
            .myOrder{
                .order-icon{
                    font-size: 14px;
                    border-bottom: 1px solid #EBEEF5;
                    padding-bottom: 14px;
                    li{
                        float: left;
                        width: 20%;
                        // padding: 0 10px;
                        // padding: 10px;
                        text-align: center;
                        div{
                            width: 90px;
                            height: 90px;
                            margin: 0 auto;
                            padding: 10px;
                            // border: 1px solid black;
                            i{
                                font-size: 40px;
                            }
                            &:hover{
                                border-radius: 5px;
                                box-shadow: 0 0 16px 0 rgba(0,0,0,.1);
                            }
                        }
                    }
                }
            }
            .nothing{
                height: 273.6px;
                line-height: 273.6px;
                text-align: center;
                font-size: 14px;
                i{
                    font-size: 50px;
                    color: rgb(184, 184, 184);
                    vertical-align: middle;
                    padding-right: 20px;
                }
            }
        }
        .right{
            width: 30vw;
            min-width: 444px;
            margin-left: 1vw;
            .myPublish,.myCollection,.myAuction{
                margin-bottom: 15px;
            }
            .nothing{
                height: 104px;
                line-height: 104px;
                text-align: center;
                font-size: 14px;
                i{
                    font-size: 50px;
                    color: rgb(184, 184, 184);
                    vertical-align: middle;
                    padding-right: 20px;
                }
            }
            .myAskingBook .myAskingBook_box{
                span{
                    white-space: nowrap;
                }
                hr{
                    background-color: rgb(210,210,210);
                    height: 1px;
                    border: none;
                }
            }
        }
    }
</style>