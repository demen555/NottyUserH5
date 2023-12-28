<template>
  <div class="home">
    <HeaderTop @refresh="onRefresh"  id="home-top"></HeaderTop>
    <div class="loading-box" v-if="spainnerLoading">
      <cardLoad></cardLoad>
    </div>
    <!-- <van-pull-refresh v-model="refreshing" @refresh="onRefresh" class="paddingTop52">
      <van-list
        v-model="loading"
        :finished="finished"
        :finished-text="$t('str_no_more')"
        :immediate-check='false'
        @load="onLoad"
      >
        <Cover v-for="item in dataList" :item="item" :key="item.vodId"></Cover>
      </van-list>
    </van-pull-refresh> -->
    <div class="video-list paddingTop52" >
      <Cover v-for="item in dataList" :item="item" :key="item.vodId"></Cover>
      <div class="home-footer">
        <!-- <van-pagination class="pagination" @change="handleChanege" v-model="pageInfo.page" :total-items="pageInfo.total" pages="[1,2,3,4,5]" :page-count="pageInfo.total" :show-page-size="4" force-ellipses >
          <template #prev-text>
            Prev
          </template>
          <template #page="{ number,text, active }">{{ handlePage(number, text, active) }}</template>
        </van-pagination> -->
        <v-pagination :total="pageInfo.total" :current-page='pageInfo.page' @pagechange="handlePage"></v-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex"
import HeaderTop from '~/components/header/top.vue'
import Cover from '~/components/cover'
import cardLoad from "~/components/skeleton/cardLoad.vue"
import CODES from "~/plugins/enums/codes"
import vPagination from '~/components/pagination/index.vue'
export default{
data() {
  return {
    spainnerLoading: true,// 全局loading层
    loading: false, // 是否处于加载状态
    finished: false, // 是否加载完成
    refreshing: false, // 当前是否刷新重置信息
    dataList: [],
    pageInfo: {
      page: 1,
      size: 10
    },
    footerList: [
      { name: 'CSAM Policy', id: 'policy-csam'},
      { name: 'Content Removal', id: 'policy-content'},
      { name: 'DMCA', id: 'policy-terms'},
      { name: 'NCC Policy', id: 'policy-ncc'},
      { name: '2257', id: 'policy-2257'},
      { name: 'EU DSA', id: 'policy-eu'},
    ],
    hostname: ''
  }
},
computed: {
  ...mapGetters(['theme']),
  themeChecked(){
    return this.theme === 'dark'
  }
},
created(){
  if(process.client){
    this.hostname = window.location.hostname
  }
  this.getList('first')
},
components: {
  HeaderTop,
  Cover,
  cardLoad,
  vPagination
},
watch: {
  ['pageInfo.page'](val){
    console.log(val, 'watch')
    this.pageInfo.page = val
    this.getList();
    this.handleScroll()
    // this.onLoad()
  }
},
// async asyncData({ $homeApi }) {
//   const res = await $homeApi.requestvodpageHome({ page: 1, size: 20})
//   const { data } = res
//   return { dataList: data.data }
// },
methods: {
  handlePage(val){
    this.pageInfo.page = val
    this.getList();
    this.handleScroll()
    console.log(val, 'page')
  }, 
  handleScroll() {
    if(process.client){
      const target = document.querySelector('#home-top')
      target.scrollIntoView({ behavior: 'smooth',  block: "start" })
    }
  },
  handleClickPage(name){
    this.$router.push({
      name
    })
  },
  onLoad(){
    this.pageInfo.page += 1
    this.getList();
  },
  async getList(isRefresh ){
    try {
      this.spainnerLoading = true
      isRefresh  === 'first' && (this.spainnerLoading = true)
      // this.loading = true
      const res = await this.$homeApi.requestvodpageHome({ page: this.pageInfo.page, size: this.pageInfo.size})
      const { code, data } = res
      if(code == CODES.SUCCESS && data){
        this.pageInfo.total = data.meta.pagination.total
        this.dataList = data.data
        console.log( code, data, this.dataList, 'data' )
      }
    } catch (error) {
      console.error(error)
    } finally {
      this.spainnerLoading = false
    }
  },
  onRefresh() {
    this.pageInfo.page = 1
    this.getList(true);
  },
}
}
</script>
<style lang="less">
.van-pull-refresh{
overflow: visible;
}
.color{
  color: var(--text-color3);
  font-size: 15px;
}
.video-list{
  // touch-action: none
}
.home-footer{
  padding: 0 12px;
  color: var(--text-color2);
  // position: fixed;
  // bottom: 0;
  // left: 0;
  // right: 0;
  // z-index: 9999;
  background-color: var(--bg-color1);
  // padding-bottom: 24px;
}
.pagination{
  margin-top: 12px !important;
  margin-bottom: 12px !important;
}
</style>