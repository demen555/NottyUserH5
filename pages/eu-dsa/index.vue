<template>
  <div class="tag">
    <HeaderTop></HeaderTop>
    <nav-new :title="$t('str_footer_nav10')" :imgUrl="require('~/static/images/my_gn_lsjl_1.svg')"></nav-new>
    <div class="police">
      <div class="footer-content" v-html="seoInfo.content"></div>
    </div>
    <fBottom></fBottom>
  </div>
</template>
<script>
import NavNew from '@/components/nav/new'
import commonMinxin from '~/plugins/mixins/common'


export default{
  name: 'eu-dsa',
  mixins: [commonMinxin],
  data() {
    return {
      tagList: []
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
  async asyncData({ $homeApi }) { 
    const res = await $homeApi.postSeo('eu-dsa')
    console.log(res.data, 'seo')
    return { 
      seoInfo: res.data || {},
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