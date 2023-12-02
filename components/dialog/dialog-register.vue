<template>
  <van-popup v-model="show">
    <div class="dialog">
      <div class="dialog-top">
        <div></div>
        <div class="dialog-title">{{ $t('str_reg') }}</div>
        <div class="dialog-close" @click="show = false"><img :src="themeChecked ? require('~/static/images/home_top_guanbi_1.svg'): require('~/static/images/home_top_guanbi.svg')" alt=""></div>
      </div>
      <div class="dialog-form">
        <!-- <div class="error-msg">123</div> -->
        <div class="error-msg" v-show="email.showError">{{ email.errorMsg }}</div>
        <div class="user-center-info-input dialog-input">
          <div class="dialog-img img-zhanghao"><img :src="themeChecked ? require('~/static/images/login_email_1.svg'): require('~/static/images/login_email.svg')" alt=""></div>
          <input @blur="validatorEmail" v-model="form.email" class="user-center-info-btn dialog-btn" :class="!themeChecked && 'white'" :placeholder="$t('str_email')" type="text">
        </div>
        <div class="error-msg" v-show="user.showError">{{ user.errorMsg }}</div>
        <div class="user-center-info-input dialog-input">
          <div class="dialog-img img-zhanghao"><img :src="themeChecked ? require('~/static/images/login_zhanghao_1.svg'): require('~/static/images/login_zhanghao.svg')" alt=""></div>
          <input @blur="validatorUser" v-model="form.username" class="user-center-info-btn dialog-btn" :class="!themeChecked && 'white'" :placeholder="$t('str_num')" type="text">
        </div>
        <div class="error-msg" v-show="pwd.showError">{{ pwd.errorMsg }}</div>
        <div class="user-center-info-input dialog-input">
          <div class="dialog-img img-mima"><img  :src="themeChecked ? require('~/static/images/login_mima_1.svg'): require('~/static/images/login_mima.svg')" alt=""></div>
          <input @blur="validatorPwd" type="password" v-model="form.password" class="user-center-info-btn dialog-btn" :class="!themeChecked && 'white'" :placeholder="$t('str_input_pwd')">
        </div>
        <!-- <div class="user-center-info-input dialog-input">
          <div class="dialog-img img-mima"><img :src="themeChecked ? require('~/static/images/login_mima_1.svg'): require('~/static/images/login_mima.svg')" alt=""></div>
          <input type="password" v-model="form.password1" class="user-center-info-btn dialog-btn" :class="!themeChecked && 'white'" :placeholder="$t('ic_login_pwd_again')">
        </div> -->
        <div class="user-center-info-input input-code">
          <div class="dialog-img img-mima"><img :src="themeChecked ? require('~/static/images/login_yanzhengma_1.svg'): require('~/static/images/login_yanzhengma.svg')"></div>
          <input  v-model="form.code" class="user-center-info-btn dialog-btn" :class="!themeChecked && 'white'" :placeholder="$t('str_input_code')" type="text">
          <div class="user-center-input-code">
            <!-- <img src="~/static/images/code.png" alt=""> -->
            <div class="input-code" @click="initCode">
              <img class="code-img" :src="code" alt="code">
            </div>
          </div>
        </div>
      </div>
      <div class="dialog-btns" @click="handleSubmit">
        {{ $t('str_register') }}
        <van-loading class="user-icon" type="spinner" v-show="showLoading" /></div>
      <div class="dialog-submits">
        <!-- <div @click="show = false">{{ $t('str_back_home') }}</div> -->
        <!-- <div class="dialog-line"></div> -->
        <div @click="handleLogin"> {{ $t('str_login_account1') }}<span class="go-login">{{ $t('str_login_account2') }}</span></div>
      </div>
    </div>
  </van-popup>
