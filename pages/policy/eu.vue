<template>
  <div class="tag">
    <HeaderTop></HeaderTop>
    <nav-new :title="$t('str_footer_nav10')" :imgUrl="require('~/static/images/my_gn_lsjl_1.svg')"></nav-new>
    <div class="police">
      <div class="police-title">{{ $t('str_footer_eu1') }}</div>
      <div class="police-title-text">{{ $t('str_footer_eu2') }}</div>
      <div class="police-text-content-prev">
        {{ $t('str_footer_eu3') }}
      </div>
    </div>
  </div>
</template>
<script>
import NavNew from '@/components/nav/new'
import commonMinxin from '~/plugins/mixins/common'


export default{
  name: 'policy-eu',
  mixins: [commonMinxin],
  data() {
    return {
      tagList: []
    }
  },
  head(){
    const hostName = process.server ? this.$nuxt.context.req.headers.host.replace(/:\d+$/, '') : window.location.host;
    return {
      
      link: [
        {
          hid: "canonical",
          rel: 'canonical',
          href: `${hostName}${this.$nuxt.context.route.fullPath}`,
        },
      ],
    }
  },
  components: {
    NavNew
  }
}
</script>
<style lang="less" scoped>
:deep(.van-nav-bar__left){
  font-size: 18px;
}
</style>