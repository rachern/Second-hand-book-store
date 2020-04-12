<template>
    <div class="commodity-introduction">
        <div class="parameter">
            <ul class="parameter-list">
                <li title="江西人民出版社">出版社：{{bookDetail.publisher}}</li>
                <li title="9787210113676">ISBN：{{bookDetail.ISBN}}</li>
                <li title="1">版次：{{bookDetail.edition}}</li>
                <li title="12540993">商品编码：{{bookDetail.code}}</li>
                <li title="平装">包装：{{bookDetail.pack}}</li>
                <li title="16">开本：{{bookDetail.size}}</li>
                <li title="2019-07-01">出版时间：{{bookDetail.publishingTime}}</li>
                <li title="轻型纸">用纸：{{bookDetail.paper}}</li>
            </ul>
        </div>
        <div class="detail-content">
            <!-- 产品特色 -->
            <div id="characteristic" class="book-detail-item" v-if="bookDetail.feature">
                <div class="item-mt">
                    <h3>产品特色</h3>
                </div>
                <div class="item-mc">
                    <div class="book-detail-content">
                        <img v-for="(f, index) in bookDetail.feature" :key="index" 
                             :src="f.url" />
                    </div>
                </div>
            </div>
            <!-- 编辑推荐 -->
            <div id="recommend" class="book-detail-item" v-if="bookDetail.recommend">
                <div class="item-mt">
                    <h3>编辑推荐</h3>
                </div>
                <div class="item-mc">
                    <div class="book-detail-content">
                        {{bookDetail.recommend}}
                    </div>
                </div>
            </div>
            <!-- 内容简介 -->
            <div id="contentIntroduction" class="book-detail-item" v-if="bookDetail.contentIntroduction">
                <div class="item-mt">
                    <h3>内容简介</h3>
                </div>
                <div class="item-mc">
                    <div class="book-detail-content">
                        {{bookDetail.contentIntroduction}}
                    </div>
                </div>
            </div>
            <!-- 作者简介 -->
            <div id="authorIntroduction" class="book-detail-item" v-if="bookDetail.authorIntroduction">
                <div class="item-mt">
                    <h3>作者简介</h3>
                </div>
                <div class="item-mc">
                    <div class="book-detail-content">
                        {{bookDetail.authorIntroduction}}
                    </div>
                </div>
            </div>
            <!-- 目录 -->
            <div id="digest" class="book-detail-item" :class="{hidden:isHidden}" v-if="bookDetail.digest">
                <div class="item-mt">
                    <h3>目录</h3>
                </div>
                <div class="item-mc">
                    <div class="book-detail-content">
                        {{bookDetail.digest}}
                    </div>
                </div>
            </div>
            <!-- 显示全部与收起全部切换 -->
            <div class="changeShow" @click="changeShow" v-if="bookDetail.digest">
                {{isHidden ? "显示全部 ↓" : "收起全部 ↑"}}
            </div>
        </div>
        <div class="detail-nav" :class='{fixed: fixed}'>
            <el-button type="info" round @click="jumpTo" v-if="bookDetail.feature">产品特色</el-button>
            <el-button type="info" round @click="jumpTo" v-if="bookDetail.recommend">编辑推荐</el-button>
            <el-button type="info" round @click="jumpTo" v-if="bookDetail.contentIntroduction">内容简介</el-button>
            <el-button type="info" round @click="jumpTo" v-if="bookDetail.authorIntroduction">作者简介</el-button>
            <el-button type="info" round @click="jumpTo" v-if="bookDetail.digest">目录</el-button>
            <el-button type="info" round @click="jumpTo">回到顶部</el-button>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data(){
        return {
            isHidden: true,
            fixed: false
        }
    },
    computed: {
        ...mapGetters([
            'bookDetail'
        ])
    },
    methods:{
        changeShow() {
            this.isHidden = !this.isHidden;
        },
        jumpToWhere(place) {
            document.querySelector(place).scrollIntoView()
        },
        jumpTo(e) {
            // console.log(e)
            const { innerText } = e.target
            // console.log(innerText)
            switch(innerText) {
                case '产品特色':
                    this.jumpToWhere('#characteristic');
                    break;
                case '编辑推荐':
                    this.jumpToWhere('#recommend');
                    break;
                case '内容简介':
                    this.jumpToWhere('#contentIntroduction');
                    break;
                case '作者简介':
                    this.jumpToWhere('#authorIntroduction');
                    break;
                case '目录':
                    this.jumpToWhere('#digest');
                    break;
                case '回到顶部':
                    this.jumpToWhere('#header');
                    break;
                default:
                    break;
            }
        },
        scrollFn() {
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
            if(scrollTop >= 700) {
                this.fixed = true
            } else {
                this.fixed = false
            }
        }
    },
    mounted() {
        window.addEventListener('scroll', this.scrollFn)
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.scrollFn)
    }
}
</script>

<style lang="scss">
    .el-button.is-round{
        width: 100%;
        height: 10%;
        margin-bottom: 10px;
        margin-left: 0;
        border-radius: 40px;
    }
    .commodity-introduction{
        .parameter{
            padding: 0 10px 10px;
            border-bottom: 1px solid #eee;
            margin-bottom: 10px; 
            .parameter-list{
                padding: 20px 0 15px;
                overflow: hidden;
                li{
                    text-align: left;
                    line-height: 22px;
                    width: 20vw;
                    padding-left: 2.5vw;
                    float: left;
                    margin-bottom: 5px;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                }
            }
        }
        .detail-content{
            width: 850px;
            float: left;
            .book-detail-item{
                overflow: hidden;
                margin: 0 30px;
                padding-top: 20px;
                .item-mt{
                    height: 30px;
                    border-bottom: 3px solid #e4393c;
                    h3{
                        font-size: 14px;
                        line-height: 30px;
                        width: 120px;
                        height: 30px;
                        color: #fff;
                        padding: 0 30px 0 20px;
                        background-color: #e4393c;
                        border-top-left-radius: 10px;
                        border-top-right-radius: 50px;
                    }
                }
                .item-mc{
                    padding: 18px 10px 0;
                    .book-detail-content{
                        text-align: left;
                        font-size: 14px;
                        line-height: 24px;
                        white-space: pre-line;
                        img{
                            width: 750px;
                        }
                    }
                }
                &.hidden{
                    height: 314px;
                    overflow: hidden;
                }
            }
            .changeShow{
                text-align: left;
                font-size: 14px;
                margin-left: 45px;
                color: #005aa0;
                cursor: pointer;
            }
        }
        .detail-nav{
            height: 500px;
            width: 200px;
            float: left;
            margin-top: 20px;
            margin-left: 50px;
            &.fixed{
                position: fixed;
                top: 50px;
                left: 935px;
            }
        }
    }
</style>