<template>
    <div class="shopping_list" v-if="loadSurvey">
        <div v-if="myCartList && myCartList.linked_cartList && myCartList.linked_cartList.length > 0">
            <div class="cart-thead">
                <div class="column checkbox">
                    <el-checkbox 
                        v-model="checkAll" 
                        @change="handleCheckAllChange">全选</el-checkbox>
                </div>
                <div class="column goods">商品</div>
                <div class="column price">单价</div>
                <div class="column quantity">数量</div>
                <div class="column sum">小计</div>
                <div class="column action">操作</div>
            </div>
            
            <div class="cart-list">
                <shopping-item v-for="(book, index) in myCartList.linked_cartList" 
                            :key="index"
                            :book="book"
                            :bookNum="myCartList.cartList[index].num"
                            :check="cartList[index].checked"
                            @changeCheck="changeCheck(index, arguments[0])"
                            @changeNum="changeNum(index, arguments[0])"
                            @deleteThis="deleteThis(index)"
                            @removeThis="removeThis(index)"></shopping-item>
            </div>

            <div class="option-box">
                <div class="select-all">
                    <el-checkbox 
                        v-model="checkAll" 
                        @change="handleCheckAllChange">全选</el-checkbox>
                </div>
                <div class="operation">
                    <span @click="deleteChecked">删除选中商品</span>
                    <span @click="removeChecked">移到收藏夹</span>
                    <span @click="clearCartList">清空购物车</span>
                </div>
                <div class="toolbar-right">
                    <div class="btn-area" @click="toSettle">去结算</div>
                    <div class="price-sum">总价:<span>￥{{totalPrice}}</span></div>
                </div>
            </div>
        </div>
        <div class="nothing" v-else>
            <i class="iconfont icon-ganga"></i>您当前的购物车还是空空的哦~ 快去添加点商品进购物车吧！
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import shoppingItem from '@/components/shoppingCart/shoppingItem'

export default {
    components:{
        shoppingItem
    },
    data() {
        return {
            checkAll: false,
            num: 10,
            cartList: [],
            totalPrice: 0,
            loadSurvey: true
        };
    },
    methods: {
        // 全选checkbox改变时
        handleCheckAllChange(val) {
            this.checkAll = val
            this.cartList.forEach(element => {
                element.checked = val
            })
            this.$store.dispatch('user/updateCartList', this.cartList)
        },
        // checkbox变化时
        changeCheck(index, value) {
            this.cartList[index].checked = value
            const isAllCheck = this.cartList.every(element => {
                return element.checked === true
            })
            if(isAllCheck) {
                this.checkAll = true
            } else {
                this.checkAll = false
            }
            this.$store.dispatch('user/updateCartList', this.cartList)
        },
        // 商品数量发生变化时
        changeNum(index, value) {
            this.cartList[index].num = value
            this.$store.dispatch('user/updateCartList', this.cartList)
        },
        // 删除选中的商品
        deleteChecked() {
            for(let i = 0; i < this.cartList.length; i++) {
                if(this.cartList[i].checked) {
                    this.cartList.splice(i, 1) //将使后面的元素依次前移，数组长度-1
                    i--  // 如果不减，将漏掉一个元素
                }
            }
            this.$store.dispatch('user/updateCartList', this.cartList).then(async res => {
                await this.$store.dispatch('user/getMyCartList')
                //使页面重新渲染
                this.loadSurvey = false
                this.$nextTick(() => {
                    this.loadSurvey = true
                })
            })
        },
        // 将选中商品移到收藏夹
        removeChecked() {
            let bookIds = [];
            for(let i = 0; i < this.cartList.length; i++) {
                if(this.cartList[i].checked) {
                    bookIds.push(this.cartList[i].id)
                }
            }
            this.$store.dispatch('user/moveToCollection', bookIds).then(res => {
                this.deleteChecked();
            })
        },
        // 清空购物车
        clearCartList() {
            this.cartList = []
            this.$store.dispatch('user/updateCartList', this.cartList).then(res => {
                this.$store.dispatch('user/getMyCartList')
                //使页面重新渲染
                this.loadSurvey = false
                this.$nextTick(() => {
                    this.loadSurvey = true
                })
            })
        },
        // 删除当前商品
        deleteThis(index) {
            this.cartList.splice(index, 1)
            this.$store.dispatch('user/updateCartList', this.cartList).then(res => {
                this.$store.dispatch('user/getMyCartList')
                //使页面重新渲染
                this.loadSurvey = false
                this.$nextTick(() => {
                    this.loadSurvey = true
                })
            })
        },
        // 将当前商品移入收藏夹
        removeThis(index) {
            this.$store.dispatch('user/moveToCollection', [this.cartList[index].id]).then(res => {
                this.deleteThis(index)
            })
        },
        // 去结算
        toSettle() {
            this.$router.push({ path: '/ShoppingProcess/placeOrder' })
        }
    },
    computed: {
        ...mapGetters([
            'myCartList'
        ])
    },
    watch: {
        myCartList: {
            handler(value) {
                if(value) {
                    this.cartList = value.cartList
                    const isAllCheck = this.cartList.every(element => {
                        return element.checked === true
                    })
                    if(isAllCheck) {
                        this.checkAll = true
                    } else {
                        this.checkAll = false
                    }
                }
            },
            immediate: true
        },
        cartList: {
            handler(newValue) {
                let sum = 0;
                newValue.forEach((element,index) => {
                    if(element.checked) {
                        sum += element.num * this.myCartList.linked_cartList[index].presentPrice
                    }
                })
                this.totalPrice = sum.toFixed(2)
            },
            deep: true
        }
    }
}
</script>

<style lang="scss">
    .shopping_list{
        min-height: 520px;
        background-color: rgba(255,255,255,.8);
        padding: 20px;
        margin: 30px 30px 0;
        border: 1px solid #eee;
        position: relative;
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
            }
            .checkbox{
                height: 18px;
                line-height: 18px;
                padding-top: 7px;
                width: 122px;
                padding-left: 11px;
            }
            .goods{
                flex: 1;
            }
            .price{
                width: 160px;
            }
            .quantity{
                width: 160px;
            }
            .sum{
                width: 160px;
            }
            .action{
                width: 160px;
            }
        }
        .option-box{
            margin-top: 20px;
            height: 50px;
            border: 1px solid #e9e9e9;
            display: flex;
            .select-all{
                height: 18px;
                line-height: 18px;
                padding-top: 16px;
                padding-left: 20px;
            }
            .operation{
                height: 18px;
                line-height: 18px;
                padding-top: 16px;
                margin-left: 20px;
                span{
                    display: inline-block;
                    margin-right: 6px;
                    cursor: pointer;
                    &:hover{
                        color: #e54346;
                    }
                }
            }
            .toolbar-right{
                flex: 1;
                height: 18px;
                line-height: 18px;
                div{
                    float: right;
                }
                .btn-area{
                    width: 94px;
                    height: 50px;
                    line-height: 50px;
                    color: #fff;
                    font-weight: bold;
                    background-color: #e54346;
                    cursor: pointer;
                }
                .price-sum{
                    height: 40px;
                    line-height: 40px;
                    margin: 7px 5px 0 10px;
                    color: #666;
                    margin-right: 10px;
                    font-size: 12px;
                    span{
                        color: #e54346;
                        font-weight: bold;
                        font-size: 20px;
                    }
                }
            }
        }
        .nothing{
            font-size: 24px;
            color: #a5a4a4;
            line-height: 470px;
            i{
                font-size: 40px;
                margin-right: 10px;
            }
        }
    }
</style>