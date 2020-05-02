<template>
    <div class="message-push">
        <div class="title" id="message-push-title"><h4>消息推送</h4></div>
        <div class="message-push-wrap">
            <div class="form-wrap">
                <el-form ref="addClassificationForm" :model="addClassificationForm" label-width="160px" :rules="addClassificationRules">
                    <el-form-item label="选择消息要推送的用户">
                        <el-select
                            v-model="addClassificationForm.level_1"
                            filterable
                            allow-create
                            default-first-option
                            placeholder="请选择消息要推送的用户">
                            <el-option
                                v-for="item in level_1s"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="消息标题">
                        <el-input v-model="addClassificationForm.level_2"
                                  placeholder="请输入消息标题"></el-input>
                    </el-form-item>
                    <el-form-item label="消息内容">
                        <el-input
                            type="textarea"
                            :autosize="{ minRows: 4, maxRows: 6}"
                            placeholder="请输入消息内容"
                            v-model="textarea2">
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">确定推送</el-button>
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
            textarea2: ''
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
    .message-push{
        .el-form-item:not(:last-child){
            margin-bottom: 20px;
        }
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
        .message-push-wrap{
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