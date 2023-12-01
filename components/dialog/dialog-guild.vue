<template>
  <van-popup class="scroll-pop" v-model="show" :close-on-click-overlay="false">
    <div class="dialog">
      <div class="dialog-top">
        <div :class="themeChecked? 'logo-black': 'logo-white'"></div>
      </div>
      <div class="dialog-text">{{ $t('str_guild_age') }}</div>
      <div class="dialog-subtitle">{{ $t('str_guild_text') }}</div>
      <div class="dialog-btns" @click="handleSubmit">
        {{ $t('str_enter_text') }}
      </div>
      <a class="dialog-btns dialog-exit" href="https://www.google.com">
       {{ $t('str_exit_text') }}
      </a>
      <div class="dialog-subtitle dialog-control land_footer">
          <p v-html="$t('str_page_text1')"> </p>
          <p> {{ $t('str_page_text2') }} </p>
          <p> {{ $t('str_page_text3') }} </p>
          <p class="com">  © {{ hostname }}, 2023 </p>
          <img class="rta" :src="themeChecked? require('~/static/images/rat.png'): require('~/static/images/rat-1.png')" alt="rta">
      </div>
    </div>
  </van-popup>
</template>
<script>
import commonMinxin from '~/plugins/mixins/common'
export default {
  mixins: [commonMinxin],
  data() {
    return {
      show: false,
      hostname: window.location.hostname
    }
  },
  methods: {
    handleSubmit() {
      this.show = false
      localStorage.setItem('showGuild', true)
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
  border: 1PX solid #FFFFFF0F
}
.str-page-text{
  color: var(--bg-primary);
}  
.scroll-pop{
  overflow: auto;
}
.logo-black{
  width: 86px;
  height: 28px;
  background-image: url('~~/static/images/logo-black.svg');
  background-repeat: no-repeat;
  background-size: cover;
}
.logo-white{
  width: 86px;
  height: 28px;
  background-image: url('~~/static/images/logo-white.svg');
  background-repeat: no-repeat;
  background-size: cover;
  // margin-top: 8px;
  // margin-bottom: 16px;
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
    width: 100%;
    margin: 0 auto;
    height: 40px;
    border-radius: 20px;
    background-color: var(--bg-primary);
    color: var(--dialog-text-color);
    text-align: center;
    line-height: 40px;
    font-size: 16px;
    // margin-top: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
.dialog-exit{
  background-color: var(--bg-color3);
  margin-top: 12px;
  margin-bottom: 24px;
}
.dialog-control{
  margin-bottom: 24px;
  padding: 0 40px;
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
  justify-content: center;
  padding-top: 10px;
}
.dialog-text{
  font-size: 20px;
  font-weight: 600;
  color: var(--text-color1);
  text-align: center;
  margin-top: 24px;
  margin-bottom: 16px;
}
.dialog-subtitle{
  font-size: 14px;
  color: var(--text-color2);
  font-weight: 400;
  line-height: 22px;
  text-align: center;
  margin-bottom: 48px;
}

.dialog-close {
  margin-right: 16px;
}

.land_footer{
  margin-top: 24px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(255,255,255,.7);
  text-align: center;
  font-family: PingFang SC;
  font-style: normal;
  line-height: normal;
  padding: 0 !important;
  .com {
    margin-top: 16px;
  }
  .rta {
    width: 88px;
    height: 31px;
  }
  /deep/ b{
    color: #ff5502;
    font-weight: 400;
  }
}
</style>