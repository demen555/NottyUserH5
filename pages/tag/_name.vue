<template>
  <div class="home container-fluid">
    <HeaderTop @refresh="onRefresh" v-show="isStickyVisible"></HeaderTop>
    <nav-new v-show="isStickyVisible" :title="tagNameData.name" :imgUrl="require('~/static/images/my_gn_biaoqian_1.svg')"></nav-new>
    <div class="loading-box" v-if="spainnerLoading">
      <cardLoad></cardLoad>
    </div>
    <template v-if="dataList.length">
      <div style="height: 60px;" class="d-none d-sm-block"></div>
      <div class="row paddingTop88 pc-content">
        <Cover class="col-sm-6 col-md-4 col-lg-3 col-xl-2" v-for="item in dataList" :item="item" :key="item.vodId"></Cover>
      </div>
      <div class="row">
        <div class="pagination">
          <v-pagination :total="pageInfo.total" :routeName="$route.name" :current-page='pageInfo.page' @pagechange="handlePage"></v-pagination>
        </div>
        <fBottom></fBottom>
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
fetchOnServer: true,
data() {
  return {
    spainnerLoading: false,
    loading: false, // 是否处于加载状态
    finished: false, // 是否加载完成
    refreshing: true, // 当前是否刷新重置信息
    dataList: [],
    tagNameData:{
      name: "",
    },
    pageInfo: {
      page: this.$route.query.page * 1 || 1,
      size: 24
    }
  }
},
head(){
  const hostName = process.server ? this.$nuxt.context.req.headers.host.replace(/:\d+$/, '') : window.location.host;
  return {
      title: this.tagNameData.seo_title,
      meta: [
          {
              hid: 'description',
              name: 'description',
              content: this.tagNameData.seo_description
          },
          {
              hid: 'keyswords',
              name: 'keyswords',
              content: this.tagNameData.seo_keywords
          },
          {
              hid: 'title',
              name: 'title',
              content: this.tagNameData.seo_title
          },
          { hid: 'og:title', property: 'og:title', content: this.tagNameData.seo_title },
          { hid: 'og:description', property: 'og:description', content:  this.tagNameData.seo_description },
          { hid: 'og:keywords', property: 'og:keywords', content: this.tagNameData.seo_keywords },
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
async asyncData({ $homeApi, route }) { 
  try {
    const res = await $homeApi.requestvodpage({
      page: route.query.name,
      size: 24,
      tagName: route.params.name
    })
    console.log(res.data, 'tagNameData')
    return { 
      dataList: res.data.data || [],
      tagNameData: res.data.tagNameData || {},
      pageInfo:{
        page: route.query.name,
        size: 24,
        total: res.data.meta.pagination.total
      }
    }
  } catch (error) {
    console.error(error)
  }
},
created(){
  const { name, id } = this.$route.params
  this.detail = {
    name: name,
    id: id
  }
  // this.getList('first')
},
components: {
  NavNew,
  Cover,
  Empty
},
methods: {

  async getList(isRefresh){
    try {
      isRefresh  === 'first' && (this.spainnerLoading = true)
      this.loading = true
      const params = { page: this.pageInfo.page, size: this.pageInfo.size }
      // params.tagId = this.detail.id //标签
      params.tagName = this.detail.name //标签
      const { code, data } = await this.$homeApi.requestvodpage(params)
      if(code === CODES.SUCCESS){
        this.pageInfo.total = data.meta.pagination.total
        this.dataList = data.data
        this.tagNameData = data.tagNameData
      }
    } catch (error) {
      console.error(error)
    } finally {
      console.log(this.dataList,'list')
      this.spainnerLoading = false
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