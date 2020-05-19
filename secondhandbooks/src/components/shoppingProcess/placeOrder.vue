<template>
    <div class="place-order">
        <div class="select-address">
            <div class="title">选择收货地址</div>
            <div class="addresses">
                <div v-if="!showAllAddress">
                    <div class="address"
                        :class="{selected: selectedAddress === i}"
                        v-for="(address, i) in defaultAddress"
                        :key="i"
                        @click="select(i)">
                        <div class="addressee">{{address.name}} 收（{{address.phone}}）</div>
                        <div class="receiving-address">{{address.area + address.address}}</div>
                        <div class="default-address"
                            v-if="address.state === 1">默认地址</div>
                    </div>
                </div>
                <div v-else>
                    <div class="address"
                        :class="{selected: selectedAddress === i}"
                        v-for="(address, i) in addressData"
                        :key="i"
                        @click="select(i)">
                        <div class="addressee">{{address.name}} 收（{{address.phone}}）</div>
                        <div class="receiving-address">{{address.area + address.address}}</div>
                        <div class="default-address"
                            v-if="address.state === 1">默认地址</div>
                    </div>
                </div>
            </div>
            <div class="operation clearfix">
                <span class="show-all-address pointer" @click="toggleAllAddress">
                    {{showAllAddress ? '显示部分地址' : '显示全部地址'}}
                </span>
                <span class="manage-address pointer" @click="manageAddress">管理收货地址</span>
            </div>
        </div>

        <div class="order-message">
            <div class="title">确认订单信息</div>
            <div class="booksList">
                <div class="cart-thead">
                    <div class="column goods">商品</div>
                    <div class="column price">单价</div>
                    <div class="column quantity">数量</div>
                    <div class="column sum">小计</div>
                </div>
                <div class="shopping-item" 
                    v-for="(book, i) in selectedBooks.linked_cartList"
                    :key="i">
                    <div class="cell goods">
                        <div class="goods-item">
                            <div class="img">
                                <img :src="book.url" :alt="book.title" :title="book.title"/>
                            </div>
                            <div class="book-title">{{book.title}}</div>
                        </div>
                    </div>
                    <div class="cell price">￥{{book.presentPrice.toFixed(2)}}</div>
                    <div class="cell quantity">
                        {{ selectedBooks.cartList[i].num }}
                    </div>
                    <div class="cell sum">￥{{(book.presentPrice * selectedBooks.cartList[i].num ).toFixed(2)}}</div>
                </div>
            </div>
        </div>

        <div class="result clearfix">
            <div class="result-wrap">
                <div class="result-inner">
                    <div class="actual-payment">
                        <span class="label">实付款：</span>
                        ￥<span class="price">{{sum}}</span>
                    </div>
                    <div class="sent-to">
                        <span class="label">寄送至：</span>
                        {{addressData[selectedAddress].area + addressData[selectedAddress].address}}
                    </div>
                    <div class="consignee">
                        <span class="label">收货人：</span>
                        {{addressData[selectedAddress].name}} {{addressData[selectedAddress].phone}}
                    </div>
                </div>
                <div class="placeOrder clearfix">
                    <div class="btn pointer" @click="placeOrder">提交订单</div>
                    <div class="toCartList pointer" @click="toShoppingCart">
                        <i class="iconfont icon-fanhui"></i>
                        返回购物车
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            addressData: [],
            defaultAddress: [],
            selectedAddress: 0,
            showAllAddress: false,
            selectedBooks: {
                cartList: [],
                linked_cartList: []
            },
            sum: 0
        }
    },
    methods: {
        select(i) {
            this.selectedAddress = i
        },
        toggleAllAddress() {
            this.showAllAddress = !this.showAllAddress
        },
        manageAddress() {
            this.$router.push({ path: '/PersonalCenter/accountSettings/address' })
        },
        toShoppingCart() {
            this.$router.push({ path: '/ShoppingCart' })
        },
        placeOrder() {
            // this.$emit('changeProcess', 2)
            let sendMessageObj = { 
                address: this.addressData[this.selectedAddress]._id,
                state: 0,
                booksList: this.selectedBooks,
                sum: this.sum
            }
            this.$store.dispatch('order/placeOrder', sendMessageObj).then(res => {
                this.$router.push({ path: `/ShoppingProcess/payment/${res}` })
            })
        }
    },
    computed: {
        ...mapGetters([
            'addressList',
            'myCartList'
        ])
    },
    watch: {
        myCartList(newValue) {
            let sum = 0
            newValue.cartList.forEach((element, i) => {
                if(element.checked) {
                    this.selectedBooks.cartList.push(element)
                    this.selectedBooks.linked_cartList.push(newValue.linked_cartList[i])
                    sum += (element.num * newValue.linked_cartList[i].presentPrice)
                }
            })
            this.sum = sum.toFixed(2)
        },
        addressList(newValue) {
            let address_list = newValue.map(element => {
                return {
                    _id: element._id,
                    name: element.name,
                    area: element.province.value + element.city.value + element.area.value + element.town.value,
                    address: element.address,
                    phone: element.phone,
                    state: element.state
                }
            })
            let defaultAddress, defaultIndex
            address_list.forEach((element,index) => {
                if(element.state === 1) {
                    defaultAddress = element
                    defaultIndex = index
                }
            })
            address_list.splice(defaultIndex,1)
            address_list.unshift(defaultAddress)
            this.addressData = address_list
            this.defaultAddress = address_list.slice(0,4)
        }
    },
    created() {
        this.$store.dispatch('address/getAddress')
        this.$store.dispatch('user/getMyCartList')
    }
}
</script>

