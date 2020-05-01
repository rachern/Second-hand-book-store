<template>
    <div class="personalCenter_address">
        <div class="address_title"><h4>收货地址</h4></div>
        <el-button type="primary" round size="mini" @click="addAddress">新增收货地址</el-button>
        <span class="addrss_tip">您已创建{{addressCount}} 个收货地址，最多可创建20个</span>
        <address-list @changeAddress="changeAddress"></address-list>
        <edit-address v-if="isEditAddress" 
                      @close="close" 
                      :request="request"
                      :willChangeAddressId="willChangeAddressId"></edit-address>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import addressList from './personalCenter_addresslist'
import editAddress from './personalCenter_editAddress'

export default {
    components: {
        addressList,
        editAddress
    },
    data() {
        return {
            isEditAddress: false,
            request: '',
            addressCount: 0,
            willChangeAddressId: ''
        }
    },
    watch: {
        addressList(newValue) {
            this.addressCount = newValue.length
        }
    },
    computed: {
        ...mapGetters([
            'addressList'
        ])
    },
    methods: {
        addAddress() {
            if(this.addressCount >= 20) {
                this.$message({
                    message: '最多只能创建20个地址',
                    type: 'warning'
                })
            } else {
                this.isEditAddress = true
                this.request = 'addAddress'
            }
        },
        changeAddress(id) {
            this.isEditAddress = true
            this.request = 'changeAddress'
            this.willChangeAddressId = id
        },
        close() {
            this.isEditAddress = false
            this.$store.dispatch('address/getAddress')
        }
    },
    created() {
        this.$store.dispatch('address/getAddress')
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