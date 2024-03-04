<template>
  <van-popup v-model="showPopup" position="bottom" :style="{ height: '170px' }">
    <div class="pop-content">{{ $t('str_page_text18') }} <nuxt-link :to="localePath('policy-cookie')">{{ $t('str_page_text19') }}</nuxt-link></div>
    <div class="dialog-btns" @click="handleSubmit">
      {{ $t('str_enter_text1') }}
    </div>
  </van-popup>
</template>
<script>
import commonMinxin from '~/plugins/mixins/common'
export default {
  mixins: [commonMinxin],
  data() {
    return {
      showPopup: false,
    }
  },
  methods: {
    handleSubmit() {
      this.showPopup = false
      localStorage.setItem('showBottom', true)
      gtag('consent', 'update', {
        'ad_storage': 'granted',
        'analytics_storage': 'granted'
      });
    },
    onShow() {
      this.showPopup = true
    }
  }
}
</script>
<style lang="less" scoped>
.pop-content{
  width: 90%;
  margin: 0 auto;
  padding: 12px 0;
  text-align: center;
  font-size: 14px;
  line-height: 19.6px;
  a{
    color: var(--bg-primary, #F6D658);
    text-decoration: underline;
  }
}
.dialog-btns {
  width: 167px;
  margin: 0 auto;
  height: 32px;
  border-radius: 20px;
  background-color: var(--bg-primary, #F6D658);
  color: var(--text-color1, #181E2A);
  text-align: center;
  line-height: 32px;
  font-size: 16px;
  // margin-top: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.van-popup{
  background-color: #262627 !important;
}
</style>