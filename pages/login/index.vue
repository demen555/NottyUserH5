<template>
  <div class="login">
    <HeaderTop ></HeaderTop>
    <div class="dialog-top-img d-sm-none">
      <div class="logo-pop" :class="themeChecked? 'logo-black': 'logo-white'"></div>
    </div>
    
    <div class="dialog">
      <div class="dialog-top-img-title">{{ $t('str_no_login') }}</div>
      <div class="dialog-form">
        <div class="error-msg" v-show="email.showError">{{ email.errorMsg }}</div>
        <div class="user-center-info-input dialog-input">
          <div class="dialog-img img-zhanghao"><img :src="themeChecked ? require('~/static/images/login_email_1.svg'): require('~/static/images/login_email.svg')"></div>
          <label for="email">
            <input id="email" @blur="validatorEmail" v-model="form.email" class="user-center-info-btn dialog-btn" :class="!themeChecked && 'white'" :placeholder="$t('str_email')" type="text">
          </label>
        </div>
        <div class="error-msg" v-show="password.showError">{{ password.errorMsg }}</div>
        <div class="user-center-info-input dialog-input">
          <div class="dialog-img img-mima"><img :src="themeChecked ? require('~/static/images/login_mima_1.svg'): require('~/static/images/login_mima.svg')" alt=""></div>
          <label for="password">
            <input @blur="validatorPassword" type="password" v-model="form.password" class="user-center-info-btn dialog-btn" :class="!themeChecked && 'white'" :placeholder="$t('str_input_pwd') +'(' +  $t('str_validator_username') +')'">
          </label>
        </div>
        <div class="user-center-info-input dialog-checkbox">
          <van-checkbox v-model="isLocale"></van-checkbox>
          <div class="dialog-tishi">{{ $t('str_login_tip') }}</div>
        </div>
      </div>
      <div class="dialog-btns" @click.enter="handleSubmit">
        {{ $t('str_login') }}
        <van-loading class="user-icon" type="spinner" v-show="showLoading" />
      </div>
      <div class="dialog-submit-text">
        <div>{{ $t('str_login_text1') }}</div>
        <nuxt-link :to="localePath('register')" class="tip">{{ $t('str_reg_user') }} 55</nuxt-link>
        <div>{{ $t('str_login_text2') }}</div>
        <nuxt-link :to="localePath('user-sendEmail')" class="tip">{{ $t('str_pwd_fog') }}</nuxt-link>
      </div>
      <div class="land_footer">
          <p class="com">  © {{ hostname }}, 2023 </p>
          <img class="rta" :src="themeChecked? require('~/static/images/rat.png'): require('~/static/images/rat-1.png')" alt="rta">
      </div>
    </div>
    <fBottom class="d-none d-sm-block"></fBottom>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import commonMinxin from '~/plugins/mixins/common'
import CODES from "~/plugins/enums/codes"
import HeaderTop from '~/components/header/top.vue'
import fBottom from '~/components/footer/bottom.vue'
export default {
  mixins: [commonMinxin],
  components: {
    HeaderTop,
    fBottom
  },
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      showLoading: false,
      email: {
        showError: false,
        errorMsg: ''
      },
      password: {
        showError: false,
        errorMsg: ''
      },
      isLocale: false,
      hostname: ''
    }
  },
  computed: {
    ...mapGetters(['register'])
  },
  created() {
    if(process.client){
      this.hostname = window.location.hostname
      const user = JSON.parse(localStorage.getItem('user') || '{}')
      this.form.email = user.account
      this.form.password = user.password
    }
    console.log(this.register, 'register')
  },
  watch: {
    register: {
      handler(newVal){
        this.form.email = ''
        this.form.password = ''
      },
      deep: true
    }
  },
  methods: {
    ...mapActions(['set_userinfo','setAccessToken']),
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
    validatorPassword(){
      let reg = /^\S{6,}$/;
      if(!reg.test(this.form.password)){
        this.password.showError = true
        this.password.errorMsg = this.$t('str_validator_pwd')
      } else {
        if(this.form.username === this.form.password) {
          this.password.showError = true
          this.password.errorMsg = this.$t('str_validator_pwd_same')
        } else {
          this.password.showError = false
          this.password.errorMsg = ''
        }
      }
    },

    async handleSubmit() {
      try {
        const params = {
          account: this.form.email,
          password: this.form.password,
        }
        this.showLoading = true
        if(this.email.showError || this.password.showError) {
          this.email.showError && this.validatorEmail()
          this.password.showError && this.validatorPassword()
        } else {
          const res = await this.$homeApi.postEmailLogin(params)
          if (res.code === CODES.SUCCESS) {
            this.setAccessToken(res.data.accessToken)
            this.getUserInfo(res.data)
          } else {
          }
          console.log(res, '666')
        }
      } catch (error) {
        this.$toast(error.message)
        console.error(error)
      } finally {
        this.showLoading = false
      }
    },
    async getUserInfo(info){
      try {
        const res = await this.$userApi.requestUserinfo()
        if(res.code === CODES.SUCCESS){
          const user = res.data
          this.set_userinfo({...user, ...info})
          if (this.isLocale) {
            if(process.client){
              const params = {
                account: this.form.email,
                password: this.form.password,
              }
              localStorage.setItem('user', JSON.stringify(params))
            }
          }
          this.$toast(this.$t('toast4'))
          this.$router.push(this.localePath('/'+  this.$i18n.locale ))
        }
      } catch (error) {
        this.$toast(error.message)
        console.error(error)
      }
    },
  }
}
</script>
<style lang="less" scoped>

