
<template>
  <div class="register"> 
    <HeaderTop ></HeaderTop>
    <div class="dialog-top-img d-sm-none">
      <div class="logo-pop" :class="themeChecked? 'logo-black': 'logo-white'"></div>
    </div>
    <div class="dialog-bg">
      <div class="dialog-pc d-none d-md-block">
        <img class="logo" src="~@/static/images/logo-black.svg" alt="">
        <h2> {{ $t('str_login_title1') }} </h2>
        <div class="advantage">
          <div class="advantage-item">
            <img class="img" src="~@/static/images/Advantage_free.png" alt="">
            <span class="words"> {{ $t('str_login_title2') }} </span>
          </div>
          <div class="advantage-item">
            <img class="img" src="~@/static/images/Advantage_create.png" alt="">
            <span class="words"> {{ $t('str_login_title3') }}  </span>
          </div>
          <div class="advantage-item">
            <img class="img" src="~@/static/images/Advantage_Comment.png" alt="">
            <span class="words"> {{ $t('str_login_title4') }} </span>
          </div>
          <div class="advantage-item">
            <img class="img" src="~@/static/images/Advantage_paid.png" alt="">
            <span class="words"> {{ $t('str_login_title5') }} </span>
          </div>
        </div>
      </div>
      <div class="dialog">
        <div class="dialog-top-img-title">{{ $t('str_reg') }}</div>
        <div class="dialog-form">
          <div class="error-msg" v-show="email.showError">{{ email.errorMsg }}</div>
          <div class="user-center-info-input dialog-input">
            <div class="dialog-img img-zhanghao"><img :src="themeChecked ? require('~/static/images/login_email_1.svg'): require('~/static/images/login_email.svg')" alt="login_email"></div>
            <label for="email">
              <input id="email" @blur="validatorEmail" v-model="form.email" class="user-center-info-btn dialog-btn" :class="!themeChecked && 'white'" :placeholder="$t('str_email')" type="text">
            </label>
          </div>
          <div class="error-msg" v-show="user.showError">{{ user.errorMsg }}</div>
          <div class="user-center-info-input dialog-input">
            <div class="dialog-img img-zhanghao"><img :src="themeChecked ? require('~/static/images/login_zhanghao_1.svg'): require('~/static/images/login_zhanghao.svg')" alt=""></div>
            <label for="username">
              <input id="username" @blur="validatorUser" v-model="form.username" class="user-center-info-btn dialog-btn" :class="!themeChecked && 'white'" :placeholder="$t('str_num') +'(' +  $t('str_validator_username') +')'" type="text">
            </label>
          </div>
          <div class="error-msg" v-show="pwd.showError">{{ pwd.errorMsg }}</div>
          <div class="user-center-info-input dialog-input">
            <div class="dialog-img img-mima"><img  :src="themeChecked ? require('~/static/images/login_mima_1.svg'): require('~/static/images/login_mima.svg')" alt=""></div>
            <label for="password">
              <input @blur="validatorPwd" type="password" v-model="form.password" class="user-center-info-btn dialog-btn" :class="!themeChecked && 'white'" :placeholder="$t('str_input_pwd') +'(' +  $t('str_validator_username') +')'">
            </label>  
          </div>

          <div class="user-center-info-input input-code">
            <div class="dialog-img img-mima"><img :src="themeChecked ? require('~/static/images/login_yanzhengma_1.svg'): require('~/static/images/login_yanzhengma.svg')"></div>
            <label for="code">
              <input id="code"  v-model="form.code" class="user-center-info-btn dialog-btn" :class="!themeChecked && 'white'" :placeholder="$t('str_input_code')" type="text">
            </label>
            <div class="user-center-input-code">
              <div class="input-code" @click="initCode">
                <img class="code-img" :src="code" alt="code">
              </div>
            </div>
          </div>
        </div>
        <div class="dialog-btns" @click="handleSubmit">
          {{ $t('str_register') }}
          <van-loading class="user-icon" type="spinner" v-show="showLoading" />
        </div>
        <div class="dialog-submit-text">
          <div>{{ $t('str_login_text3') }}</div>
          <nuxt-link :to="localePath('login')" class="tip">{{ $t('str_login_account2') }}</nuxt-link>
        </div>
        <div class="land_footer">
            <p class="com">  © {{ hostname }}, 2023 </p>
            <img class="rta" :src="themeChecked? require('~/static/images/rat.png'): require('~/static/images/rat-1.png')" alt="rta">
        </div>
      </div>
    </div>
    <!-- <div id="main-content" class="wiki-content d-none d-sm-block">
      <h1>
        <strong>{{ $t('str_login_html1') }}</strong>
      </h1>
      <p>
        <span>{{ $t('str_login_html2') }}</span>
        <a href="https://nottyhub.com/" class="external-link" rel="nofollow">
          <strong>{{ $t('str_login_html3') }}</strong>
        </a>
        <span>{{ $t('str_login_html4') }}&nbsp;</span>
      </p>
      <p>
        <span>{{ $t('str_login_html5') }}</span>
        <strong>
          <a href="http://Nottyhub.com" class="external-link" rel="nofollow">{{ $t('str_login_html6') }}</a>
        </strong>
        <span>{{ $t('str_login_html7') }}</span>
        <a href="https://nottyhub.com/category/" class="external-link" rel="nofollow">
          <strong>{{ $t('str_login_html8') }}</strong>
        </a>
        <span>{{ $t('str_login_html9') }}</span>
      </p>
      <h2>
        <strong>{{ $t('str_login_html10') }}</strong>
      </h2>
      <p>
        <span>{{ $t('str_login_html11') }}&nbsp;</span>
      </p>
      <ol>
        <li>
          <span>{{ $t('str_login_html12') }}</span>
        </li>
        <li>
          <span>{{ $t('str_login_html13') }}&nbsp;</span>
        </li>
        <li>
          <span>{{ $t('str_login_html14') }}&nbsp;</span>
        </li>
        <li>
          <span>{{ $t('str_login_html15') }}&nbsp;</span>
        </li>
        <li>
          <span>{{ $t('str_login_html16') }}&nbsp;</span>
        </li>
      </ol>
      <p>
        <span>{{ $t('str_login_html17') }}</span>
      </p>
      <h2>
        <strong>{{ $t('str_login_html18') }}&nbsp;</strong>
      </h2>
      <p>
        <span>{{ $t('str_login_html19') }}</span>
      </p>
      <ol>
        <li>
          <a href="https://nottyhub.com/category/anime-hentai" class="external-link" rel="nofollow">
            <span>{{ $t('str_login_html20') }}</span>
          </a>
        </li>
        <li>
          <a href="https://nottyhub.com/category/gay-porn" class="external-link" rel="nofollow">
            <span>{{ $t('str_login_html21') }}</span>
          </a>
        </li>
        <li>
          <span>{{ $t('str_login_html22') }}</span>
        </li>
        <li>
          <a href="https://nottyhub.com/category/blacked" class="external-link" rel="nofollow">
            <span>{{ $t('str_login_html23') }}</span>
          </a>
        </li>
        <li>
          <span>{{ $t('str_login_html24') }}</span>
        </li>
        <li>
          <span>{{ $t('str_login_html25') }}</span>
        </li>
        <li>
          <span>{{ $t('str_login_html26') }}</span>
        </li>
        <li>
          <a href="https://nottyhub.com/category/teens-xxx" class="external-link" rel="nofollow">
            <span>{{ $t('str_login_html27') }}</span>
          </a>
        </li>
        <li>
          <a href="https://nottyhub.com/category/japanese" class="external-link" rel="nofollow">
            <span>{{ $t('str_login_html28') }}</span>
          </a>
        </li>
        <li>
          <a href="https://nottyhub.com/category/cosplay" class="external-link" rel="nofollow">
            <span>{{ $t('str_login_html29') }}</span>
          </a>
        </li>
      </ol>
      <p>
        <span>{{ $t('str_login_html30') }}</span>
      </p>
      <p>
        <span>{{ $t('str_login_html31') }}</span>
      </p>
      <ul>
        <li>
          <a href="https://t.me/NottyAsian" class="external-link" rel="nofollow">
            <span>{{ $t('str_login_html32') }}</span>
          </a>
          <span>|</span>
          <a href="https://t.me/NottyOF" class="external-link" rel="nofollow">
            <span>{{ $t('str_login_html33') }}</span>
          </a>
          <span>|</span>
          <a href="https://t.me/nottygay" class="external-link" rel="nofollow">
            <span>{{ $t('str_login_html34') }}</span>
          </a>
        </li>
      </ul>
    </div> -->
    <div class="footer-content" v-html="seoInfo.content"></div>
    <fBottom class="d-none d-sm-block"></fBottom>
   </div>
