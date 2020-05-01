<template>
    <div class="personalCenter_editAddress" :style="{height:clientHeight,width:clientWidth}">
        <div class="editAddress_wrap">
            <div class="icon_wrap" @click="close">
                <i class="el-icon-close"></i>
            </div>
            <div class="editAddress_from">
                <div class="editAddress_title">
                    <h4>{{request === 'addAddress' ? '新增收货地址' : '修改收货地址'}}</h4>
                </div>
                <div class="editAddress_contain">
                    <el-form ref="addressForm" :model="addressForm"
                                        :rules="addressRules"
                                        label-width="120px">
                        <el-form-item label="地址信息">
                            <v-region :town="true" @values="selectLogs" v-model="selected"></v-region>
                        </el-form-item>
                        <el-form-item label="详细地址" prop="address">
                            <el-input v-model="addressForm.address"
                                      placeholder="请输入详细地址信息，如道路、门牌号、小区、楼栋号、单元等信息"></el-input>
                        </el-form-item>
                        <el-form-item label="收货人姓名" prop="name">
                            <el-input v-model="addressForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号码" prop="phone">
                            <el-input v-model="addressForm.phone"></el-input>
                        </el-form-item>
                        <el-form-item label="是否为默认地址" prop="defaultAddress">
                            <el-switch v-model="addressForm.defaultAddress"></el-switch>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">保存</el-button>
                            <el-button @click="reset('addressForm')">重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['request','willChangeAddressId'],
    data() {
         //地址验证
        let validateAddress = (rule,value,callback) => {
            if(!value || value.length === 0){
                callback(new Error('地址不能为空'));
            }else{
                callback();
            }
        }
        //收货人验证
        let validateName = (rule,value,callback) => {
            if(!value || value.length === 0){
                callback(new Error('收货人不能为空'));
            }else{
                callback();
            }
        }
        //手机号验证
        let validatePhone = (rule,value,callback) => {
            if(!value || value.length === 0){
                callback(new Error('手机号不能为空'));
            }else if(!(/^1[34578]\d{9}$/.test(value))){
                callback(new Error('请输入正确的手机号码'));
            }else{
                callback();
            }
        }

        const addressRules = {
            address: [{ validator: validateAddress, trigger: 'blur' }],
            name: [{ validator: validateName, trigger: 'blur' }],
            phone: [{ validator: validatePhone, trigger: 'blur' }]
        }

        if(this.request === 'changeAddress') {
            let address
            this.$store.getters.addressList.forEach(element => {
                if(element._id === this.willChangeAddressId) {
                    address = element
                }
            })
            return {
                selected: {
                    province: address.province.key,
                    city: address.city.key,
                    area: address.area.key,
                    town: address.town.key
                },
                addressForm: {
                    province: address.province.value,
                    city: address.city.value,
                    area: address.area.value,
                    town: address.town.value,
                    address: address.address,
                    name: address.name,
                    phone: address.phone,
                    defaultAddress: address.state === 1 ? true : false
                },
                addressRules,
                address
            }
        } else {
            return {
                selected: {
                    province: '',
                    city: '',
                    area: '',
                    town: ''
                },
                addressForm: {
                    province: null,
                    city: null,
                    area: null,
                    town: null,
                    address: '',
                    name: '',
                    phone: '',
                    defaultAddress: false
                },
                addressRules,
                _id: ''
            }
        }

        
    },
    methods:{
        selectLogs(data) {
            for(let key in data) {
                if(data[key]) {
                    this.addressForm[key] = data[key]
                }
            }
        },
        onSubmit(){
            this.$refs['addressForm'].validate(valid => {
                if (valid) {
                    if(this.request === 'addAddress') {
                        this.$store.dispatch('address/addAddress',this.addressForm)
                            .then(response => {
                                this.$message.success(response.msg)
                                this.$emit('close')
                            })
                    } else {
                        this.$store.dispatch('address/updateAddress', {id: this.address._id, address: this.addressForm})
                            .then(response => {
                                this.$message.success(response.msg)
                                this.$emit('close')
                            })
                    }
                } else {
                    return false
                }
            })
            
        },
        close() {
            this.$refs['addressForm'].resetFields();
            this.$emit('close')
        },
        reset() {
            if(this.address) {
                this.selected = {
                    province: this.address.province.key,
                    city: this.address.city.key,
                    area: this.address.area.key,
                    town: this.address.town.key
                }
                this.addressForm.province = this.address.province.value
                this.addressForm.city = this.address.city.value
                this.addressForm.area = this.address.area.value
                this.addressForm.town = this.address.town.value
            } else {
                this.selected = {
                    province: '',
                    city: '',
                    area: '',
                    town: ''
                }
                this.addressForm.province = null
                this.addressForm.city = null
                this.addressForm.area = null
                this.addressForm.town = null
            }
            this.$refs['addressForm'].resetFields();
        }
    },
    computed: {
        clientHeight() {
            return document.body.clientHeight + 'px'
        },
        clientWidth() {
            return document.body.clientWidth + 'px'
        }
    }
}
</script>

<style lang="scss">
    .personalCenter_editAddress{
        position: fixed;
        background-color: rgba(0,0,0,.5);
        left: 0;
        top: 0;
        .editAddress_wrap{
            width: 60vw;
            height: 452.7px;
            position: fixed;
            left: 20vw;
            top: 20vh;
            background-color: #fff;
            .icon_wrap{
                width: 30px;
                height: 30px;
                float: right;
                background-color: rgba(0,0,0,.8);
                margin-right: 30px;
                margin-top: 20px;
                text-align: center;
                border-radius: 50%;
                &:hover{
                    opacity: 0.8;
                }
                i{
                    color: #fff;
                    font-size: 20px;
                    line-height: 30px;
                }
            }
            .editAddress_from{
                width: 80%;
                margin-top: 50px;
                margin-left: 80px;
                .editAddress_title{
                    background-color: #bebdbd;
                    height: 26px;
                    line-height: 26px;
                    padding-left: 20px;
                    margin-bottom: 10px;
                }
                .editAddress_contain{
                    padding-right: 20px;
                    .el-form-item__content{
                        line-height: 20px;
                    }
                }
            }
        }
    }
</style>