<style lang="scss">
    .place-order{
        margin: 0 auto;
        margin-top: 20px;
        width: 80vw;
        min-width: 1040px;
        // border: 1px solid black;
        min-height: 462px;
        .title {
            text-align: left;
            font-weight: 700;
            margin-top: 20px;
        }
        .addresses{
            margin-top: 10px;
            // display: flex;
            // justify-content: space-between;
            text-align: left;
            cursor: pointer;
            .address{
                display: inline-block;
                width: 24%;
                height: 100px;
                box-shadow: 0 0 3px 1px rgba(32, 32, 32, 0.6);
                padding: 10px;
                font-size: 14px;
                position: relative;
                margin-right: 10px;
                margin-bottom: 10px;
                vertical-align: middle;
                .addressee{
                    margin-bottom: 10px;
                }
                .default-address{
                    position: absolute;
                    top: 0;
                    right: 0;
                    background-color: rgba(165,162,162,.4);
                    color: white;
                    padding: 3px;
                }
            }
            .selected{
                box-shadow: 0 0 3px 2px rgba(245, 4, 4, 0.7);
            }
        }
        .operation{
            font-size: 12px;
            .show-all-address{
                float: left;
            }
            .manage-address{
                float: right;
            }
        }
        .booksList{
            margin-top: 10px;
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
                .goods{
                    flex: 1;
                }
                .price{
                    width: 220px;
                }
                .quantity{
                    width: 220px;
                }
                .sum{
                    width: 220px;
                }
            }
            .shopping-item{
                display: flex;
                font-size: 14px;
                border-bottom: 1px solid #cfcece;
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
                .price{
                    width: 220px;
                    color: #E2231A;
                }
                .quantity{
                    width: 220px;
                }
                .sum{
                    font-size: 16px;
                    width: 220px;
                    font-weight: bold;
                    color: #E2231A;
                }
            }
        }
        .result-wrap{
            float: right;
            margin-top: 30px;
            text-align: right;
            line-height: 1.5;
            .result-inner{
                box-shadow: 0 0 3px 2px rgba(245, 4, 4, 0.7);
                width: 500px;
                padding: 20px;
                .actual-payment{
                    font-size: 30px;
                    font-weight: 700;
                    color: rgb(179, 174, 174);
                    margin-bottom: 10px;
                    .price{
                        color: #E2231A;
                    }
                }
                .label{
                    font-size: 14px;
                    font-weight: 700;
                    color: #000;
                }
            }
            .placeOrder{
                .btn{
                    float: right;
                    text-align: center;
                    color: #fff;
                    padding: 5px;
                    background-color: #E2231A;
                    width: 100px;
                }
                .toCartList{
                    float: right;
                    padding: 5px;
                    margin-right: 160px;
                    i{
                        font-size: 16px;
                    }
                }
            }
        }
    }
</style>