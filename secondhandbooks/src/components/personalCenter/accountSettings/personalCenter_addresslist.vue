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
                    <span class="pointer" @click="change(scope)">修改</span>  |  
                    <span class="pointer" @click="del(scope)">删除</span>
                </template>
            </el-table-column>
            <el-table-column 
                label=""
                width="100">
                <template slot-scope="scope">
                    <el-button type="warning" plain v-if="scope.row.state === 0" size="mini" disabled>默认地址</el-button>
                    <span class="pointer" v-else>设为默认</span>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            addressData: [
                {
                    name: '王小虎',
                    area: '广东省揭阳市揭西县棉湖镇',
                    address: '海大路1号广东海洋大学',
                    phone: '15768126292',
                    state: 0
                },
                {
                    name: '王小虎',
                    area: '广东省揭阳市揭西县棉湖镇',
                    address: '海大路1号广东海洋大学',
                    phone: '15768126292',
                    state: 1
                },
                {
                    name: '王小虎',
                    area: '广东省揭阳市揭西县棉湖镇',
                    address: '海大路1号广东海洋大学',
                    phone: '15768126292',
                    state: 1
                },
                {
                    name: '王小虎',
                    area: '广东省揭阳市揭西县棉湖镇',
                    address: '海大路1号广东海洋大学',
                    phone: '15768126292',
                    state: 1
                },
                {
                    name: '王小虎',
                    area: '广东省揭阳市揭西县棉湖镇',
                    address: '海大路1号广东海洋大学',
                    phone: '15768126292',
                    state: 1
                },
                {
                    name: '王小虎',
                    area: '广东省揭阳市揭西县棉湖镇',
                    address: '海大路1号广东海洋大学',
                    phone: '15768126292',
                    state: 1
                },
                {
                    name: '王小虎',
                    area: '广东省揭阳市揭西县棉湖镇',
                    address: '海大路1号广东海洋大学',
                    phone: '15768126292',
                    state: 1
                }
            ]
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