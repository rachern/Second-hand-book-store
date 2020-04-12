// 商品筛选
<template>
    <div class="commodity-screening">
        <div class="title">
            <h3>
                <b>语言与编程</b>
                <em>商品筛选</em>
            </h3>
        </div>
        <div class="select-line brand">
            <div class="key"><span>出版社：</span></div>
            <div class="value">
                <div class="clr"></div>
                <div class="list">
                    <ul>
                        <li v-for="(publisher, index) in publisherList" :key="index">
                            <a href="javascript:;" :title="publisher">{{publisher}}</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="ext"></div>
        </div>
        <div class="select-line">
            <div class="key"><span>价格：</span></div>
            <div class="value">
                <div class="clr"></div>
                <div class="list">
                    <ul>
                        <li v-for="(price, index) in priceList" :key="index">
                            <a href="javascript:;" :title="price">{{price}}</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="ext"></div>
        </div>
        <div class="select-line">
            <div class="key"><span>包装：</span></div>
            <div class="value">
                <div class="clr"></div>
                <div class="list">
                    <ul>
                        <li v-for="(p, index) in packageList" :key="index">
                            <a href="javascript:;" :title="p">{{p}}</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="ext"></div>
        </div>
        <div class="select-line">
            <div class="key"><span>客户评分：</span></div>
            <div class="value">
                <div class="clr"></div>
                <div class="list">
                    <ul>
                        <li v-for="(grade, index) in gradeList" :key="index">
                            <a href="javascript:;" :title="grade">{{grade}}</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="ext"></div>
        </div>
        <div class="select-line">
            <div class="key"><span>折扣：</span></div>
            <div class="value">
                <div class="clr"></div>
                <div class="list">
                    <ul>
                        <li v-for="(discount, index) in discountList" :key="index">
                            <a href="javascript:;" :title="discount">{{discount}}</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="ext"></div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            publisherList: ['人民文学出版社','天津人民出版社','长江文艺出版社','上海古籍出版社','江苏凤凰文艺出版社',
                            '北京十月文艺出版社','湖南文艺出版社','作家出版社','四川文艺出版社','广西师范大学出版社',
                            '浙江文艺出版社','中国友谊出版社','北方文艺出版社','上海文艺出版社','江苏文艺出版社','译林出版社'],
            priceList: ['0-29','30-59','60-89','90-199','200-299','300以上'],
            packageList: ['平装','精装','盒装','袋装','软精装','线状','简装'],
            gradeList: ['5星','4星及以上','3星及以上','2星及以上','1星及以上'],
            discountList: ['0-3折','3-5折','5-7折','7折以上']
        }
    }
}
</script>

<style lang="scss">
    .commodity-screening{
        border-top: 2px solid #ddd;
        margin-top: 2vh;
        text-align: left;
        background-color: rgba(255,255,255,.7);
        .title{
            border-bottom: 2px solid #DDD;
            background: #f1f1f1;
            height: 34px;
            line-height: 34px;
            h3{
                font-size: 14px;
                padding-left: 10px;
                b{
                    color: #e4393c;
                    margin-right: 8px;
                }
            }
        }
        .select-line{
            border-bottom: 2px solid #eee;
            position: relative;
            line-height: 34px;
            font-size: 12px;
            .key{
                color: #666;
                float: left;
                width: 100px;
                padding-left: 10px;
            }
            .value{
                margin-left: 110px;
                padding-left: 10px;
                padding-right: 130px;
                overflow: hidden;
                .clr{
                    display: block;
                    clear: both;
                }
                .list{
                    padding-top: 4px;
                    ul{
                        height: 30px;
                        float: left;
                        li{
                            margin-right: 16px;
                            float: left;
                            margin-bottom: 4px;
                            line-height: 26px;
                            a{
                                color: #666;
                                &:hover{
                                    color: #e4393c;
                                }
                            }
                        }
                    }
                }
            }
            &.brand .value .list ul{
                height: 60px;
                li{
                    margin-right: 5px;
                    width: 130px;
                }
            }
        }
    }
</style>