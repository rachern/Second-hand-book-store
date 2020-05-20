<template>
    <div class="payment">
        <div class="picture">
            <img src="../../assets/img/payment.jpg">
        </div>
        <div class="btns">
            <el-button type="warning" @click="cancel">取消付款</el-button>
            <el-button type="primary" @click="confirm">确定付款</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            id: ''
        }
    },
    methods: {
        cancel() {
            // 跳转到订单待付款页面
            this.$router.push({path: '/PersonalCenter/order/pay'})
        },
        confirm() {
            this.$store.dispatch('order/paid', this.id).then(res => {
                this.$message.success('付款成功')
                // 跳转到订单待收货页面
                this.$router.push({ path: `/ShoppingProcess/confirmReceipt/${this.id}` })
            })
        }
    },
    created() {
        this.id = this.$route.params.id
    }
}
</script>

<style lang="scss">
    .payment{
        margin: 0 auto;
        margin-top: 20px;
        width: 80vw;
        min-width: 1040px;
        min-height: 462px;
        .picture{
            width: 320px;
            height: 320px;
            margin: 0 auto;
            img{
                width: 100%;
            }
        }
        .btns{
            width: 300px;
            margin: 0 auto;
            margin-top: 40px;
            display: flex;
            justify-content: space-between;
        }
    }
</style>