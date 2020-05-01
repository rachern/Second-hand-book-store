<template>
    <div class="address_list">
        <el-table
            :data="addressData"
            border
            style="width: 100%">
            <el-table-column
                prop="name"
                label="收货人"
                width="95">
            </el-table-column>
            <el-table-column
                prop="area"
                label="所在地区"
                width="110">
            </el-table-column>
            <el-table-column
                prop="address"
                label="详细地址">
            </el-table-column>
            <el-table-column
                prop="phone"
                label="手机号码"
                width="110">
            </el-table-column>
            <el-table-column
                label="操作"
                width="100">
                <template slot-scope="scope">
                    <span class="pointer" @click="changeAddress(scope.row._id)">修改</span>  |  
                    <span class="pointer" @click="delAddress(scope.row._id)">删除</span>
                </template>
            </el-table-column>
            <el-table-column 
                label=""
                width="100">
                <template slot-scope="scope">
                    <el-button type="warning" plain v-if="scope.row.state === 1" size="mini" disabled>默认地址</el-button>
                    <span class="pointer" v-else @click="toggleDefaultAddress(scope.row._id)">设为默认</span>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            addressData: []
        }
    },
    computed: {
        ...mapGetters([
            'addressList'
        ])
    },
    watch: {
        addressList(newValue) {
            let address_list = newValue.map(element => {
                return {
                    _id: element._id,
                    name: element.name,
                    area: element.province.value + element.city.value + element.area.value + element.town.value,
                    address: element.address,
                    phone: element.phone,
                    state: element.state
                }
            })
            let defaultAddress, defaultIndex
            address_list.forEach((element,index) => {
                if(element.state === 1) {
                    defaultAddress = element
                    defaultIndex = index
                }
            })
            address_list.splice(defaultIndex,1)
            address_list.unshift(defaultAddress)
            this.addressData = address_list
        }
    },
    methods: {
        toggleDefaultAddress(id) {
            this.$store.dispatch('address/toggleDefaultAddress', id)
        },
        delAddress(id) {
            this.$store.dispatch('address/deleteAddress', id)
        },
        changeAddress(id) {
            this.$emit('changeAddress', id)
        }
    }
}
</script>

<style lang="scss">
    .address_list{
        margin-top: 20px;
        .el-table{
            font-size: 13px;
        }
        .el-table th{
            background-color: rgb(14, 13, 13);
        }
        .el-table thead{
            color: #d6ae3f;
        }
    }
</style>