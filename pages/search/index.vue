<template>
  <div class="search-page container-fluid"  id="search">
    <HeaderTop ref="header" v-show="!searchShow"></HeaderTop>
    <div class="search" ref="search" v-show="searchShow">
      <div class="search-btn search-btn-page">
        <form action="javascript:return true">
          <input ref="searchRef" type="search"  :placeholder="$t('str_search_something')" class="search-input" autofocus @keyup.enter="handleSearch" v-model="search"/>
        </form>
        <img @click="handleFocus" class="header-common search-icon" :src="themeChecked? require('~/static/images/com_sousuo_1.svg'): require('~/static/images/com_sousuo_rj.svg')" alt="com_sousuo_1">
        <img v-show="search" @click="handleReset" class="header-common com-close svg-icon" :src="themeChecked? require('~/static/images/com_sousuo_guanbi_1.svg'): require('~/static/images/com_sousuo_guanbi_rj.svg')" alt="com_sousuo_guanbi_1">
      </div>
      <div class="search-cancel cursor-pointer" @click="handleGoHome">{{ $t('str_cancel') }}</div>
    </div>
    <main v-show="searchShow">
      <template>
        <div class="search-card">
          <div class="search-card-top">
            <div class="search-title cursor-pointer">{{ $t('str_search_his_title') }}</div>
            <div class="search-clear cursor-pointer" @click="handleClearCurrentHistory"><img class="header-common" :src="require('~/static/images/com_delete.svg')" alt="com_delete"></div>
          </div>
          <!-- 移动版布局 -->
          <div class="search-list-new d-sm-none">
            <div class="search-list-li" v-for="(item,index) in sliceHistoryList" :key="item">
              <div @click="handleGoToResult(item)" class="cursor-pointer">{{ item }}</div>
              <img @click="handleClearHistory(index)" class="header-common svg-icon cursor-pointer" :src="themeChecked? require('~/static/images/com_sousuo_guanbi_1.svg'): require('~/static/images/com_sousuo_guanbi_rj.svg')" alt="com_sousuo_guanbi_1">
            </div>
          </div>
          <!-- pc版布局 -->
          <div class="d-none d-sm-block">
            <div class="search-list-new-pc">
              <div class="search-list-li" v-for="(item,index) in sliceHistoryList" :key="item">
                <div @click="handleGoToResult(item)" class="cursor-pointer">{{ item }}</div>
                <img style="margin-left: 13px; margin-right: 24px;" @click="handleClearHistory(index)" class="header-common svg-icon cursor-pointer" :src="themeChecked? require('~/static/images/com_sousuo_guanbi_1.svg'): require('~/static/images/com_sousuo_guanbi_rj.svg')" alt="com_sousuo_guanbi_1">
              </div>
            </div>
          </div>
          <!-- 第一版 -->
          <!-- <div class="search-list">
            <a @click="handleGoToResult(item)" v-for="item in historyList" :key="item">{{ item }}</a>
          </div> -->
        </div>
        <div class="search-card">
          <!-- <div class="search-card-top">
            <div class="search-title">{{ $t('str_rec_title') }}</div>
          </div>
          <div class="search-list-new">
            <div  class="search-list-li" v-for="item in keysList" :key="item.searchKey">
              <div @click="handleGoToResult(item.searchWord)" >{{ item.searchWord }}</div>
            </div>
          </div> -->
          <!-- 第一版 -->
          <div class="search-title">{{ $t('str_rec_title') }}</div>
          <div style="height: 16px;" class="d-none d-sm-block"></div>
          <div class="search-list">
            <a class="cursor-pointer" @click="handleGoToResult(item)" v-for="(item, index) in keysList" :key="index">{{ item }}</a>
          </div>
        </div>
      </template>
      <!-- 无搜索结果 -->
      <!-- <template v-else>
        <div class="no-match">{{ $t('str_related_no') }}</div>
        <div class="no-match-link">
          <div class="no-match-title">{{ $t('str_related_videos') }}</div>
          <div class="loading-box" style="margin-top: -45px;" v-if="relatedLoading">
            <cardLoad></cardLoad>
          </div>
          <div class="no-match-list">
            <Cover v-for="item in relatedList" :item="item" :key="item.vodId"></Cover>
          </div>
        </div>
      </template> -->
    </main>
    <main v-show="!searchShow">
      <!-- 有搜索结果 -->
      <NavNew :title="search + ' ' + '('+ pageTotal + ' results' + ')'" imgUrl=""></NavNew>
      <!-- <div class="search-result" id="searchName">{{ search }}</div> -->
      <div class="loading-box" style="margin-top: 42px;" v-if="spainnerLoading">
        <cardLoad></cardLoad>
      </div>
      <div class="content paddingTop88">
        <template v-if="dataList.length">
          <div class="row">
            <Cover class="col-sm-6 col-md-4 col-lg-3 col-xl-2" v-for="item in dataList" :item="item" :key="item.vodId"></Cover>
          </div>
          <!-- <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :finished="finished"
              :finished-text="$t('str_no_more')"
              @load="onLoad"
              :immediate-check="false"
              :offset="30"
            >
              <div class="row">
                <Cover class="col-sm-6 col-md-4 col-lg-3 col-xl-2" v-for="item in dataList" :item="item" :key="item.vodId"></Cover>
              </div>
            </van-list>
          </van-pull-refresh> -->
        </template>
        <template v-if="!dataList.length">
          <div class="no-match-empty"><img src="~/static/images/com_qsy_nothing.svg" alt="com_qsy_nothing"></div>
          <div class="no-match">{{ $t('str_related_no') }}</div>
          <div class="no-match-link">
            <div class="no-match-title">{{ $t('str_related_videos') }}</div>
            <div class="no-match-list">
              <div class="row">
                <Cover class="col-sm-6 col-md-4 col-lg-3 col-xl-2" v-for="item in relatedList" :item="item" :key="item.vodId"></Cover>
              </div>
              <!-- <Cover v-for="item in relatedList" :item="item" :key="item.vodId"></Cover> -->
            </div>
          </div>
        </template>
        <!-- <Empty v-else></Empty> -->
        <div class="row">
          <div class="pagination" v-if="dataList.length">
            <v-pagination :total="pageTotal? pageTotal : pageInfoTotal" :current-page='pageInfo.page' @pagechange="handlePage"></v-pagination>
          </div>
          <fBottom></fBottom>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import commonMinxin from '~/plugins/mixins/common'
