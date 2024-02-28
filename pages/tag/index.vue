<template>
  <div class="tag">
    <HeaderTop @refresh="onRefresh"></HeaderTop>
    <nav-new :title="tags[tagIndex] + ' ' + '('+ total + ' results' + ')'" :imgUrl="require('~/static/images/my_gn_biaoqian_1.svg')"></nav-new>
    <div class="paddingTop88"></div>
    <div style="height: 50px;" class="d-none d-sm-block"></div>
    <div class="tag-box" >
      <div v-for="(item, index) in tags" :key="index"><span class="tag-name" :class="tagIndex === index? 'tag-color': ''" @click="handleClickTagName(item, index)">{{ item }}</span><span v-if="tags.length -1 !== index" class="tag-line">-</span></div>
    </div>
    <div class="loading-box" v-if="spinnerLoading">
      <tagLoad></tagLoad>
    </div>
    <!-- <van-loading size="48px" type="spinner" v-if="loading" /> -->
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh"  v-if="tagList.length">
      <van-list
          v-model="loading"
          :finished="finished"
          :finished-text="$t('str_no_more')"
          :immediate-check='false'
          @load="onLoad"
        >
          <div class="container-fluid-sp">
            <div class="thumb row">
              <nuxt-link :to="localePath({
                name: 'tag-name',
                params:{
                  id: tag.id,
                  name: tag.urlSlug,
                  refresh: true,
                },
              })" 
            
              class="tag-item col-5 col-sm-6 col-md-4 col-lg-3 col-xl-2" 
              v-for="(tag, index) in tagList" 
              :key="index">
                <span class="item-name"  @click.stop="handleClickTag(tag)" >{{ tag.urlSlug }}</span>
              </nuxt-link>
            </div>
          </div>
        </van-list>
    </van-pull-refresh>
    <empty v-else></empty>
    <div style="height: 160px;" class="d-none d-sm-block"></div>
    <fBottom class="d-none d-sm-block"></fBottom>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import NavNew from '@/components/nav/new'
import Thumb from '@/components/thumb'
import empty from '@/components/empty'
import tagLoad from "@/components/skeleton/tagLoad.vue"
import fBottom from '~/components/footer/bottom.vue'
import commonMinxin from '~/plugins/mixins/common'
import CODES from "~/plugins/enums/codes"


export default{
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
  components: {
    NavNew,
    Thumb,
    empty,
    tagLoad,
    fBottom
  },
  created(){
    this.getList('first')
  },
  head(){
    const hostName = process.server ? this.$nuxt.context.req.headers.host.replace(/:\d+$/, '') : window.location.host;
    return {
      
      link: [
        {
          hid: "canonical",
          rel: 'canonical',
          href: `https://${hostName}${this.$nuxt.context.route.fullPath}`,
        },
      ],
    }
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

      this.$router.push(this);
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
      this.getList(); 
    },
    async getList(isRefresh = false){
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
      this.getList(true)
    }
  }
}
</script>
<style lang="less" scoped>
.thumb{
  display: flex;
  flex-wrap: wrap;
  // justify-content: space-between;
  margin: 0 12px;
}
@media (max-width: 579px) {
  .thumb{
    // padding-left: 15px;
    // padding-right: 15px;
    // width: 100%;
    // width: 455px;
    justify-content: space-between;
  }
  .tag-item{
    min-width: 172px !important;
  }
}
.tag-box{
  margin: 10px 12px;
  // height: 44px;
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
  // display: block;
  // min-width: 172px;
  height: 32px;
  margin-right: 10px;
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
.paddingTop88{
  padding-top: 80px;
}  
.item-name{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>