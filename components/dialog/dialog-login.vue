<template>
  <van-popup v-model="show">
    <div class="dialog">
      <div class="dialog-top">
        <div></div>
        <div class="dialog-title">{{ $t('str_no_login') }}</div>
        <div class="dialog-close" @click="show = false"><img :src="themeChecked ? require('~/static/images/home_top_guanbi_1.svg'): require('~/static/images/home_top_guanbi.svg')"></div>
      </div>
      <div class="dialog-form">
        <div class="error-msg" v-show="email.showError">{{ email.errorMsg }}</div>
        <div class="user-center-info-input dialog-input">
          <div class="dialog-img img-zhanghao"><img :src="themeChecked ? require('~/static/images/login_email_1.svg'): require('~/static/images/login_email.svg')"></div>
          <input @blur="validatorEmail" v-model="form.email" class="user-center-info-btn dialog-btn" :class="!themeChecked && 'white'" :placeholder="$t('str_email')" type="text">
        </div>
        <div class="error-msg" v-show="password.showError">{{ password.errorMsg }}</div>
        <div class="user-center-info-input dialog-input">
          <div class="dialog-img img-mima"><img :src="themeChecked ? require('~/static/images/login_mima_1.svg'): require('~/static/images/login_mima.svg')" alt=""></div>
          <input @blur="validatorPassword" type="password" v-model="form.password" class="user-center-info-btn dialog-btn" :class="!themeChecked && 'white'" :placeholder="$t('str_input_pwd')">
        </div>
      </div>
      <div class="dialog-btns" @click.enter="handleSubmit">
        {{ $t('str_login') }}
        <van-loading class="user-icon" type="spinner" v-show="showLoading" />
      </div>
      <div class="dialog-submits">
        <div @click="handleRegister">{{ $t('str_reg_user') }}</div>
        <div class="dialog-line"></div>
        <div @click="$router.push('/sendEmail')">{{ $t('str_pwd_fog') }}</div>
      </div>
    </div>
  </van-popup>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

import commonMinxin from '~/plugins/mixins/common'
export default {
  mixins: [commonMinxin],
  data() {
    return {
      show: false,
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
      }
    }
  },
  computed: {
    ...mapGetters(['register'])
  },
  created() {
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
    ...mapActions(['set_userinfo']),
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
      let reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/;
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
    handleRegister(){
        this.$emit('goRegister')
        this.show  = false
      },
    async handleSubmit() {
      try {
        const params = {
          email: this.form.email,
          password: this.$md5(this.form.password),
        }
        this.showLoading = true
        console.log(this.form, 'handleSubmit')
        // if (!this.form.email) return this.$toast( this.$t('toast1') )
        // if (!this.form.password) return this.$toast(this.$t('toast2'))
        if(this.email.showError || this.password.showError) {
          this.email.showError && this.validatorEmail()
          this.password.showError && this.validatorPassword()
        } else {
        // const params = `{ username: ${this.form.username}, password: ${this.$md5(this.form.password)}, code: ${this.form.code}}`
          console.log(params, ' 888')
          const res = await this.$homeApi.postEmailLogin(JSON.stringify(params))
          if (res.code === 100) {
            // this.code = res.body
            const userinfo = {
              ...res.body,
              ...this.form
            }
            console.log(userinfo)
            
            this.set_userinfo(userinfo)
            this.getUserInfo(userinfo)
          } else {
            // this.$toast(res.message)
          }
          console.log(res, '666')
        }
      } catch (error) {
        console.error(error)
      } finally {
        this.showLoading = false
      }
    },
     // 获取用户信息
     getUserInfo1(userinfo){
        this.$userApi.requestUserinfo(JSON.stringify({userId: userinfo.accessId})).then( res => {
            console.log( res ) 
            // if( res.code == 100 ){
            //     this.info = res.body;
            // } 
        })
    },
    async getUserInfo(userinfo){
      try {
        const params = { userId: userinfo.accessId }
        console.log(params, 'params')
        const res = await this.$userApi.requestUserinfo(JSON.stringify(params))
        if(res.code === 100){
          const user = res.body
          this.set_userinfo({...user, ...userinfo})
          this.$toast(this.$t('toast4'))
          this.show = false
          this.$router.push({ name: 'home' })
          // if(!user.userPwdQuestion){
          //   this.$dialog.confirm({
          //     title: this.$t('str_tip'),
          //     message: this.$t('Setsecurityquestion'), 
          //     confirmButtonText:  this.$t('str_to_set'), 
          //     cancelButtonText: this.$t('str_not_now'),
          //   }).then(() =>{
          //     this.$router.push({
          //       name: 'setMyitbo'
          //     })
          //   }).catch(() => {
          //     this.$toast(this.$t('toast5'))
          //   })
          // }
        }
      } catch (error) {
        console.error(error)
      }
    },
    onShow() {
      this.show = true
    }
  }
}
</script>
<style lang="less" scoped>
.van-popup {
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
.dialog {
  width: 100%;
  height: 100%;

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
    background-color: var(--bg-color2);
    font-size: 14px;
    color: var(--text-color1);
    border-radius: 8px;
    height: 40px;
    text-indent: 2em;
    height: 40px;
    border: 1px solid var(--text-color3);
  }

  .white{
    color: rgba(96, 105, 128, 0.4);
    border: none;
  }

  .dialog-form {
    width: 90%;
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
    width: 90%;
    margin: 0 auto;
    height: 40px;
    border-radius: 20px;
    background-color: var(--bg-primary);
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

  .dialog-submits {
    width: 80%;
    margin: 0 auto;
    font-size: 14px;
    color: var(--text-color2);
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
  }

  .dialog-submits a {
    color: var(--text-color2);
  }

  .dialog-line {
    width: 1px;
    height: 16px;
    background-color: var(--bg-color2);
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
}</style>