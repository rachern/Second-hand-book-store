<template>
    <div class="shopping-item">
        <div class="cell checkbox">
            <el-checkbox v-model="checked"></el-checkbox>
        </div>
        <div class="cell goods">
            <div class="goods-item">
                <div class="img">
                    <img :src="shopping.url" :alt="shopping.title" :title="shopping.title"/>
                </div>
                <div class="title">{{shopping.title}}</div>
            </div>
        </div>
        <div class="cell price">￥65.60</div>
        <div class="cell quantity">
            <el-input-number v-model="num" @change="handleChange" :min="1" :max="10" size="mini"></el-input-number>
        </div>
        <div class="cell sum">￥65.60</div>
        <div class="cell action">
            <p>删除</p>
            <p>移到收藏</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            num: 1,
            shopping: {
                url: require('../../assets/img/Computer_and_network/Language_and_programming/book1.jpg'),
                title: 'Python大战机器学习：数据科学家的第一个小目标'
            }
        };
    },
}
</script>

<style lang="scss">
    .shopping-item{
        display: flex;
        font-size: 14px;
        border-bottom: 1px solid #cfcece;
        .cell{
            padding: 20px 0 15px 0;
        }
        .checkbox{
            width: 122px;
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
                .title{
                    flex: 1;
                    text-align: left;
                    font-size: 16px;
                }
            }
        }
        .price{
            width: 160px;
        }
        .quantity{
            width: 160px;
        }
        .sum{
            width: 160px;
            font-weight: bold;
        }
        .action{
            width: 160px;
            line-height: 32px;
            p{
                &:hover{
                    color: #E2231A;
                    cursor: pointer;
                }
            }
        }
    }
</style>