</template>
<script>
  import { mapActions } from 'vuex'
  import commonMinxin from '~/plugins/mixins/common'
  import HeaderTop from '~/components/header/top.vue'
  import fBottom from '~/components/footer/bottom.vue'
  export default{
    mixins: [commonMinxin],
    components: {
      HeaderTop,
      fBottom
    },
    data() {
      return {
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
        },
        hostname: ''
      }
    },
    head(){
      const hostName = process.server ? this.$nuxt.context.req.headers.host.replace(/:\d+$/, '') : window.location.host;
      return {
          title: this.seoInfo.seoTitle,
          meta: [
              {
                  hid: 'description',
                  name: 'description',
                  content: this.seoInfo.seoDescription
              },
              {
                  hid: 'keyswords',
                  name: 'keyswords',
                  content: this.seoInfo.seoKeywords
              },
              {
                  hid: 'title',
                  name: 'title',
                  content: this.seoInfo.seoTitle
              },
              { hid: 'og:title', property: 'og:title', content: this.seoInfo.seoTitle },
              { hid: 'og:description', property: 'og:description', content:  this.seoInfo.seoDescription },
              { hid: 'og:keywords', property: 'og:keywords', content: this.seoInfo.seoKeywords },
          ],
          link: [
              {
                  hid: "canonical",
                  rel: 'canonical',
                  href: `https://${hostName}${this.$nuxt.context.route.fullPath}`,
              },
          ],
      }
    },
    created(){
      if(process.client){
        this.hostname = window.location.hostname
      }
      this.initCode()
    },
    async asyncData({ $homeApi }) { 
      const res = await $homeApi.postSeo('register')
      console.log(res.data, 'seo')
      return { 
        seoInfo: res.data || {},
      }
    },
    methods: {
      ...mapActions(['set_register', 'set_userinfo', 'setAccessToken']),

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
        // let reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,10}$/;
        let reg = /^\S{6,}$/;
        if(!reg.test(this.form.username)){
          this.user.showError = true
          this.user.errorMsg = this.$t('str_validator_username')
        } else {
          this.user.showError = false
          this.user.errorMsg = ''
        }
      },
      validatorPwd(){
        // let reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/;
        let reg = /^\S{6,}$/;
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
          // console.log(res, '666')
        } catch (error) {
          console.error(error)
        }
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
            const res  = await this.$homeApi.postEmailRegister(JSON.stringify(params))
            if(res.code === 100){
              this.setAccessToken(res.data.accessToken)
              this.set_userinfo(res.data)
              this.getUserInfo(res.data)
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
          this.$toast(error.message)
          console.error(error)
        } finally {
          this.showLoading = false
        }
      },
      async getUserInfo(userinfo){
        try {
          const res = await this.$userApi.requestUserinfo()
          if(res.code === 100){
            this.$toast(this.$t('toast4'))
            const user = res.data
            this.set_userinfo({...user, ...userinfo})
            this.$router.push(this.localePath('/'+  this.$i18n.locale ))
          }
        } catch (error) {
          console.error(error)
        }
      },
    }
  }
