<template>
  <div class="tag">
    <HeaderTop></HeaderTop>
    <Nav :title="$t('str_footer_nav6')" text></Nav>
    <div class="police">
      <div class="police-title">{{ $t('str_footer_nav6') }}</div>
      <div class="police-title-text">{{ $t('str_footer_dmca1') }}</div>
      <div class="police-title" style="margin-top: 10px;">{{ $t('str_footer_dmca2') }}</div>
      <div class="police-text-content">{{ $t('str_footer_dmca3') }}</div>
      <div class="police-title">{{ $t('str_footer_dmca4') }}</div>
      <div class="police-text-content">{{ $t('str_footer_dmca5') }}<span class="footer-red">{{ $t('str_footer_dmca6') }}</span></div>
      <div class="police-text-content">{{ $t('str_footer_dmca7') }}</div>
      <div class="police-title">{{ $t('str_footer_dmca8') }}</div>
      <div class="police-text-content">{{ $t('str_footer_dmca9') }}</div>
      <div class="police-title">{{ $t('str_footer_dmca8') }}</div>
      <div class="police-text-content">{{ $t('str_footer_dmca9') }}</div>
      <div class="police-text-content">{{ $t('str_footer_dmca10') }}</div>
      <div class="police-title">{{ $t('str_footer_dmca11') }}</div>
      <div class="police-text-content">{{ $t('str_footer_dmca12') }}</div>
      <div class="police-title">{{ $t('str_footer_dmca13') }}</div>
      <div class="police-text-content">{{ $t('str_footer_dmca14') }}</div>
      <div class="police-title">{{ $t('str_footer_dmca15') }}</div>
      <div class="police-text-content">{{ $t('str_footer_dmca16') }}<span class="footer-red">{{ $t('str_footer_dmca17') }}</span></div>
    </div>
  </div>
</template>
<script>
import Nav from '@/components/nav'
import commonMinxin from '~/plugins/mixins/common'


export default{
  name: 'policy-dmca',
  mixins: [commonMinxin],
  data() {
    return {
      tagList: []
    }
  },
  head(){
    const hostName = process.server ? this.$nuxt.context.req.headers.host : window.location.host;
    return {
      
      link: [
        {
          rel: 'canonical',
          href: `${hostName}${this.$nuxt.context.route.fullPath}`,
        },
      ],
    }
  },
  components: {
    Nav
  }
}
</script>
<style lang="less" scoped>
:deep(.van-nav-bar__left){
  font-size: 18px;
}
</style>