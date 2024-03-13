<template>
  <div class="home container-fluid">
    <HeaderTop @refresh="onRefresh"></HeaderTop>
    <!-- <Nav :title="$t('str_menu_type_all')" text></Nav> -->
    <nav-new :title="$t('str_menu_type_all')" :imgUrl="require('~/static/images/my_gn_fenlei_1.svg')"></nav-new>
    <div class="loading-box" v-if="spainnerLoading">
      <tagLoad></tagLoad>
    </div>
    <template v-if="typeList.length">
      <div style="height: 50px;" class="d-none d-sm-block"></div>
      <div class="thumb row paddingTop88">
        <Thumb class="col-sm-6 col-md-4 col-lg-3 col-xl-2" :tag="tag" v-for="tag in typeList" :key="tag.id"></Thumb>
      </div>
    </template>
    <Empty v-else></Empty>   
    <div style="height: 40px;" class="d-none d-sm-block"></div>
    <div style="height: 60px;"></div>
    <div class="row">
      <fBottom></fBottom>
    </div>
  </div>
</template>
<script>
import Nav from '~/components/nav'
import NavNew from '~/components/nav/new'
import Cover from '~/components/cover'
import Empty from '~/components/empty'
import Thumb from '~/components/thumb'
import tagLoad from "~/components/skeleton/tagLoad.vue"
import commonMinxin from '~/plugins/mixins/common'
import CODES from "~/plugins/enums/codes"


export default{
name: 'category',
data() {
  return {
    spainnerLoading: false,
    loading: false, // 是否处于加载状态
    finished: false, // 是否加载完成
    refreshing: true, // 当前是否刷新重置信息
    typeList: [],
    pageInfo: {
      page: 1,
      size: 20
    },
    categoryMetaData: {
      description: "",
      keywords: "",
      title: ""
    }
  }
},
head(){
  const hostName = process.server ? this.$nuxt.context.req.headers.host.replace(/:\d+$/, '') : window.location.host;
  return {
    title: this.categoryMetaData && this.categoryMetaData.title,
    meta: [
        {
            hid: 'description',
            name: 'description',
            content: this.categoryMetaData.description
        },
        {
            hid: 'keyswords',
            name: 'keyswords',
            content: this.categoryMetaData.keywords
        },
        {
            hid: 'title',
            name: 'title',
            content: this.categoryMetaData.title
        },
        { hid: 'og:title', property: 'og:title', content: this.categoryMetaData.title },
        { hid: 'og:description', property: 'og:description', content:  this.categoryMetaData.description},
        { hid: 'og:keywords', property: 'og:keywords', content: this.categoryMetaData.keywords },
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
mixins: [commonMinxin],
computed: {
  txtTitle(){
    return  '#'+this.detail.name
  }
},
activated(){
  const isRefresh = this.$route.params.refresh;
  if( isRefresh ){
    this.getList('first')
  }
},
created(){
  const { name, id } = this.$route.params
  this.detail = {
    name: name,
    id: id
  }
  this.getList('first')
},
components: {
  NavNew,
  Cover,
  Empty,
  Thumb,
  tagLoad
},
methods: {
  onLoad(){
    this.pageInfo.page += 1
    this.getList();
  },
  async getList(isRefresh){
    try {
      isRefresh  === 'first' && (this.spainnerLoading = true)
      this.loading = true
      const params = { page: this.pageInfo.page, size: this.pageInfo.size }
      const { code, data } = await this.$homeApi.postTypeList(params)
      console.log(code, CODES.SUCCESS, data, 'postTagListPage')
      if(code === CODES.SUCCESS){
        this.categoryMetaData = data.categoryMetaData || this.categoryMetaData 
        if(isRefresh){
          this.typeList = data.data
          this.refreshing = false
        } else {
          this.typeList = [ ...this.typeList, ...data.data]
          this.loading = false
        }
        if(data.data.length === 0){
          this.finished = true
        }
      }
    } catch (error) {
      console.error(error)
    } finally {
      console.log(this.dataList,'list')
      this.spainnerLoading = false
      this.loading = false
      this.refreshing = false
    }
  },
  onRefresh() {
    this.pageInfo.page = 1
    this.getList(true);
  }
}
}
</script>
<style lang="less" scoped>
.thumb{
  display: flex;
  flex-wrap: wrap;
  // justify-content: space-between;
}
.van-pull-refresh{
overflow: visible;
}
.color{
  color: var(--text-color3, rgba(96, 105, 128, 0.40));
  font-size: 15px;
}
.main-bottom{
  margin-bottom: 50px;
}
</style>