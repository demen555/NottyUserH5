<template>
  <div class="search-page"  id="search">
    <HeaderTop ref="header" v-show="!searchShow"></HeaderTop>
    <div class="search" ref="search" v-if="searchShow">
      <!-- <div class="search-img" @click="handleGoHome"><img class="svg-icon" :src="themeChecked? require('~/static/images/com_jt_sx_zuo.svg'): require('~/static/images/com_jt_sx_zuo_rj.svg')" alt=""></div> -->
      <div class="search-btn">
        <!-- <input ref="searchRef" v-model="search" placeholder="搜索什么" class="search-input" type="text" @keyup.enter="handleSearch"> -->
        <form action="javascript:return true">
          <input ref="searchRef" type="search"  :placeholder="$t('str_search_something')" class="search-input" autofocus @keyup.enter="handleSearch" v-model="search"/>
        </form>
        <img @click="handleFocus" class="header-common search-icon" :src="themeChecked? require('~/static/images/com_sousuo_1.svg'): require('~/static/images/com_sousuo_rj.svg')" alt="com_sousuo_1">
        <img v-show="search" @click="handleReset" class="header-common com-close svg-icon" :src="themeChecked? require('~/static/images/com_sousuo_guanbi_1.svg'): require('~/static/images/com_sousuo_guanbi_rj.svg')" alt="com_sousuo_guanbi_1">
      </div>
      <div class="search-cancel" @click="handleGoHome">{{ $t('str_cancel') }}</div>
    </div>
    <main v-show="searchShow">
      <div class="search-card">
        <div class="search-card-top">
          <div class="search-title">{{ $t('str_search_his_title') }}</div>
          <div class="search-clear" @click="handleClearCurrentHistory">{{ $t('str_search_clear') }}</div>
        </div>
        <div class="search-list-new">
          <div  class="search-list-li" v-for="(item,index) in sliceHistoryList" :key="item">
            <div @click="handleGoToResult(item)" >{{ item }}</div>
            <img @click="handleClearHistory(index)" class="header-common svg-icon" :src="themeChecked? require('~/static/images/com_sousuo_guanbi_1.svg'): require('~/static/images/com_sousuo_guanbi_rj.svg')" alt="com_sousuo_guanbi_1">
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
        <div class="search-list">
          <a @click="handleGoToResult(item)" v-for="(item, index) in keysList" :key="index">{{ item }}</a>
        </div>
      </div>
    </main>
    <main v-show="!searchShow">
      <div class="search-result" id="searchName">{{ search }}</div>
      <div class="loading-box" style="margin-top: 40px;" v-if="spainnerLoading">
        <cardLoad></cardLoad>
      </div>
      <div class="content">
        <template v-if="dataList.length">
          <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
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
        </template>
        <Empty v-else></Empty>
      </div>
    </main>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import commonMinxin from '~/plugins/mixins/common'
import Cover from '@/components/cover'
import Empty from '@/components/empty'
import { uniArray } from '@/utils/format.js'
export default{
data() {
  return {
    search: '',
    keysList: [],
    historyList: [],
    historyList1: [],
    loading: true, // 是否处于加载状态
    finished: false, // 是否加载完成
    refreshing: false, // 当前是否刷新重置信息
    spainnerLoading: false, //骨架屏
    dataList: [],
    pageInfo: {
      page: 1,
      size: 20,
      total: 0
    }
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
  this.getHistoryList()
  this.initKyesList()
  console.log(1111)
},
components: {
  Cover,
  Empty
},
activated(){
  const isRefresh = this.$route.params.refresh;
  if( isRefresh ){
    this.search = ''
    this.set_show(true)
    this.handleFocus();
  }
},

watch: {
  searchShow(val){
    if(val){
      this.$nextTick(() => {
        this.handleFocus()
      })
    }
  }
},

methods: {
  ...mapActions(['set_show']),
  onLoad(){
    console.log(this.loading, this.pageInfo, 'onLoad')
    // if(!this.loading){
      this.pageInfo.page += 1
      this.initSearchVideoList();
    // }
  },
  handleFocus(){
    this.$refs.searchRef && this.$refs.searchRef.focus()
  },
  getHistoryList(){
    if(process.client) {
      const list = JSON.parse(localStorage.getItem('historyList') || '[]')
      this.historyList1 = list
      this.historyList = list.length > 5 ? list.slice(1, list.length) : list
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
  async initSearchVideoList(isRefresh){
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
        this.pageInfo.total = data.meta.pagination.total
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
      this.spainnerLoading = false
      this.refreshing = false
      this.loading = false
    }
  },
  onRefresh() {
    console.log('onRefresh')
    this.pageInfo.page = 1
    this.initSearchVideoList(true);
  },
  handleSearch(){
    if(this.search){
      this.historyList.unshift(this.search)
      this.historyList = Array.from(new Set(this.historyList))
      localStorage.setItem('historyList', JSON.stringify(this.historyList))
      // this.handleReset()
      this.set_show(false)
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
    localStorage.setItem('historyList', JSON.stringify(this.historyList))
    this.set_show(false)
    this.initSearchVideoList('first')
    // this.$router.push({
    //   name: 'result',
    //   query: {
    //     search: '中文字幕'
    //   }
    // })
  },
  handleGoHome(){
    this.$router.go('-1')
  }
}
}
</script>
<style lang="less" scoped>
.search{
  // width: 90%;
  margin: 0 12px;
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
.search-img{
  width: 16px;
  height: 16px;
  display: flex;
}
.search-btn{
  width: 306px;
  font-size: 14px;
  position: relative;
  display: flex;
  align-items: center;
}
.search-input{
  width: 294px;
  background-color: var(--bg-color3);
  border-radius: 16px;
  text-indent: 2.5em;
  color: var(--text-color2);
  height: 32px;
  border: none;
}
input::placeholder{
  color: var(--text-color2);
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
  color: var(--text-color2);
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
    color: var(--text-color2);
    font-size: 12px;
  }
}
.search-title{
  color: var(--text-color1);
  font-size: 16px;
  font-weight: bold;
}
.search-list-new{
  color: var(--text-color2);
  font-size: 14px;
  .search-list-li{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 8px;
  }
}
.search-list{
  color: var(--text-color2);
  font-size: 12px;
  display: flex;
  flex-wrap: wrap;
}
.search-list a{
  margin-top: 8px;
  padding: 3.5px 8px;
  background-color: var(--bg-color2);
  margin-right: 8px;
  font-size: 12px;
  border-radius: 4px;
  color: var(--text-color2);
}
.search-result{
  font-size: 14px;
  color: var(--text-color1);
  width: 90%;
  margin: 0 auto;
  padding-top: 55px; //遮盖元素的高度，即导航栏高度
  margin-bottom: -6px;
}
.search-result span{
  color: var(--bg-primary);
}
.search-page {
  z-index: 10;
}
</style>