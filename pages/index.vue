<template>
    <div class="home">
      <HeaderTop @refresh="onRefresh" :tagList="tagList"  id="home-top"></HeaderTop>
      
      <div class="loading-box" v-if="spainnerLoading">
        <cardLoad></cardLoad>
      </div>
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh" class="paddingTop52">
         <!-- <p>刷新次数: {{ count }}</p> -->
        <van-list
          v-model="loading"
          :finished="finished"
          :finished-text="$t('str_no_more')"
          :immediate-check='false'
          @load="onLoad"
        >
          <Cover v-for="item in dataList" :item="item" :key="item.vodId"></Cover>
        </van-list>
      </van-pull-refresh>
    </div>
</template>
<script>
import HeaderTop from '~/components/header/top.vue'
import Cover from '~/components/cover'
import cardLoad from "~/components/skeleton/cardLoad.vue"
import CODES from "~/plugins/enums/codes"
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
        size: 20
      },
      tagList:[]
    }
  },
  created(){
    this.getList('first')
  },
  components: {
    HeaderTop,
    Cover,
    cardLoad
  },
  async asyncData({ $homeApi }) {
    const res = await $homeApi.requestvodpageHome({ page: 1, size: 20})
    const res1 = await $homeApi.postTagListPage({ page: 1, size: 10})
    const { data } = res
    return { 
      tagList: res1.data.data,
      dataList: data.data 
    }
  },
  methods: {
    onLoad(){
      this.pageInfo.page += 1
      this.getList();
    },
    async getList(isRefresh ){
      try {
        isRefresh  === 'first' && (this.spainnerLoading = true)
        // this.loading = true
        const res = await this.$homeApi.requestvodpageHome({ page: this.pageInfo.page, size: this.pageInfo.size})
        const { code, data } = res
        
        if(code == CODES.SUCCESS && data){
          if(isRefresh){
            this.dataList = data.data
            this.refreshing = false
          } else {
            this.dataList = [ ...this.dataList, ...data.data]
            this.loading = false
          }
         console.log( code, data, this.dataList, 'data' )
          if(data.data.length === 0){
            this.finished = true
          }
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
</style>