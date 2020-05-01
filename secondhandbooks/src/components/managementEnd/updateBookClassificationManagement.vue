<template>
    <div class="update-book-classification-management">
        <div class="title" id="add-classification-title"><h4>修改书籍分类</h4></div>
        <div class="editClassification">
            <div class="form-wrap">
                <el-form ref="addClassificationForm" :model="addClassificationForm" label-width="100px" :rules="addClassificationRules" :inline="true">
                    <el-form-item label="一级分类">
                        <el-select
                            v-model="addClassificationForm.level_1"
                            filterable
                            default-first-option
                            placeholder="请选择要修改的一级分类">
                            <el-option
                                v-for="item in level_1s"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="二级分类">
                        <el-select
                            v-model="addClassificationForm.level_2"
                            filterable
                            default-first-option
                            placeholder="请选择要修改的二级分类">
                            <el-option
                                v-for="item in level_2s"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <el-form ref="addClassificationForm" :model="addClassificationForm" label-width="100px" :rules="addClassificationRules" :inline="true">
                    <el-form-item label="一级分类">
                        <el-input v-model="addClassificationForm.level_2"
                                  placeholder="修改后的一级分类名称"></el-input>
                    </el-form-item>
                    <el-form-item label="二级分类">
                        <el-input v-model="addClassificationForm.level_2"
                                  placeholder="修改后的二级分类名称"></el-input>
                    </el-form-item>
                </el-form>
                <el-form>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">确定修改</el-button>
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
            addClassificationForm: {},
            addClassificationRules: {},
            level_1s: [{
                    value: 'HTML',
                    label: 'HTML'
                }, {
                    value: 'CSS',
                    label: 'CSS'
                }, {
                    value: 'JavaScript',
                    label: 'JavaScript'
            }],
            level_2s: [{
                    value: 'HTML',
                    label: 'HTML'
                }, {
                    value: 'CSS',
                    label: 'CSS'
                }, {
                    value: 'JavaScript',
                    label: 'JavaScript'
            }]
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
    .update-book-classification-management{
        .el-form-item:not(:last-child){
            margin-bottom: 60px;
        }
        .el-select{
            width: 100%;
        }
        // height: 644px;
        // background-color: pink;
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
        .editClassification{
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
                width: 80%;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
            }
        }
    }
</style>