</template>
<script>
  import { mapActions } from 'vuex'
  import commonMinxin from '~/plugins/mixins/common'
  export default{
    mixins: [commonMinxin],

    data() {
      return {
        show: false,
        code: '',
        form: {
          email: '',
          username: '',
          password: '',
          code: '',
          key: ''
        },
        showLoading: false,
        email: {
          showError: false,
          errorMsg: ''
        },
        user: {
          showError: false,
          errorMsg: ''
        },
        pwd: {
          showError: false,
          errorMsg: ''
        }
      }
    },
    created(){
      this.initCode()
    },
    methods: {
      ...mapActions(['set_register', 'set_userinfo']),
      handleShow(){
        this.show = true
      },
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
      validatorUser(){
        let reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,10}$/;
        if(!reg.test(this.form.username)){
          this.user.showError = true
          this.user.errorMsg = this.$t('str_validator_username')
        } else {
          this.user.showError = false
          this.user.errorMsg = ''
        }
      },
      validatorPwd(){
        let reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/;
        if(!reg.test(this.form.password)){
          this.pwd.showError = true
          this.pwd.errorMsg = this.$t('str_validator_pwd')
        } else {
          if(this.form.username === this.form.password) {
            this.pwd.showError = true
            this.pwd.errorMsg = this.$t('str_validator_pwd_same')
          } else {
            this.pwd.showError = false
            this.pwd.errorMsg = ''
          }
        }
      },
      async initCode(){
        try {
          const res  = await this.$homeApi.postCode()
          if(res.code === 100){
            this.code = res.data.img
            this.form.key = res.data.key
          }
          console.log(res, '666')
        } catch (error) {
          console.error(error)
        }
      },
      handleLogin(){
        this.$emit('goLogin')
        this.show  = false
      },
      async handleSubmit(){
        try {
          const params = {
            email: this.form.email,
            username: this.form.username,
            password: this.form.password,
            code: this.form.code,
            key: this.form.key
          }
          this.showLoading = true
          if(!this.form.username) return this.$toast( this.$t('toast1') )
          if(!this.form.password) return this.$toast(this.$t('toast2'))
          if(!this.form.code) return this.$toast(this.$t('toast6'))
          if(this.email.showError || this.user.showError || this.pwd.showError) {
            console.log(1111)
            this.email.showError && this.validatorEmail() 
            this.user.showError && this.validatorUser() 
            this.pwd.showError && this.validatorEmail()
          } else {
            const res  = await this.$postEmailRegister(JSON.stringify(params))
            if(res.code === 100){
              this.set_userinfo(res.data)
              this.getUserInfo(res.data)
              this.show = false
              this.form = {
                email: '',
                username: '',
                password: '',
                code: '',
                key: ''
              }
            } else {
              // this.$toast(res.message)
              this.initCode()
            }
          }
        } catch (error) {
          // this.$toast(error.message)
          console.error(error)
        } finally {
          this.showLoading = false
        }
      },
      async getUserInfo(userinfo){
        try {
          const res = await userApi.requestUserinfo()
          if(res.code === 100){
            this.$toast(this.$t('toast4'))
            const user = res.data
            this.set_userinfo({...user, ...userinfo})
            // this.show = false
            this.$router.push({ name: 'home' })
          }
        } catch (error) {
          console.error(error)
        }
      },
      onShow() {
        this.show = true
        this.form = {
          username: '',
          password: '',
          password1: '',
          code: '',
          key: ''
        }
      }
    }
  }
</script>
<style lang="less" scoped>
.van-popup{
  background-color: var(--dialog-bg-color);
  width: 343px;
  height: auto;
  padding: 16px;
  border-radius: 16px;
  overflow: hidden;
}
.error-msg{
  color: #EA3D32;
  font-size: 12px;
}
.go-login{
  color: var(--bg-primary);
  margin-left: 5px;
}
.dialog{
  width: 100%;
  height: 100%;
  .dialog-title{
    font-size: 16px;
    font-weight: 500;
  }
  .user-center-info-input{
    margin-bottom: 8px;
  }
  .user-center-info-btn{
    width: 100%;
    margin: 0 auto;
    background-color: var(--bg-color2);
    font-size: 14px;
    border-radius: 8px;
    height: 40px;
    text-indent: 2em;
    height: 40px;
    color: var(--text-color1);
    border: 1px solid var(--text-color3);
  }
.white{
  color: rgba(96, 105, 128, 0.4);
  border: none;
}
  .dialog-form{
    width: 90%;
    margin: 0 auto;
    margin-top: 18px;
  }
  .dialog-confirm-btns{
    width: 90%;
    margin: 0 auto;
  }
  .dialog-img{
    width: 24px;
    height: 24px;
  }
  .dialog-input{
    position: relative;
  }
  .img-zhanghao{
    position: absolute;
    left: 8px;
    top: 8px
  }
  .dialog-btn{
    text-indent: 2.5em;
  }

  .img-mima{
    position: absolute;
    left: 8px;
    top: 8px
  }
  .dialog-btns{
    width: 90%;
    margin: 0 auto;
    height: 40px;
    border-radius: 20px;
    background-color:var(--bg-primary);
    color: var(--dialog-text-color);
    text-align: center;
    line-height: 40px;
    font-size: 16px;
    margin-top: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
.dialog-btns{
    /deep/.van-loading__spinner{
        width: 12px;
        height: 12px;
        margin-left: 4px;
    }
}
  .dialog-submits{
    width: 80%;
    margin: 0 auto;
    font-size: 14px;
    color: var(--text-color2);
    display: flex;
    justify-content: center;
    margin-top: 16px;
  }
  .dialog-submits a{
    color:var(--text-color2);
  }
}
.dialog-top{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 10px;
}
.dialog-close{
  margin-right: 16px;
}
.dialog-line{
  width: 1px;
  height: 16px;
  background-color: var(--bg-color2);
}
.input-code{
  position: relative;
}
.input-code .code-img {
  width: 68px;
  height: 32px;
}
.user-center-input-code{
  position: absolute;
  right: 8px;
  top: 4px;
  width: 68px;
  height: 32px;
  border-radius: 2px;
  background-color: var(--text-color1);
  display: flex;
  align-items: center;
  justify-content: center;
}
.input-code{
  z-index: 2;
  color: var(--bg-color1);
  letter-spacing: 2px;
}
</style>