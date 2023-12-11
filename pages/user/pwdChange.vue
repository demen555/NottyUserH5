<template>
  <div class="pwdChange">
    <HeaderTop @refresh="onRefresh"></HeaderTop>
    <Nav :title="$t('str_change_pwd')" text></Nav>
    <div class="set-name">
        <div class="user-line"></div>
        <div class="user-lable">
            <span class="lable">{{ $t('str_original_pwd') }} </span>
            <input 
                @blur="validatorPassword1"
                v-model="form.oldPassword" 
                class="input" 
                :placeholder="$t('str_input_original_pwd')" 
                type="text">
        </div>
        <div class="error-msg" v-show="oldPassword.showError">{{ oldPassword.errorMsg }}</div>

        <div class="user-lable">
            <span class="lable">{{ $t('str_new_pwd') }}</span>
            <input
                @blur="validatorPassword"
                v-model="form.newPassword" 
                class="input" 
                :placeholder="$t('str_new_pwd')" 
                type="text">
        </div>
        <div class="error-msg" v-show="newPassword.showError">{{ newPassword.errorMsg }}</div>
        <div class="user-lable">
            <span class="lable">{{ $t('str_confirm_pwd') }}</span>
            <input 
                @blur="validatorPassword2"
                v-model="form.newPassword1" 
                class="input" 
                :placeholder="$t('str_input_new_pwd_again1')" 
                type="text">
        </div>
        <div class="error-msg" v-show="newPassword1.showError">{{ newPassword1.errorMsg }}</div>
        <div class="user-btn-submit" @click="onClickRight">
            {{ $t('str_save') }}
            <van-loading class="user-icon" type="spinner" v-show="showLoading" />
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
                    }else{
                        // this.$toast.fail(res.message);
                    }
                }).finally( res => {
                    this.showLoading = false;
                })
            }

        }
    }
}
</script>
<style src="~/static/less/user.less" lang="less" scoped></style>
<style lang="less" scoped>
.pwdChange{
    margin-top: 88px;
    .error-msg{
        color: #EA3D32;
        font-size: 12px;
        padding: 0 12px;
    }
}
</style>