import Cover from '@/components/cover'
import Empty from '@/components/empty'
import NavNew from '~/components/nav/new'
import CODES from "~/plugins/enums/codes"
import { uniArray } from '@/utils/format.js'
export default{
data() {
  return {
    search: '',
    keysList: [],
    historyList: [],
    historyList1: [],
    noResultShow: false, //没有搜索结果阀值
    loading: true, // 是否处于加载状态
    finished: false, // 是否加载完成
    refreshing: false, // 当前是否刷新重置信息
    spainnerLoading: false, //骨架屏
    dataList: [],
    relatedList: [], //相关推荐数据
    pageInfo: {
      page: 1,
      size: 24
    },
    pageTotal: 0,
    relatedLoading: false,
    searchBool: false,
    pageInfoTotal: 0
  }
},
mixins: [commonMinxin],
computed: {
  ...mapGetters(['searchShow']),
  sliceHistoryList(){
    return this.historyList.slice(0,5)
  },
},
created(){
  if(!this.searchShow){
    this.search = localStorage.getItem('search') || ''
  }
  // this.set_show(true)
  if(process.client) {
    if(localStorage.getItem('searchBool')){
      this.getList()
    }
    this.searchBool = localStorage.getItem('searchBool')
    console.log(this.searchBool, 'created')
    // this.set_show(localStorage.getItem('searchBool'))
  }
  this.getHistoryList()
  this.initKyesList()
  console.log(1111)
},
components: {
  Cover,
  Empty,
  NavNew
},
head(){
  const hostName = process.server ? this.$nuxt.context.req.headers.host.replace(/:\d+$/, '') : window.location.host;
  return {
    
    link: [
      {
        rel: 'canonical',
        href: `https://${hostName}${this.$nuxt.context.route.fullPath}`,
      },
    ],
    title: "Search for Free Porn Videos | Nottyhub.com",
    meta:[
      { hid: "title", name: 'title', content: "Search for Free Porn Videos | Nottyhub.com" },
      { hid: "description", name: 'description', content: "Search free porn videos, xxx adult porno on Nottyhub.com. Browse your interests with collection of videos. Fantasy and Pleasure like never before." },
      { hid: "keywords", name: 'keywords', content: "Search Free Porn Videos" },
      { property: 'og:title', content: "Search for Free Porn Videos | Nottyhub.com" },
      { property: 'og:description', content: "Search free porn videos, xxx adult porno on Nottyhub.com. Browse your interests with collection of videos. Fantasy and Pleasure like never before." },
      { property: 'og:keywords', content: "Search Free Porn Videos" },
    ]
  }
},
// activated(){
//   const isRefresh = this.$route.params.refresh;
//   if( isRefresh ){
//     this.search = ''
//     this.set_show(true)
//     this.handleFocus();
//   }
// },
beforeDestroy(){
  console.log('beforeDestroy')
  if(process.client) {
    if(!['search___en', 'search___pt'].includes(this.$route.name)) {
      localStorage.removeItem('search')
      localStorage.removeItem('searchBool')
    }
  }
}, 
watch: {
  searchShow(val){
    if(val){
      console.log(val, 'watch searchShow')
      this.search = ''
      this.$nextTick(() => {
        this.handleFocus()
      })
    }
  }
},
methods: {
  ...mapActions(['set_show']),
  // onLoad(){
  //   console.log(this.loading, this.pageInfo, 'onLoad')
  //   // if(!this.loading){
  //     this.pageInfo.page += 1
  //     this.getList();
  //   // }
  // },
  handleFocus(){
    this.$refs.searchRef && this.$refs.searchRef.focus()
  },
  getHistoryList(){
    if(process.client) {
      const list = JSON.parse(localStorage.getItem('historyList') || '[]')
      this.historyList1 = list
      this.historyList = list.length > 4 ? list.slice(0, 5) : list
    } else {
      this.historyList = []
    }
    console.log(this.historyList, 'getHistoryList')
  },
  handleClearCurrentHistory(){
    if(this.historyList.length){
      this.historyList.splice(0,5)
      localStorage.setItem('historyList', JSON.stringify(this.historyList))
      this.getHistoryList()
    }
  },
  handleClearHistory(index){
    if(this.historyList.length){
      this.historyList.splice(index, 1)
      localStorage.setItem('historyList', JSON.stringify(this.historyList))
      this.getHistoryList()
    }
    console.log(index, 'index')
  },
  async getRelatedList(){
    try {
      this.relatedLoading = true
      // this.loading = true
      const res = await this.$homeApi.requestvodpageHome({ page: this.pageInfo.page, size: 24})
      const { code, data } = res
      if(code == CODES.SUCCESS && data){
        // this.relatedList = data.data
        // 定义一个包含多个对象的数组
        // var arr = [obj1, obj2, ...]; // 这里的 obj1、obj2 等表示要存放在数组中的对象
        // 创建一个空数组用于保存随机选取的对象
        const arr = data.data
        var resultArr = [];
        while (resultArr.length < 10) {
            var randomIndex = Math.floor(Math.random() * arr.length);           
            if (!resultArr.some((item) => item === arr[randomIndex])) {
                resultArr.push(arr[randomIndex]);
            }
        }
        console.log(resultArr, 'resultArr')
        this.pageInfoTotal = data.meta.pagination.total
        this.relatedList = resultArr
      }
    } catch (error) {
      console.error(error)
    } finally {
      this.spainnerLoading = false
      this.relatedLoading = false
    }
  },
  async getList(isRefresh){
    try {
      isRefresh === 'first' && (this.spainnerLoading = true)
      this.loading = true
      const params = {
        page: this.pageInfo.page,
        size: this.pageInfo.size,
        // search: Base64.encode(this.search)
        search:this.search
      }
      console.log(params, 'params')
      console.log(this.pageInfo, 'pageInfo')
      const res = await this.$homeApi.requestvodpageSearch(JSON.stringify(params)) 
      console.log(res, 'initSearchVideoList')
      const { code, data = {} } = res
      console.log(code, data, 111)
      if(code === 100){
        if (!data) return this.loading = false
        this.pageTotal = data.meta.pagination.total
        if(data.meta.pagination.total == 0) {
          // this.noResultShow = true
          // this.set_show(true)
          this.getRelatedList()
          this.spainnerLoading = true
          return 
        } else {
          this.spainnerLoading = false
          // this.noResultShow = false
          // this.set_show(false)
        }
        if(isRefresh){
          // this.dataList = [ ...body.records, ...this.dataList ]
          this.dataList = data.data || []
          this.refreshing = false
        } else {
          this.dataList = uniArray([ ...this.dataList, ...data.data], 'vodId') || []
          // this.dataList = body.records || []
          this.loading = false
        }
        if(data.data.length === 0){
          this.finished = true
        }
      } else {
        this.dataList = []
        if(this.dataList.length === 0){
          this.finished = true
        }
        this.loading = false
      }
    } catch (error) {
      console.error(error)
    } finally {
      // this.spainnerLoading = true
      this.refreshing = false
      this.loading = false
    }
  },
  // onRefresh() {
  //   console.log('onRefresh')
  //   this.pageInfo.page = 1
  //   this.getList(true);
  // },
  handleSearch(){
    if(this.search){
      this.historyList.unshift(this.search)
      this.historyList = Array.from(new Set(this.historyList))
      // this.handleReset()
      this.handleGoToResult(this.search)
      this.$refs.searchRef.blur();//关闭手机软键盘
      // this.handleReset()
      // this.search = ''
    }
  },
  async initKyesList(){
    try {
      const params = { size: 20 }
      const res = await this.$searchApi.postSearchKeys(JSON.stringify(params))
      console.log(res, 'initKyesList')
      if(res.code === 100){
        this.keysList = res.data
      }
    } catch (error) {
      console.error(error)
    }
  },
  handleReset(){
    this.search = ''
    if(!this.searchShow){
      this.set_show(true)
      this.$refs.searchRef.focus();
    }
  },
  handleGoToResult(search){
    console.log(search, 'search')
    gtag('event', 'view_search_results', {
        keyword: search,
    });
    

    this.dataList = []
    this.search = search
    this.historyList.unshift(this.search)
    this.historyList = Array.from(new Set(this.historyList))
    if(process.client){
      localStorage.setItem('historyList', JSON.stringify(this.historyList))
      localStorage.setItem('search', this.search)
      localStorage.setItem('searchBool', true)
    }
    this.set_show(false)
    this.getList('first')
  },
  handleGoHome(){
    this.$router.go('-1')
  }
}
}
</script>
<style lang="less" scoped>
.search{
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  height: 32px;
  align-items: center;
  margin-top: 8px;
  z-index: 66;
  // padding-top: 68px; //遮盖元素的高度，即导航栏高度
  // padding-bottom: 20px;
  // margin-top:-55px;
  .van-pull-refresh__head{
    z-index: -1;
  }
}
.svg-icon{
  cursor: pointer;
}
.no-match{
  text-align: center;
  // padding-top: 16px;
}
.no-match-empty{
  display: flex;
  align-items: center;
  justify-content: center;
}
.no-match-link{
  margin-top: 40px;
  .no-match-title{
    // padding-left: 16px;
  }
  .no-match-list{
    margin-bottom: 14px;
  }
}
.search-img{
  width: 16px;
  height: 16px;
  display: flex;
}
.search-btn{
  width: 90%;
  // width: 100%;
  font-size: 14px;
  position: relative;
  display: flex;
  align-items: center;
}
.search-input{
  width: 70vw;
  background-color: var(--bg-color3, rgba(246, 214, 88, 0.1));
  border-radius: 16px;
  text-indent: 2.5em;
  color: var(--bg-secondry,  #FD46F6);
  height: 32px;
  border: 1PX solid var(--bg-primary, #F6D658);
}
input::placeholder{
  color: var(--bg-secondry,  #FD46F6);
}
.com-sousuo{
  position: absolute;
  left: 12px;
  top: 8px;
  width: 16px;
  height: 16px;
}
.search-icon{
  position: absolute;
  left: 12px;
  top: 8px;
  width: 16px;
  height: 16px;
  cursor: pointer;
}
.search-cancel{
  font-size: 14px;
  color: var(--text-color2,  rgba(255, 255, 255, 0.70));
}
.com-close{
  position: absolute;
  right: 32px;
  top: 8px;
  width: 16px;
  height: 16px;
  cursor: pointer;
}
.search-card{
  width: 90%;
  margin: 0 auto;
  margin-top: 16px;
}
.search-card-top{
  display: flex;
  align-items: center;
  justify-content: space-between;
  .search-clear {
    color: var(--text-color2,  rgba(255, 255, 255, 0.70));
    font-size: 12px;
  }
}
.search-title{
  color: var(--text-color1, #FFFFFF);
  font-size: 16px;
  font-weight: bold;
}
.search-list-new{
  color: var(--text-color2,  rgba(255, 255, 255, 0.70));
  font-size: 14px;
  .search-list-li{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 8px;
  }
}
.search-list-new-pc{
  color: var(--text-color2,  rgba(255, 255, 255, 0.70));
  font-size: 14px;
  display: flex;
  margin-top: 24px;
  margin-bottom: 40px;
  .search-list-li{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 8px;
  }
}
.search-list{
  color: var(--text-color2,  rgba(255, 255, 255, 0.70));
  font-size: 14px;
  display: flex;
  flex-wrap: wrap;
}
.search-list a{
  margin-top: 8px;
  padding: 3.5px 8px;
  background-color: var(--bg-color2, rgba(255, 255, 255, 0.06));
  margin-right: 8px;
  font-size: 14px;
  border-radius: 4px;
  color: var(--text-color2,  rgba(255, 255, 255, 0.70));
}
.search-result{
  font-size: 14px;
  color: var(--text-color1, #FFFFFF);
  width: 90%;
  margin: 0 auto;
  margin-top: 55px; //遮盖元素的高度，即导航栏高度
  // margin-bottom: -6px;
}
.search-result span{
  color: var(--bg-primary, #F6D658);
}
.search-page {
  z-index: 10;
}
.header-common{
  cursor: pointer;
}
</style>