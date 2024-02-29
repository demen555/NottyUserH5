<template>
  <div class="pwdChange">
    <h1 class="h1"> {{ $t('str_change_pwd') }} </h1>
    <div class="set-name">
        <div class="user-lable">
            <img class="img" :src="require('~/static/images/login_mima_1.svg')">
            <label for="oldPassword">
                <input 
                    @blur="validatorPassword1"
                    v-model="form.oldPassword" 
                    class="input"
                    id="oldPassword"
                    :placeholder="$t('str_input_original_pwd')" 
                    type="text">
            </label>
        </div>
        <div class="error-msg" >
           <span v-show="oldPassword.showError">  {{ oldPassword.errorMsg }} </span>
        </div>

        <div class="user-lable">
            <img class="img" :src="require('~/static/images/login_mima_1.svg')">
            <label for="newPassword">
                <input
                    @blur="validatorPassword"
                    v-model="form.newPassword" 
                    class="input"
                    id="newPassword"
                    :placeholder="$t('str_new_pwd')" 
                    type="text">
            </label>
        </div>
        <div class="error-msg" >
           <span v-show="newPassword.showError">  {{ newPassword.errorMsg }} </span>
        </div>
        <div class="user-lable">
            <img class="img" :src="require('~/static/images/login_mima_1.svg')">
            <label for="newPassword1">
                <input 
                    @blur="validatorPassword2"
                    v-model="form.newPassword1" 
                    class="input"
                    id="newPassword1"
                    :placeholder="$t('str_input_new_pwd_again1')" 
                    type="text">
            </label>
        </div>
        <div class="error-msg" >
           <span v-show="newPassword1.showError">  {{ newPassword1.errorMsg }} </span>
        </div>
        <div class="user-btns">
            <div class="user-btn-cancel" @click="cancel">
                {{ $t('str_cancel') }}
            </div>
            <div class="user-btn-submit" @click="onClickRight">
                {{ $t('str_save') }}
                <van-loading class="user-icon" type="spinner" v-show="showLoading" />
            </div>
        </div>

    </div>
  </div>
</template>
<script>

import { mapGetters } from "vuex"
import userMinxin from '~/plugins/mixins/user'
import commonMinxin from '~/plugins/mixins/common'
import CODES from "~/plugins/enums/codes"


export default {
    name: 'user-pwdChange',
    mixins: [userMinxin, commonMinxin],
    data(){
        return {
            form: {
                newPassword: "",
                oldPassword: "",
                newPassword1: ""
            },
            showLoading: false,
            newPassword: {
                showError: false,
                errorMsg: ''
            },
            newPassword1: {
                showError: false,
                errorMsg: ''
            },
            oldPassword: {
                showError: false,
                errorMsg: ''
            }
        }
    },
    computed:{
        ...mapGetters([
            "userinfo"
        ])
    },
    methods:{
        onClickLeft(){
            this.$router.go(-1);
        },
        validatorPassword(){
            let reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/;
            if(!reg.test(this.form.newPassword)){
                this.newPassword.showError = true
                this.newPassword.errorMsg = this.$t('str_validator_pwd')
            } else {
                this.newPassword.showError = false
                this.newPassword.errorMsg = ''
            }
        },
        validatorPassword1(){
            let reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/;
            if(!reg.test(this.form.oldPassword)){
                this.oldPassword.showError = true
                this.oldPassword.errorMsg = this.$t('str_validator_pwd')
            } else {
                this.oldPassword.showError = false
                this.oldPassword.errorMsg = ''
            }
        },
        validatorPassword2(){
            let reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/;
            if(!reg.test(this.form.newPassword1)){
                this.newPassword1.showError = true
                this.newPassword1.errorMsg = this.$t('str_validator_pwd')
            } else {
                this.newPassword1.showError = false
                this.newPassword1.errorMsg = ''
            }
        },

        onRefresh(){
          console.log('onRefresh')
        },

        cancel(){
            this.$emit('cancel')
        },
        onClickRight(){
            const { newPassword, oldPassword, newPassword1 } = this.form;
            if(  this.showLoading ){ 
                return
            }
            if(this.newPassword.showError || this.oldPassword.showError || this.newPassword1.showError ) {
                this.newPassword.showError && this.validatorPassword()
                this.oldPassword.showError && this.validatorPassword1()
                this.newPassword1.showError && this.validatorPassword2()
            }else{
                if( this.userinfo.userName ==  newPassword ){
                    return this.$toast(this.$t('str_validator_pwd_same'))
                }
                if( newPassword == oldPassword ){
                    return this.$toast(this.$t('toast13'))
                }
                if( newPassword != newPassword1 ){
                    return this.$toast(this.$t('toast14'))
                }
                
                this.showLoading = true;
                console.log({
                    newPassword: this.form.newPassword,
                    oldPassword: this.form.oldPassword
                })
                this.$userApi.requestSetpassword({
                  newPassword: newPassword,
                  oldPassword: oldPassword
                }).then( res => {
                    console.log(res)
                    if(res.code === CODES.SUCCESS){
                        this.$toast.success(this.$t('toast16'));
                        this.onClickLeft();
                        this.showLoading = false;
                        this.cancel()
                    }
                }).finally( res => {
                    
                })
            }

        }
    }
}
</script>
<style src="~/static/less/user.less" lang="less" scoped></style>
<style lang="less" scoped>
.pwdChange{
    padding: 16px;
    .h1{
        font-size: 16px;
        color: rgba(246, 214, 88, 1);
        text-align: center;
        margin-bottom: 24px;
    }
    .error-msg{
        color: #EA3D32;
        font-size: 12px;
        padding: 0 12px;
        height: 12px;
    }
    .user-lable{
        padding: 0;
    }
    .user-btns{
        display: flex;
        justify-content: space-between;
        position: absolute;
        bottom: 12px;
        left: 12px;
        right: 12px;
        .user-btn-cancel, .user-btn-submit{
            position: static;
            width: 148px;
            height: 40px;
            border-radius: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            transform: translateX(0);
        }
        .user-btn-cancel{
            background: rgba(255, 255, 255, 0.1);
            color: rgba(255, 255, 255, 0.7);
        }
    }
    .user-lable{
        width: 100%;
        margin-top: 2px;
        background: rgba(255, 255, 255, 0.06);
        border-radius: 8px;
        border: 1px solid rgba(245, 245, 247, 0.06);
        padding: 8px;
        display: flex;
        justify-content: center;
        flex-direction: row;
        label{
            flex: 1;
        }
        .input{
            border: none;
            background: transparent;
            height: 100%;
        }
        .img{
            width: 24px;
            height: 24px;
        }
    }
}
</style>
