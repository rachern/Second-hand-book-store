<template>
    <div class="update-roles">
        <div class="title" id="update-roles-title"><h4>修改用户权限</h4></div>
        <div class="editRoles">
            <div class="form-wrap">
                <el-form ref="updateRolesForm" :model="updateRolesForm" label-width="100px" :rules="updateRolesRules">
                    <el-form-item label="用户权限" prop="roles">
                        <el-select
                            v-model="updateRolesForm.roles"
                            filterable
                            allow-create
                            default-first-option
                            placeholder="请选择用户权限">
                            <el-option
                                v-for="item in level_1s"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">确定</el-button>
                        <el-button @click="cancel">取消</el-button>
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
                roles: []
            },
            level_1s: []
        }
    },
    methods: {
        onSubmit() {

        },
        cancel() {

        }
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
        }
    }
</style>