<template>
    <div class="personalCenter_address">
        <div class="address_title"><h4>收货地址</h4></div>
        <el-button type="primary" round size="mini">新增收货地址</el-button>
        <span class="addrss_tip">您已创建2 个收货地址，最多可创建20个</span>
        <address-list></address-list>
        <edit-address v-if="isEditAddress"></edit-address>
    </div>
</template>

<script>
import addressList from './personalCenter_addresslist'
import editAddress from './personalCenter_editAddress'

export default {
    components: {
        addressList,
        editAddress
    },
    data() {
        return {
            isEditAddress: false
        }
    }
}
</script>

<style lang="scss">
    .personalCenter_address{
        float: right;
        width: 52vw;
        min-width: 676px;
        // background-color: #fff;
        padding-top: 10px;
        margin-bottom: 20px;
        text-align: left;
        .address_title{
            background-color: #fff;
            height: 40px;
            line-height: 40px;
            padding-left: 20px;
            margin-bottom: 10px;
        }
        .addrss_tip{
            font-size: 12px;
            padding-left: 20px;
            color: #666;
        }
    }
</style>