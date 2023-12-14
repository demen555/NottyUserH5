<template>
  <div class="sendEmail">
    <HeaderTop @refresh="onRefresh"></HeaderTop>
    <h1 class="title"> {{ $t('str_get_back_pwd') }} </h1>
    <div class="pwd-Forgot">

        
        <div class="user-lable">
            <img :src="themeChecked ? require('~/static/images/login_email_1.svg'): require('~/static/images/login_email.svg')">
            <input 
                @blur="validatorEmail"
                v-model="form.email" 
                class="input" 
                :placeholder="$t('str_email')" 
                type="text">
        </div>
        <div class="error-msg" v-show="email.showError">{{ email.errorMsg }}</div>

        <div class="user-line" v-show="sucEmail">We have sent you an email with your username and a link in order to reset your password</div>

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
import CODES from "~/plugins/enums/codes"


export default {
    mixins: [userMinxin, commonMinxin],
    data(){
        return {
            form: {
                email: "",
            },
            showLoading: false,
            sucEmail: false,
            email: {
                showError: false,
                errorMsg: ''
            },
        }
    },
    computed:{
        ...mapGetters([
            "userinfo"
        ])
    },

    methods:{
        validatorEmail(){
            const myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/; 
            if(!myreg.test(this.form.email)){
                this.email.showError = true
                this.email.errorMsg = this.$t('str_error_email')
            } else {
                this.email.showError = false
                this.email.errorMsg = ''
            }
        },
        onRefresh(){
          console.log('onRefresh')
        },

        onClickRight(){
            const { email } = this.form;
            if( !email ){
                return
            }
            if( this.sucEmail ){
                return
            }
            if( 
                this.showLoading 
            ){
                return 
            }
            if(this.email.showError) {
                this.email.showError && this.validatorEmail()
            } else{
                this.showLoading = true;
                this.$userApi.requestSendEmail({
                  email: email,
                }).then( res => {
                    if(res.code === CODES.SUCCESS){
                        this.sucEmail = true
                        this.$toast.success(this.$t('toast16'));
                    }
                    // else{
                    //     this.$toast.fail(res.message);
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
.sendEmail{
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
        border: 1px solid var(--border-line);
        background: var(--bg-color2);
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
        word-break: break-word;
    }
}
</style>