.login{
  padding-top: 44px;
}
.error-msg{
  color: #EA3D32;
  font-size: 12px;
  margin-bottom: 4px;
}
.dialog-top-img{
  height: 212px;
  background-image: url('~/static/images/login_top.svg');
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  .logo-pop{
    width: 177px;
    height: 40px;
    position: absolute;
    bottom: 12px;
    left: 50%;
    transform: translateX(-50%);
  }
}
.dialog-top-img-title{
  font-size: 24px;
  text-align: center;
  color: #FFFFFF;
  margin: 24px auto;
}

.logo-black{
  width: 108px;
  height: 24px;
  background-image: url('~~/static/images/logo-black.svg');
  background-repeat: no-repeat;
  background-size: cover;
}
.logo-white{
  width: 108px;
  height: 24px;
  background-image: url('~~/static/images/logo-white.svg');
  background-repeat: no-repeat;
  background-size: cover;
}
.dialog {
  width: 100%;
  height: 100%;
  padding: 0 16px;
  .dialog-title {
    font-size: 16px;
    font-weight: 500;
  }

  .user-center-info-input {
    margin-bottom: 8px;
  }

  .user-center-info-btn {
    width: 100%;
    margin: 0 auto;
    background-color: var(--bg-color2, rgba(255, 255, 255, 0.06));
    font-size: 14px;
    color: var(--text-color1, #FFFFFF);
    border-radius: 8px;
    height: 40px;
    text-indent: 2em;
    height: 40px;
    border: 1px solid var(--text-color3, rgba(96, 105, 128, 0.40));
  }

  .white{
    color: rgba(96, 105, 128, 0.4);
    border: none;
  }

  .dialog-form {
    width: 100%;
    margin: 0 auto;
    margin-top: 18px;
  }

  .dialog-confirm-btns {
    width: 90%;
    margin: 0 auto;
  }

  .dialog-img {
    width: 24px;
    height: 24px;
    img{
      width: 24px;
      height: 24px;
    }
  }

  .dialog-input {
    position: relative;
  }

  .img-zhanghao {
    position: absolute;
    left: 8px;
    top: 8px
  }

  .dialog-btn {
    text-indent: 2.5em;
  }

  .img-mima {
    position: absolute;
    left: 8px;
    top: 8px
  }

  .dialog-btns {
    width: 100%;
    margin: 0 auto;
    height: 40px;
    border-radius: 20px;
    background-color: var(--bg-primary, #F6D658);
    color: var(--text-color1, #181E2A);
    text-align: center;
    line-height: 40px;
    font-size: 16px;
    margin-top: 10px;
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

  .dialog-submits {
    width: 80%;
    margin: 0 auto;
    font-size: 14px;
    color: var(--text-color2,  rgba(255, 255, 255, 0.70));
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
  }

  .dialog-submits a {
    color: var(--text-color2,  rgba(255, 255, 255, 0.70));
  }

  .dialog-line {
    width: 1px;
    height: 16px;
    background-color: var(--bg-color2, rgba(255, 255, 255, 0.06));
  }
}

.dialog-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 10px;
}

.dialog-close {
  margin-right: 16px;
}
.dialog-checkbox{
  display: inline-block;
}
.dialog-tishi{
  margin-left: 22px;
  margin-top: -20px;
  color: var(--text-color2, rgba(255, 255, 255, 0.70));
  font-size: 12px;
}
.dialog-submit-text{
  width: 80%;
  margin: 0 auto;
  margin-top: 6px;
  text-align: center;
  color: var(--text-color2, rgba(255, 255, 255, 0.70));
  line-height: 24px;
  font-size: 14px;
  .tip{
    color: var(--bg-primary, #F6D658);
  }
  div{
    display: inline-block;
  }
}
.land_footer{
  margin-top: 24px;
  font-size: 14px;
  font-weight: 400;
  color: var(--text-color2, rgba(255, 255, 255, 0.70));
  text-align: center;
  font-family: PingFang SC;
  font-style: normal;
  line-height: normal;
  padding: 0 !important;
  margin-bottom: 16px;
  .com {
    margin-top: 16px;
  }
  .rta {
    width: 63px;
    height: 24px;
    margin-top: 8px;
  }
  /deep/ b{
    color: var(--bg-primary, #F6D658);
    font-weight: 400;
  }
}

</style>