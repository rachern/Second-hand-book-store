<template>
    <div class="delete-book-classification-management">
        <div class="title" id="add-classification-title"><h4>删除书籍分类</h4></div>
        <div class="editClassification">
            <div class="form-wrap">
                <el-form ref="deleteClassificationForm" :model="deleteClassificationForm" label-width="100px" :rules="deleteClassificationRules">
                    <el-form-item label="一级分类">
                        <el-select
                            v-model="deleteClassificationForm.level_1"
                            filterable
                            default-first-option
                            placeholder="请选择要删除的一级分类">
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
                            v-model="deleteClassificationForm.level_2"
                            filterable
                            default-first-option
                            placeholder="请选择要删除的二级分类">
                            <el-option
                                v-for="item in level_2s"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">确定删除</el-button>
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
        return {
            deleteClassificationForm: {
                level_1: '',
                level_2: '',
            },
            deleteClassificationRules: {},
            level_1s: [],
            level_2s: [],
            classification: []
        }
    },
    methods: {
        onSubmit() {

        },
        cancel() {

        }
    },
    watch: {
        booktypes(newValue) {
            this.classification = newValue;
            newValue.forEach(booktype => {
                this.level_1s.push({value:booktype.level_1,label:booktype.level_1})
            })
        },
        'deleteClassificationForm.level_1': {
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
    .delete-book-classification-management{
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