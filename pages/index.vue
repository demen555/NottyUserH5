<template>
  <div class="home">
      <HeaderTop @refresh="onRefresh"  id="home-top"></HeaderTop>
      <van-pull-refresh v-model="refreshing" class="paddingTop52" @refresh="onRefresh" >
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
export default {
  name: 'IndexPage',
  components:{
    HeaderTop
  },
  data(){
    return{
      spainnerLoading: true,// 全局loading层
      loading: false, // 是否处于加载状态
      finished: false, // 是否加载完成
      refreshing: false, // 当前是否刷新重置信息
      dataList: [],
    }
  },
  async asyncData ({ $homeApi }) {
    const pageInfo = {
      page: 1,
      size: 20
    }
    const res = await $homeApi.requestvodpageHome(pageInfo);
    if( res.code == 200 ){
      return {
        dataList: res.data.data,
        pageInfo: pageInfo
      }
    }
  },

  methods:{
    onLoad(){
      this.pageInfo.page += 1
      this.getList();
    },
    async getList(isRefresh){
      try {
        this.spainnerLoading = true;
        const res = await this.$homeApi.requestvodpageHome(this.pageInfo) 
        const { code, data } = res
        if(code === 200 && data.data){
         if(isRefresh){
            this.dataList = data.data
            this.refreshing = false
          } else {
            this.dataList = [ ...this.dataList, ...data.dat]
            this.loading = false
          }
          this.loading = false
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

