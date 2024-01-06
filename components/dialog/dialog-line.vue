<template>
  <van-popup v-model="show">
    <div class="dialog" >
      <div class="dialog-top">
        <div></div>
        <div class="dialog-title">{{ $t('str_change_line') }}</div>
        <div class="dialog-close" @click="show = false"><img :src="themeChecked ? require('~/static/images/home_top_guanbi_1.svg'): require('~/static/images/home_top_guanbi.svg')"></div>
      </div>
    </div>
  </van-popup>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import commonMinxin from '~/plugins/mixins/common'
import CODES from "~/plugins/enums/codes"
export default {
  mixins: [commonMinxin],
  data() {
    return {
      show: false,
      form: {
        username: '',
        password: ''
      },
    }
  },
  computed: {
    ...mapGetters(['register'])
  },
  mounted() {
    // this.initDomain()
    this.form.username = this.register.username
    this.form.password = this.register.password
  },
  methods: {
    ...mapActions(['set_userinfo']),
    handleRegister(){
        this.$emit('goRegister')
        this.show  = false
    },
    async handleSubmit() {
      try {
        const params = {
          account: this.form.username,
          password: this.$md5(this.form.password),
        }
        console.log(this.form, 'handleSubmit')
        if (!this.form.username) return this.$toast( this.$t('toast1') )
        if (!this.form.password) return this.$toast(this.$t('toast2'))
        // const params = `{ username: ${this.form.username}, password: ${this.$md5(this.form.password)}, code: ${this.form.code}}`
        const res = await this.$homeApi.postLogin(params)
        if (res.code === CODES.SUCCESS) {
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
      } catch (error) {
        console.error(error)
      }
    },
    onLineShow() {
      this.show = true
    }
  }
}
</script>
<style lang="less" scoped>
.van-popup {
  background-color: var(--dialog-bg-color, #18181C);
  width: 343px;
  height: auto;
  padding: 16px;
  border-radius: 16px;
  overflow: hidden;
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
    background-color: var(--bg-primary, #FFE500);
    color: var(--dialog-text-color, #FFFFFF);
    text-align: center;
    line-height: 40px;
    font-size: 16px;
  }
  .dialog-btns-no {
    width: 90%;
    margin: 0 auto;
    height: 40px;
    border-radius: 20px;
    background-color: var(--bg-color3, rgba(255, 255, 255, 0.10));
    color: var(--text-color2,  rgba(255, 255, 255, 0.70));
    text-align: center;
    line-height: 40px;
    font-size: 16px;
  }

  .line-btn{
  margin-bottom: 12px;
}
.line-btn:first-child(1){
  margin-top: 24px;
}
.line-btn:last-child(1){
  margin-bottom: 16px;
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
  margin-bottom: 24px;
}

.dialog-close {
  margin-right: 16px;
}</style>