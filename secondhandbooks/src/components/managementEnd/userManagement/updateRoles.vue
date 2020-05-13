<template>
    <div class="update-roles">
        <div class="title" id="update-roles-title"><h4>修改用户权限</h4></div>
        <div class="editRoles">
            <div class="form-wrap">
                <el-form ref="updateRolesForm" :model="updateRolesForm" label-width="100px">
                    <el-form-item label="用户权限" prop="roles">
                        <el-select
                            v-model="updateRolesForm.selectedRoles"
                            multiple
                            placeholder="请选择用户权限">
                            <el-option
                                v-for="item in roles"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="btn">
                        <el-button type="primary" @click="onSubmit">确定</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            updateRolesForm: {
                selectedRoles: []
            },
            roles: []
        }
    },
    methods: {
        onSubmit() {
            this.$store.dispatch('user/updateUserRolesById', {roles: this.updateRolesForm.selectedRoles, id: this.$route.params.id}).then(res => {
                this.$message.success('用户权限修改成功')
                this.$router.push({path: '/ManagementEnd/userManagement'})
            })
        }
    },
    watch: {
        'updateRolesForm.selectedRoles': {
            handler: function(roles) {
                if(roles.indexOf('user') === -1) {
                    this.$message.warning('用户是基本角色，不可删除')
                    this.updateRolesForm.selectedRoles.push('user')
                }
            }
        }
    },
    created() {
        const { id } = this.$route.params
        this.$store.dispatch('user/getUserRolesById', id).then(res => {
            this.updateRolesForm.selectedRoles = res.roles
        })
        this.$store.dispatch('role/getRoles').then(res => {
            let roles = []
            res.forEach(element => {
                if(element.role !== 'superAdmin') {
                    roles.push({value:element.role, label:element.roleName})
                }
            })
            this.roles = roles
        })
    }
}
</script>

<style lang="scss">
    .update-roles{
        .el-select{
            width: 100%;
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
        .editRoles{
            width: 70vw;
            min-width: 910px;
            margin: 0 auto;
            margin-top: 50px;
            height: 60vh;
            background-color: rgba(255,255,255,.3);
            box-shadow: 0px 0px 5px 10px rgba(141, 140, 140, 0.6);
            border-radius: 10px;
            padding: 0 20px;
            position: relative;
            .form-wrap{
                width: 60%;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
            }
            .btn{
                margin-top: 100px;
            }
        }
    }
</style>