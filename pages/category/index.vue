<template>
  <div class="home">
    <HeaderTop @refresh="onRefresh"></HeaderTop>
    <!-- <Nav :title="$t('str_menu_type_all')" text></Nav> -->
    <nav-new :title="$t('str_menu_type_all')" :imgUrl="require('~/static/images/my_gn_fenlei_1.svg')"></nav-new>
    <div class="loading-box" v-if="spainnerLoading">
      <tagLoad></tagLoad>
    </div>
    <template v-if="typeList.length">
      <van-pull-refresh class="paddingTop88" v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          :finished-text="$t('str_no_more')"
          @load="onLoad"
          :immediate-check="false"
          :offset="10"
        >
          <div class="thumb">
            <Thumb :tag="tag" v-for="tag in typeList" :key="tag.id"></Thumb>
          </div>
          <!-- <Cover v-for="item in dataList" :item="item" :key="item.vodId"></Cover> -->
        </van-list>
      </van-pull-refresh>
    </template>
    <Empty v-else></Empty>   
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
  justify-content: space-between;
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