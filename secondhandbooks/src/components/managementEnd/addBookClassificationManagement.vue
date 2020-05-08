<template>
    <div class="add-book-classification-management">
        <div class="title" id="add-classification-title"><h4>添加书籍分类</h4></div>
        <div class="editClassification">
            <div class="form-wrap">
                <el-form ref="addClassificationForm" :model="addClassificationForm" label-width="100px" :rules="addClassificationRules">
                    <el-form-item label="一级分类" prop="level_1">
                        <el-select
                            v-model="addClassificationForm.level_1"
                            filterable
                            allow-create
                            default-first-option
                            placeholder="请选择或者新建一级分类">
                            <el-option
                                v-for="item in level_1s"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="二级分类" prop="level_2">
                        <el-input v-model="addClassificationForm.level_2"
                                  placeholder="请输入二级分类"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">确定添加</el-button>
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
        let validateLevel1 = (rule,value,callback) => {
            if(!value || value.length === 0) {
                callback(new Error('一级分类不能为空'))
            } else {
                callback()
            }
        }

        let validateLevel2 = (rule,value,callback) => {
            if(!value || value.length === 0) {
                callback(new Error('二级分类不能为空'))
            } else {
                callback()
            }
        }

        return {
            addClassificationForm: {
                level_1: '',
                level_2: ''
            },
            addClassificationRules: {
                level_1: [{ validator: validateLevel1, trigger: 'blur' }],
                level_2: [{ validator: validateLevel2, trigger: 'blur' }]
            },
            level_1s: []
        }
    },
    methods: {
        onSubmit() {
            this.$refs['addClassificationForm'].validate(valid => {
                if(valid) {
                    this.$store.dispatch('booktype/addBookType', this.addClassificationForm).then(res => {
                        this.$refs['addClassificationForm'].resetFields();
                        this.$store.dispatch('booktype/getBookType')
                        this.$message.success('添加成功');
                    })
                } else {
                    return false
                }
            })
        },
        cancel() {
            this.$refs['addClassificationForm'].resetFields();
        }
    },
    watch: {
        booktypes(newValue) {
            newValue.forEach(booktype => {
                this.level_1s.push({value:booktype.level_1,label:booktype.level_1})
            })
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
    .add-book-classification-management{
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
                width: 60%;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
            }
        }
    }
</style>