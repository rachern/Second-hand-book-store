<template>
    <div class="update-book-classification-management">
        <div class="title" id="add-classification-title"><h4>修改书籍分类</h4></div>
        <div class="editClassification">
            <div class="form-wrap">
                <el-form ref="updateClassificationForm" :model="updateClassificationForm" label-width="100px" :rules="updateClassificationRules" :inline="true">
                    <el-form-item label="一级分类" prop="level_1">
                        <el-select
                            v-model="updateClassificationForm.level_1"
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
                    <el-form-item label="二级分类" prop="level_2">
                        <el-select
                            v-model="updateClassificationForm.level_2"
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
                <el-form ref="updateClassificationForm2" :model="updateClassificationForm2" label-width="100px" :rules="updateClassificationRules2" :inline="true">
                    <el-form-item label="一级分类" prop="level_1">
                        <el-input v-model="updateClassificationForm2.level_1"
                                  placeholder="修改后的一级分类名称"></el-input>
                    </el-form-item>
                    <el-form-item label="二级分类" prop="level_2">
                        <el-input v-model="updateClassificationForm2.level_2"
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
import { mapGetters } from 'vuex'

export default {
    data() {
        let validateFormLevel1 = (rule,value,callback) => {
            if(!value || value.length === 0) {
                callback(new Error('一级分类不能为空'))
            } else {
                callback()
            }
        }

        let validateForm2Level1 = (rule,value,callback) => {
            if(!value || value.length === 0) {
                callback(new Error('一级分类不能为空'))
            } else {
                callback()
            }
        }

        // 如果选择了二级分类，那么二级分类必填
        let validateForm2Level2 = (rule,value,callback) => {
            if(this.updateClassificationForm.level_2) {
                if(!value || value.length === 0) {
                    callback(new Error('二级分类不能为空'))
                } else {
                    callback()
                }
            } else {
                callback()
            }
        }

        return {
            updateClassificationForm: {
                level_1: '',
                level_2: ''
            },
            updateClassificationRules: {
                level_1: [{ validator: validateFormLevel1, trigger: 'blur' }]
            },
            updateClassificationForm2: {
                level_1: '',
                level_2: ''
            },
            updateClassificationRules2: {
                level_1: [{ validator: validateForm2Level1, trigger: 'blur' }],
                level_2: [{ validator: validateForm2Level2, trigger: 'blur' }]
            },
            level_1s: [],
            level_2s: []
        }
    },
    methods: {
        onSubmit() {
            this.$refs['updateClassificationForm'].validate(valid => {
                if(valid) {
                    this.$refs['updateClassificationForm2'].validate(valid => {
                        if(valid) {
                            // const _this = this
                            this.$store.dispatch('booktype/updateBookType', { updateClassificationForm:this.updateClassificationForm, updateClassificationForm2:this.updateClassificationForm2 }).then(res => {
                                this.$refs['updateClassificationForm'].resetFields();
                                this.$refs['updateClassificationForm2'].resetFields();
                                this.level_1s = [];
                                this.level_2s = [];
                                this.$store.dispatch('booktype/getBookType')
                                this.$message.success(res);
                            })
                        } else {
                            return false
                        }
                    })
                } else {
                    return false
                }
            })
        },
        cancel() {
            this.$refs['updateClassificationForm'].resetFields()
            this.$refs['updateClassificationForm2'].resetFields()
            this.level_2s = [];
        }
    },
    watch: {
        booktypes(newValue) {
            this.classification = newValue;
            newValue.forEach(booktype => {
                this.level_1s.push({value:booktype.level_1,label:booktype.level_1})
            })
        },
        'updateClassificationForm.level_1': {
            handler: function(level1) {
                this.classification.forEach(booktype => {
                    if(booktype.level_1 === level1) {
                        booktype.level_2.forEach(level2 => {
                            this.level_2s.push({label:level2.level_2, value:level2.level_2})
                        })
                        return
                    }
                })
            }
        }
    },
    computed: {
        ...mapGetters([
            'booktypes'
        ])
    },
    created() {
        this.$store.dispatch('booktype/getBookType')
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