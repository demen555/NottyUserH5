<template>
  <div class="tag">
    <HeaderTop></HeaderTop>
    <Nav :title="$t('str_footer_nav10')" text></Nav>
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
import Nav from '@/components/nav'
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