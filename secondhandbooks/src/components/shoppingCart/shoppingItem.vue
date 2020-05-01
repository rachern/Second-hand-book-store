<template>
    <div class="shopping-item">
        <div class="cell checkbox">
            <el-checkbox v-model="checked" @change="changeCheck"></el-checkbox>
        </div>
        <div class="cell goods">
            <div class="goods-item">
                <div class="img">
                    <img :src="book.url" :alt="book.title" :title="book.title"/>
                </div>
                <div class="title">{{book.title}}</div>
            </div>
        </div>
        <div class="cell price">￥{{book.presentPrice.toFixed(2)}}</div>
        <div class="cell quantity">
            <el-input-number v-model="bookNumber" @change="handleChange" :min="1" :max="book.number" size="mini"></el-input-number>
        </div>
        <div class="cell sum">￥{{(book.presentPrice * bookNumber).toFixed(2)}}</div>
        <div class="cell action">
            <p @click="deleteThis">删除</p>
            <p @click="removeThis">移到收藏</p>
        </div>
    </div>
</template>

<script>
export default {
    props: ['book', 'bookNum','check'],
    data() {
        return {
            checked: false,
            bookNumber: 0
        };
    },
    methods: {
        handleChange(value) {
            this.$emit('changeNum', value)
        },
        changeCheck() {
            this.$emit('changeCheck', this.checked)
        },
        deleteThis() {
            this.$emit('deleteThis')
        },
        removeThis() {
            this.$emit('removeThis')
        }
    },
    mounted() {
        this.bookNumber = this.bookNum
        this.checked = this.check
    },
    watch: {
        check(newValue) {
            this.checked = newValue
        }
    }
    // watch: {
    //     bookNum(newValue) {
    //         this.bookNumber = newValue
    //     }
    // },
    // computed: {
    //     book_num: {
    //         get() {
    //             return this.bookNum
    //         },
    //         set(val) {
    //             console.log(val)
    //         }
    //     }
    // }
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
            color: #E2231A;
        }
        .quantity{
            width: 160px;
        }
        .sum{
            font-size: 16px;
            width: 160px;
            font-weight: bold;
            color: #E2231A;
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