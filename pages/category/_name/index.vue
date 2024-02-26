<template>
  <div class="home container-fluid">
    <HeaderTop @refresh="onRefresh"></HeaderTop>
    <NavNew :title="categoryMetaData.h1 || paramsName" :imgUrl="require('~/static/images/my_gn_fenlei_1.svg')"></NavNew>
    <div class="loading-box" v-if="spainnerLoading">
      <cardLoad></cardLoad>
    </div>
    <template v-if="dataList.length">
      <div style="height: 60px;" class="d-none d-md-block"></div>
      <!-- <van-pull-refresh class="paddingTop77" v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          :finished-text="$t('str_no_more')"
          @load="onLoad"
          :immediate-check="false"
          :offset="10"
        >
          <div class="row">
            <Cover class="col-sm-6 col-md-4 col-lg-3 col-xl-2" v-for="item in dataList" :item="item" :key="item.vodId"></Cover>
          </div>
        </van-list>
      </van-pull-refresh> -->
      <div class="row paddingTop77">
        <Cover class="col-sm-6 col-md-4 col-lg-3 col-xl-2" v-for="item in dataList" :item="item" :key="item.vodId"></Cover>
        <div class="pagination">
          <v-pagination :total="pageInfo.total" :current-page='pageInfo.page' @pagechange="handlePage"></v-pagination>
        </div>
        <fBottom></fBottom>
        <h2 class="footer-title paddingTop88" style="display: none;"> {{ categoryMetaData.h2}} </h2>
        <p class="footer-description" style="display: none;" v-html="categoryMetaData.footer_desc"> </p>
      </div>
    </template>
    <Empty v-else></Empty>   
  </div>
</template>
<script>
import NavNew from '~/components/nav/new'
import Cover from '~/components/cover'
import Empty from '~/components/empty'
import commonMinxin from '~/plugins/mixins/common'
import CODES from "~/plugins/enums/codes"


export default{
data() {
  return {
    spainnerLoading: false,
    loading: false, // 是否处于加载状态
    finished: false, // 是否加载完成
    refreshing: true, // 当前是否刷新重置信息
    dataList: [],
    pageInfo: {
      page: 1,
      size: 20
    },
    categoryMetaData:{},
    categoryName: "",
    paramsName: "",
  }
},
mixins: [commonMinxin],
computed: {
  txtTitle(){
    return  this.detail.name
  }
},
async asyncData({ $homeApi, params }) {
    const categoryName = '/category/' + params.name;
    const res = await $homeApi.requestvodpage({
      categoryName: categoryName,
      page: 1,
      size: 20
    })
   
    return {
      dataList: res.data.data || [],
      categoryMetaData: res.data.categoryMetaData || {
        "title": "",
        "description": "",
        "keywords": "",
        "h1": "",
        "h2": "",
        "footer_desc": ""
      },
      categoryName: categoryName,
      paramsName: params.name,
      pageInfo: {
        total: res.data.meta.pagination.total
      }
    }  
},
created(){
  let { name, id } = this.$route.params;
  // 首字母大写，- 转空格
  name = name.replace(/\-/g, ' ').replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
  this.detail = {
    name: name,
    id: id
  }
  // this.getList('first')
},
head(){
  const hostName = process.server ? this.$nuxt.context.req.headers.host.replace(/:\d+$/, '') : window.location.host;
  return {
      title: this.categoryMetaData.title,
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
components: {
  NavNew,
  Cover,
  Empty
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
    
      params.categoryName = this.categoryName //分类名称

      const { code, data } = await this.$homeApi.requestvodpage(params)
      if(code === CODES.SUCCESS){
        this.pageInfo.total = data.meta.pagination.total
        this.dataList = data.data
        this.categoryMetaData = data.categoryMetaData;
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
<style lang="less">
.van-pull-refresh{
  overflow: visible;
}
.color{
  color: var(--text-color3, rgba(96, 105, 128, 0.40));
  font-size: 15px;
}
:deep(.van-nav-bar__left){
  font-size: 18px;
}
.footer-title{
  font-size: 16px;
  color: var(--bg-primary, #F6D658);
  padding: 8px 16px;
  font-weight: normal;
}
.footer-description{
  font-size: 12px;
  color:white;
  padding: 8px 16px;
  a{
    color: var(--bg-primary, #F6D658);
    text-decoration: underline;
  }
  h2{
    color: var(--bg-primary, #F6D658);
  }
}
.paddingTop88{
  padding-top: 77px;
}
</style>