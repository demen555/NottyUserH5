<template>
  <div class="pwdForgot">
    <HeaderTop @refresh="onRefresh"></HeaderTop>
    <h1 class="title"> {{ $t('str_get_back_pwd') }} </h1>
    <div class="pwd-Forgot">

        <div class="user-lable">
            <img class="img" :src="themeChecked ? require('~/static/images/login_mima_1.svg'): require('~/static/images/login_mima.svg')">
            <label for="password">
            <input 
                @blur="validatorPassword"
                v-model="form.password" 
                class="input"
                id="password"
                :placeholder="$t('str_input_new_pwd')" 
                type="text">
            </label>
        </div>
        <div class="error-msg" v-show="password.showError">{{ password.errorMsg }}</div>

        <div class="user-lable">
            <img class="img" :src="themeChecked ? require('~/static/images/login_mima_1.svg'): require('~/static/images/login_mima.svg')">
            <label for="password1">
            <input 
                @blur="validatorPassword1"
                v-model="form.password1"
                class="input"
                id="password1"
                :placeholder="$t('str_input_new_pwd_again')" 
                type="text">
            </label>
        </div>
        <div class="error-msg" v-show="password1.showError">{{ password1.errorMsg }}</div>

        <div class="user-btn-submit" @click="onClickRight">
            {{ $t('str_get_back') }}
            <van-loading class="user-icon" type="spinner" v-show="showLoading" />
        </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex"
import userMinxin from '~/plugins/mixins/user'
import commonMinxin from '~/plugins/mixins/common'
import {  getQueryString } from '@/utils/format.js';
import CODES from "~/plugins/enums/codes"


export default {
    name: 'user-pwdForgot',
    mixins: [userMinxin, commonMinxin],
    data(){
        return {
            form: {
                password: "",
                password1: "",
            },
            showLoading: false,

            password: {
                showError: false,
                errorMsg: ''
            },

            password1: {
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
       
        validatorPassword(){
            let reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/;
            if(!reg.test(this.form.password)){
                this.password.showError = true
                this.password.errorMsg = this.$t('str_validator_pwd')
            } else {
                this.password.showError = false
                this.password.errorMsg = ''
            }
        },

        validatorPassword1(){
            let reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/;
            if(!reg.test(this.form.password1)){
                this.password1.showError = true
                this.password1.errorMsg = this.$t('str_validator_pwd')
            } else {
                this.password1.showError = false
                this.password1.errorMsg = ''
            }
        },

        onRefresh(){
          console.log('onRefresh')
        },

        onClickRight(){
            const { password, password1 } = this.form;
            if( this.showLoading ){ // 避免接口慢重复提交
                return;
            }

        if(this.password.showError || this.password1.showError) {
            this.password.showError && this.validatorPassword()
            this.password1.showError && this.validatorPassword1()
        }else{
            if( password !== password1 ){
                return this.$toast(this.$t('toast14')) 
            }

            this.showLoading = true;
            this.$userApi.requestEmailVerify({
              hash: getQueryString('hash'),
              password: password,
            }).then( res => {
                if(res.code === CODES.SUCCESS){
                    this.$toast.success(this.$t('toast16'));
                    this.$router.push(this.localePath('home'))
                }
                // else{
                //     this.$toast(res.message)
                // }
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
.pwdForgot{
    padding: 0 32px;
    .pwd-Forgot{
        margin-top: 24px;
    }
    .user-btn-submit{
        position: inherit;
        transform: translateX(0);
        margin: 0 auto;
        width: 100%;
        margin-top: 42px;
    }
    .title{
        color: var(--ffffff, #FFF);
        font-family: PingFang SC;
        font-size: 20px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        margin-top: 88px;
    }
    .title_sub{
        color: var(--ffffff-70, rgba(255, 255, 255, 0.70));
        font-family: PingFang SC;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        margin-top: 12px;
    }
    .user-lable{
        padding: 0 8px;
        display: flex;
        align-items: center;
        flex-direction: row;
        border-radius: 8px;
        border: 1px solid var(--border-line, rgba(245, 245, 247, 0.06));
        background: var(--bg-color2, rgba(255, 255, 255, 0.06));


        .img{
            width: 24px;
            height: 24px;
        }
        .input{
           flex: 1;
           border: none;
           background: transparent;
        }
    }
    .user-line{
        margin-top: 4px;
        font-size: 12px;
        color: var(--text-color2,  rgba(255, 255, 255, 0.70));
    }
}
</style>