</script>
<style lang="less" scoped>
.register{
  padding-top: 44px;
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

.logo-pop{
  width: 108px;
  height: 24px;
  position: absolute;
  top: 120px;
  left: 119px;
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
.error-msg{
  color: #EA3D32;
  font-size: 12px;
  margin-bottom: 4px;
}
.go-login{
  color: var(--bg-primary, #F6D658);
  margin-left: 5px;
}
.dialog{
  width: 100%;
  height: 100%;
  padding: 0 16px;
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
    background-color: var(--bg-color2, rgba(255, 255, 255, 0.06));
    font-size: 14px;
    border-radius: 8px;
    height: 40px;
    text-indent: 2em;
    height: 40px;
    color: var(--text-color1, #FFFFFF);
    border: 1px solid var(--text-color3, rgba(96, 105, 128, 0.40));
  }
.white{
  color: rgba(96, 105, 128, 0.4);
  border: none;
}
  .dialog-form{
    width: 100%;
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
    width: 100%;
    margin: 0 auto;
    height: 40px;
    border-radius: 20px;
    background-color:var(--bg-primary, #F6D658);
    color: var(--text-color1, #181E2A);
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
    width: 90%;
    margin: 0 auto;
    font-size: 14px;
    color: var(--text-color2,  rgba(255, 255, 255, 0.70));
    display: flex;
    justify-content: center;
    margin-top: 16px;
  }
  .dialog-submits a{
    color:var(--text-color2,  rgba(255, 255, 255, 0.70));
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
  background-color: var(--bg-color2, rgba(255, 255, 255, 0.06));
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
  background-color: var(--text-color1, #FFFFFF);
  display: flex;
  align-items: center;
  justify-content: center;
}
.input-code{
  z-index: 2;
  color: var(--bg-color1, #0E0E0F);
  letter-spacing: 2px;
}
.dialog-tishi{
  margin-left: 22px;
  margin-top: -20px;
  color: var(--text-color2, rgba(255, 255, 255, 0.70));
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