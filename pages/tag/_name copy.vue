<template>
  <div class="home container-fluid">
    <HeaderTop @refresh="onRefresh" ></HeaderTop>
    <nav-new :title="txtTitle" :imgUrl="require('~/static/images/my_gn_biaoqian_1.svg')"></nav-new>
    <div class="loading-box" v-if="spainnerLoading">
      <cardLoad></cardLoad>
    </div>
    <template v-if="dataList.length">
      <div style="height: 60px;" class="d-none d-sm-block"></div>
      <van-pull-refresh class="paddingTop88" v-model="refreshing" @refresh="onRefresh">
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
      </van-pull-refresh>
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
    }
  }
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
    
      // params.tagId = this.detail.id //标签
      params.tagName = this.detail.name //标签


      const { code, data } = await this.$homeApi.requestvodpage(params)
      if(code === CODES.SUCCESS){
        if(isRefresh){
          // this.dataList = [ ...body.records, ...this.dataList ]
          this.dataList = data.data
          this.refreshing = false
        } else {
          this.dataList = [ ...this.dataList, ...data.data]
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
.paddingTop88{
  padding-top: 77px;
}
</style>