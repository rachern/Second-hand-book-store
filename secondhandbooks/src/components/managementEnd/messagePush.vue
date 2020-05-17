<template>
    <div class="message-push">
        <div class="title" id="message-push-title"><h4>消息推送</h4></div>
        <div class="message-push-wrap">
            <div class="form-wrap">
                <el-form ref="messageForm" :model="messageForm" :rules="messageRule" label-width="160px">
                    <el-form-item label="选择消息要推送的用户">
                        <el-select
                            v-model="messageForm.selectedUsers"
                            filterable
                            multiple
                            default-first-option
                            placeholder="请选择消息要推送的用户,不选推送至所有用户">
                            <el-option
                                v-for="item in users"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="消息标题" prop="title">
                        <el-input v-model="messageForm.title"
                                  placeholder="请输入消息标题"></el-input>
                    </el-form-item>
                    <el-form-item label="消息内容" prop="content">
                        <el-input
                            type="textarea"
                            :autosize="{ minRows: 6, maxRows: 8}"
                            placeholder="请输入消息内容"
                            v-model="messageForm.content">
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
    sockets: {
        connect(){
            console.log('socket connected')
        },
        'accept message'(data) {
            console.log(data)
        }
    },
    data() {
        const validateTitle = (rule, value, callback) => {
            if (!value || value.length === 0) {
                callback(new Error('标题不能为空'))
            } else {
                callback()
            }
        }

        const validateContent = (rule, value, callback) => {
            if (!value || value.length === 0) {
                callback(new Error('内容不能为空'))
            } else {
                callback()
            }
        }

        return {
            messageForm: {
                selectedUsers: [],
                title: '',
                content: ''
            },
            messageRule: {
                title: [{ validator: validateTitle, trigger: 'blur' }],
                content: [{ validator: validateContent, trigger: 'blur' }]
            },
            users: []
        }
    },
    methods: {
        onSubmit() {
            this.$refs.messageForm.validate(valid => {
                if(valid) {
                    console.log(22222)
                    this.$socket.emit('send systemMessage', this.messageForm)
                    this.$message.success('发送成功')
                    this.$refs['messageForm'].resetFields();
                    this.messageForm.selectedUsers = []
                } else {
                    return false
                }
            })
        },
        cancel() {
            this.$refs['messageForm'].resetFields();
            this.messageForm.selectedUsers = []
        }
    },
    created() {
        this.$store.dispatch('user/getAllUsers').then(res => {
            res.forEach(user => {
                this.users.push({value:user.username , label:user.username})
            })
        })
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