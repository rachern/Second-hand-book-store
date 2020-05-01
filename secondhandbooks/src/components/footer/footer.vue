<template>
    <div class="footer">
        <div class="footer-inner">
            <div class="copyright">
                &copy;2019-2020 多渠道二手书交易平台 版权所有
            </div>
            <div class="link">
                <span class="pointer">关于我们</span>
                <span class="pointer">联系我们</span>
                <span class="pointer">帮助中心</span>
                <span class="pointer">版权隐私</span>
                <span class="pointer">广告业务</span>
                <span class="pointer">友情链接</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss">
    .footer{
        height: 50px;
        background-color: #eaeaea;
        .footer-inner{
            line-height: 50px;
            display: flex;
            width: 90%;
            margin: 0 auto;
            justify-content: space-between;
            padding: 0 40px;
            .link{
                height: 20px;
                line-height: 20px;
                padding: 15px 0;
                span{
                    display: inline-block;
                    margin-left: 10px;
                    border-right: 1px solid black;
                    padding-right: 5px;
                    &:last-of-type{
                        border: none;
                    }
                }
            }
        }
    }
</style>