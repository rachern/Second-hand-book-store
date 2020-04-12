<template>
    <div class="shopping_list">
        <div class="cart-thead">
            <div class="column checkbox">
                <el-checkbox 
                    :indeterminate="isIndeterminate" 
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
            <shopping-item v-for="i in num" :key="i"></shopping-item>
        </div>
        <div class="option-box">
            <div class="select-all">
                <el-checkbox 
                    :indeterminate="isIndeterminate" 
                    v-model="checkAll" 
                    @change="handleCheckAllChange">全选</el-checkbox>
            </div>
            <div class="operation">
                <span>删除选中商品</span>
                <span>移到收藏夹</span>
                <span>清空购物车</span>
            </div>
            <div class="toolbar-right">
                <div class="btn-area">去结算</div>
                <div class="price-sum">总价:<span>￥0.00</span></div>
            </div>
        </div>
    </div>
</template>

<script>
import shoppingItem from '@/components/shoppingCart/shoppingItem'

export default {
    components:{
        shoppingItem
    },
    data() {
        return {
            checkAll: false,
            num: 10,
            isIndeterminate: true
        };
    },
    methods: {
        handleCheckAllChange(val) {
            this.checkedCities = val ? cityOptions : [];
            this.isIndeterminate = false;
        },
    }
}
</script>

<style lang="scss">
    .shopping_list{
        min-height: 480px;
        background-color: rgba(255,255,255,.8);
        padding: 20px;
        margin: 30px 30px 0;
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
    }
</style>