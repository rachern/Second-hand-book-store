<template>
    <div class="product-intro">
        <div class="preview">
            <span></span><img :src="bookDetail.url" />
        </div>
        <div class="item-info">
            <h2 class="title">{{bookDetail.title}}</h2><br/>
            <div class="author"><span class="name">{{bookDetail.author}}</span> 著</div><br/>
            <div class="issuer">发布者：{{bookDetail.issuer.username}}</div><br/>
            <div class="originalPrice">原价<s class="price">￥{{bookDetail.originalPrice}}</s></div><br/>
            <div class="presentPrice">现价<span class="price">￥{{bookDetail.presentPrice}}</span></div><br/>
            <div class="stock">库存<span class="stock-num">{{bookDetail.number}}</span></div><br/>
            <div class="number">
                购买数量
                <el-input-number v-model="num" :min="1" :max="bookDetail.number"></el-input-number>
            </div><br/>
            <div class="button">
                <el-button type="danger" icon="el-icon-chat-dot-round" @click="contactSeller">联系卖家</el-button>
                <el-button type="danger" icon="el-icon-shopping-cart-1" @click="moveToShoppingCart">加入购物车</el-button>
                <el-button type="danger" icon="el-icon-star-on" @click="moveToCollections">收藏</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data(){
        return {
            num: 1
        }
    },
    methods: {
        moveToShoppingCart() {
            this.$store.dispatch('user/moveToShoppingCart', {id:this.bookDetail._id, num:this.num}).then(res => {
                this.$message.success('加入购物车成功')
            })
        },
        moveToCollections() {
            this.$store.dispatch('user/moveToCollections', this.bookDetail._id).then(res => {
                this.$message.success(res.msg)
            })
        },
        contactSeller() {
            this.$socket.emit('contactSeller', {
                username: this.$store.getters.username,
                toUser: JSON.stringify({username:this.bookDetail.issuer.username,
                        avatar:this.bookDetail.issuer.url,
                        _id:this.bookDetail.issuer._id})
            })
            this.$router.push({ path: '/PersonalCenter/message/interactiveMessage',
                                query: { toUser: JSON.stringify({username:this.bookDetail.issuer.username,
                        avatar:this.bookDetail.issuer.url,
                        _id:this.bookDetail.issuer._id})} })
        }
    },
    computed: {
        ...mapGetters([
            'bookDetail'
        ])
    }
}
</script>

<style lang="scss">
    .product-intro{
        // height: 100px;
        // border: 1px solid red;
        margin-top: 2vh;
        display: flex;
        .preview{
            margin-left: 30px;
            width: 25vw;
            height: 25vw;
            // float: left;
            border: 1px solid rgb(190, 190, 190);
            border-radius: 10px;
            overflow: hidden;
            span{
                height: 100%;
                display: inline-block;
                vertical-align: middle;
            }
            img{
                height: 100%;
                vertical-align: middle;
                // border: 1px solid green;
            }
        }
        .item-info{
            // border: 2px solid yellow;
            flex: 1 1 auto;
            margin-left: 20px;
            text-align: left;
            padding: 16px 30px;
            .author .name{
                color: #005aa0;
            }
            .price{
                font-size: 20px;
                color: #e4393c;
                font-weight: bold;
                display: inline-block;
                margin-left: 10px;
                line-height: 24px;
            }
            .stock-num{
                font-size: 20px;
                color: #008000;
                display: inline-block;
                font-weight: bold;
                margin-left: 10px;
                line-height: 24px;
            }
            .button{
                margin-top: 10px;
            }
        }
    }
</style>