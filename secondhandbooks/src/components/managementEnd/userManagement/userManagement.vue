<template>
    <div class="user-management">
        <div class="title" id="user-management-title"><h4>用户列表</h4></div>
        <div class="table-wrap">
            <el-table
                :data="userDatas"
                border
                stripe
                style="width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="用户名">
                                <span>{{ props.row.username }}</span>
                            </el-form-item>
                            <el-form-item label="用户编号">
                                <span>{{ props.row._id }}</span>
                            </el-form-item>
                            <el-form-item label="用户邮箱">
                                <span>{{ props.row.email }}</span>
                            </el-form-item>
                            <el-form-item label="手机号码">
                                <span>{{ props.row.phoneNumber }}</span>
                            </el-form-item>
                            <el-form-item label="性别">
                                <span>{{ props.row.sex }}</span>
                            </el-form-item>
                            <el-form-item label="用户权限">
                                <span>{{ props.row.roles }}</span>
                            </el-form-item>
                            <el-form-item label="用户介绍">
                                <span>{{ props.row.introduction }}</span>
                            </el-form-item>
                            <el-form-item label="用户头像">
                                <el-avatar :size="60" :src="props.row.url"></el-avatar>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="_id"
                    label="用户编号"
                    width="220">
                </el-table-column>
                <el-table-column
                    prop="username"
                    label="用户名"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="sex"
                    label="用户性别"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="roles"
                    label="用户权限">
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作"
                    width="180">
                <template slot-scope="scope">
                    <el-button type="text" size="small">重置密码</el-button>
                    <el-button type="text" size="small">删除</el-button>
                    <el-button @click="handleClick(scope.row)" type="text" size="small">权限编辑</el-button>
                </template>
                </el-table-column>
            </el-table>
            <pagination :pageSize="pageSize"></pagination>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import pagination from '@/components/classification/classification_pagination'

export default {
    components: {
        pagination
    },
    data() {
        return {
            tableData: [{
                id: '12987122',
                name: '好滋好味鸡蛋仔',
                category: '江浙小吃、小吃零食',
                desc: '荷兰优质淡奶，奶香浓而不腻',
                address: '上海市普陀区真北路',
                shop: '王小虎夫妻店',
                shopId: '10333'
            }, {
                id: '12987123',
                name: '好滋好味鸡蛋仔',
                category: '江浙小吃、小吃零食',
                desc: '荷兰优质淡奶，奶香浓而不腻',
                address: '上海市普陀区真北路',
                shop: '王小虎夫妻店',
                shopId: '10333'
            }, {
                id: '12987125',
                name: '好滋好味鸡蛋仔',
                category: '江浙小吃、小吃零食',
                desc: '荷兰优质淡奶，奶香浓而不腻',
                address: '上海市普陀区真北路',
                shop: '王小虎夫妻店',
                shopId: '10333'
            }, {
                id: '12987126',
                name: '好滋好味鸡蛋仔',
                category: '江浙小吃、小吃零食',
                desc: '荷兰优质淡奶，奶香浓而不腻',
                address: '上海市普陀区真北路',
                shop: '王小虎夫妻店',
                shopId: '10333'
            }],
            pageSize: 15,
            userDatas: []
        }
    },
    methods: {
        handleClick(row) {
            console.log(row);
        }
    },
    watch: {
        userList(userList) {
            let user_list = userList.map(user => {
                return {
                    _id: user._id,
                    email: user.email,
                    introduction: user.introduction,
                    phoneNumber: user.phoneNumber,
                    roles: user.roles.join(','),
                    sex: user.sex === 0 ? '男' : '女',
                    url: user.url,
                    username: user.username
                }
            })
            this.userDatas = user_list
        }
    },
    computed: {
        ...mapGetters([
            'userList'
        ])
    },
    created() {
        this.$store.dispatch('user/getUsers', { limit: this.pageSize })
    }
}
</script>

<style lang="scss">
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
    .user-management{
        .el-button--text:hover{
            color: #409eff;
        }
        padding-top: 20px;
        .title{
            text-align: left;
            margin: 0 auto;
            width: 80vw;
            min-width: 1040px;
            background-color: #dad7d7;
            border: 1px solid #eee;
            padding: 10px 20px;
        }
        .table-wrap{
            margin: 20px auto;
            width: 70vw;
            min-width: 910px;
            font-size: 20px;
        }
    }
</style>