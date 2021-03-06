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
                    <el-button type="text" size="small" @click="resetPassword(scope.row)">重置密码</el-button>
                    <el-button type="text" size="small" @click="removeUser(scope.row)">删除</el-button>
                    <el-button type="text" size="small" @click="editRoles(scope.row)">修改权限</el-button>
                </template>
                </el-table-column>
            </el-table>
            <pagination :pageSize="pageSize"></pagination>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { MessageBox } from 'element-ui' 
import pagination from '@/components/classification/classification_pagination'

export default {
    components: {
        pagination
    },
    data() {
        return {
            pageSize: 15,
            userDatas: []
        }
    },
    methods: {
        resetPassword(row) {
            MessageBox.confirm(`此操作将重置用户${row.username}的密码`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$store.dispatch('user/resetPassword', row._id).then(res => {
                    this.$message({
                        type: 'success',
                        message: '重置密码成功'
                    });
                })
            })
        },
        removeUser(row) {
            MessageBox.confirm(`此操作将永久删除用户${row.username}`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$store.dispatch('user/removeUser', row._id).then(res => {
                    this.$message({
                        type: 'success',
                        message: '删除用户成功'
                    })
                    this.$store.dispatch('user/getUsers', { limit: this.pageSize })
                })
            })
        },
        editRoles(row) {
            this.$router.push({path: `/ManagementEnd/updateRoles/${row._id}`})
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
                    roles: user.roles.join('， '),
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