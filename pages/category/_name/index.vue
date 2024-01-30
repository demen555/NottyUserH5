<template>
  <div class="home">
    <HeaderTop @refresh="onRefresh"></HeaderTop>
    <NavNew :title="categoryMetaData.h1 "></NavNew>
    <div class="loading-box" v-if="spainnerLoading">
      <cardLoad></cardLoad>
    </div>
    <template v-if="dataList.length">
      <van-pull-refresh class="paddingTop77" v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          :finished-text="$t('str_no_more')"
          @load="onLoad"
          :immediate-check="false"
          :offset="10"
        >
          <Cover v-for="item in dataList" :item="item" :key="item.vodId"></Cover>
        </van-list>
      </van-pull-refresh>
      <h2 class="footer-title paddingTop88"> {{ categoryMetaData.h2}} </h2>
      <p class="footer-description" v-html="categoryMetaData.footer_desc"> </p>
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
    categoryMetaData:{}
  }
},
mixins: [commonMinxin],
computed: {
  txtTitle(){
    return  this.detail.name
  }
},
async asyncData({ $homeApi, params }) {
    const categoryName = params.name.replace(/\-/g, ' ').replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
    const res = await $homeApi.requestvodpage({
      categoryName: categoryName,
      page: 1,
      size: 20
    })
   
    return {
      dataList: res.data.data || [],
      categoryMetaData: res.data.categoryMetaData || {
        "title": null,
        "description": null,
        "keywords": null,
        "h1": null,
        "h2": null,
        "footer_desc": null
      }
    }  
},
activated(){
  const isRefresh = this.$route.params.refresh;
  if( isRefresh ){
    this.getList('first')
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
    
    link: [
      {
        rel: 'canonical',
        href: `${hostName}${this.$nuxt.context.route.fullPath}`,
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
    
      params.categoryName = this.detail.name //分类名称

      const { code, data } = await this.$homeApi.requestvodpage(params)
      if(code === CODES.SUCCESS){
        if(isRefresh){
          // this.dataList = [ ...body.records, ...this.dataList ]
          this.dataList = data.data;
          this.refreshing = false
        } else {
          this.dataList = [ ...this.dataList, ...data.data]
          this.loading = false
        }
        this.categoryMetaData = data.categoryMetaData;
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
<style lang="less">
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
:deep(.van-nav-bar__left){
  font-size: 18px;
}
.footer-title{
  font-size: 16px;
  color: var(--bg-primary, #F6D658);
  padding: 0 16px;
  font-weight: normal;
}
.footer-description{
  font-size: 12px;
  color:white;
  padding: 0 16px;
}
.paddingTop88{
  padding-top: 77px;
}
</style>