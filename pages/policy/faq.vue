<template>
  <div class="tag">
    <HeaderTop @refresh="onRefresh"></HeaderTop>
    <nav-new :title="$t('str_footer_nav9')" :imgUrl="require('~/static/images/my_gn_lsjl_1.svg')"></nav-new>
    <div class="police">
      <div class="police-title">{{ $t('str_footer_faq1') }}</div>
      <div class="police-title">{{ $t('str_footer_faq2') }}</div>
      <div class="police-text-content">{{ $t('str_footer_faq3') }}</div>
      <div class="police-title">{{ $t('str_footer_faq4') }}</div>
      <div class="police-text-content">{{ $t('str_footer_faq5') }}</div>
      <div class="police-title">{{ $t('str_footer_csam6') }}</div>
      <div class="police-text-content">{{ $t('str_footer_faq7') }}</div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import NavNew from '@/components/nav/new'
import Thumb from '@/components/thumb'
import empty from '@/components/empty'
import tagLoad from "@/components/skeleton/tagLoad.vue"
import commonMinxin from '~/plugins/mixins/common'
import CODES from "~/plugins/enums/codes"


export default{
  name: 'policy-faq',
  mixins: [commonMinxin],
  data() {
    return {
      tagList: [],
      refreshing: false,
      spinnerLoading: false,
      loading: false,
      finished: false,
      pageInfo: {
        page: 1,
        size: 50,
        letter: ''
      },
      total: 0,
      tagIndex: 0,
      tags: [this.$t('str_menu_tag_all'), 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
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
    NavNew,
    Thumb,
    empty,
    tagLoad
  },
  created(){
    this.initTagList('first')
  },
  methods: {
    ...mapActions(['set_tagid']),
    handleClickTag(item){
      gtag('event', 'gt4_click_tags', {
        id: item.id,
        name: item.name,
      });
      console.log(item)
      this.set_tagid(item.id)
      this.$router.push({
        name: 'category-id-name',
        params:{
          id: item.id,
          name: item.name,
          refresh: true,
        },
      });
    },
    handleClickTagName(item, index){
      this.tagIndex = index
      index != 0 ? (this.pageInfo.letter = item) : delete this.pageInfo.letter
      console.log(this.pageInfo.size, this.pageInfo.page, 'tagName')
      index !== 0 ? this.clickShow = true : this.clickShow = false // 为了防止切换tab时候，当一个有下拉加载时候不在第一页，然后切换tab时候，会同时触发刷新和下拉，当前是阻止只有在所有标签时候触发
      this.onRefresh()
    },
    onLoad(){
      if(this.clickShow) return this.loading = false
      console.log(this.pageInfo, 'onLoad')
      this.pageInfo.page += 1
      this.initTagList(); 
    },
    async initTagList(isRefresh = false){
      try {
        isRefresh === 'first'  && (this.spinnerLoading = true)
        !isRefresh  && (this.loading = true)
        const res = await this.$homeApi.postTagListPage(this.pageInfo)
        if(res.code === CODES.SUCCESS){
          this.total = res.data.meta.pagination.total
          if(isRefresh){
            this.tagList = res.data.data || []
            this.refreshing = false
          } else {
            this.tagList = [ ...this.tagList, ...res.data.data]
            this.loading = false
          }
          if(res.data.data.length === 0){
            this.finished = true
          } else {
            this.finished = false
          }
        }

      } catch (error) {

      } finally {
        this.spinnerLoading = false
        this.loading = false
        this.refreshing = false
      }
    },
    onRefresh() {
      this.pageInfo.page = 1
      this.initTagList(true)
    }
  }
}
</script>
<style lang="less" scoped>
.thumb{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 12px;
}
.tag-box{
  margin: 10px 12px;
  height: 44px;
  border-radius: 4px;
  background-color: var(--bg-color3, rgba(255, 255, 255, 0.10));
  border: 1px solid var(--bg-color3, rgba(255, 255, 255, 0.10));
  display: flex;
  flex-wrap: wrap;
  padding: 4px 8px;
  font-size: 12px;
  line-height: 16.8px;
  .tag-name{
    margin: 0 2px;
    line-height: 16.8px;
    text-decoration: underline;
    text-underline-offset: 3px;
  }
  .tag-color{
    color: var(--bg-primary, #F6D658);
  }
  .tag-line{
    text-decoration: none;
  }
}
.tag-item{
  width: 172px;
  height: 32px;
  border-radius: 4px;
  background-color: var(--bg-color2, rgba(255, 255, 255, 0.06));
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  font-size: 12px;
  color: var(--text-color2,  rgba(255, 255, 255, 0.70));
  text-align: center;
}
:deep(.van-nav-bar__left){
  font-size: 18px;
}
</style>