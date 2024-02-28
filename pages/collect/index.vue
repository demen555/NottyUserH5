<template>
  <div class="collect container-fluid">
    <HeaderTop @refresh="onRefresh"></HeaderTop>
    <client-only>
    <Nav @handleControl="handleControl" :imgUrl="require('~/static/images/my_gn_wdsc_1.svg')" :title="$t('str_collect')" :text="dataList.length ? true : false"></Nav>
    </client-only>
    <div class="loading-box" v-if="spainnerLoading">
      <cardLoad></cardLoad>
    </div>
    <div :class="['paddingTop88', showFooter ? 'paddingBottom50': 'paddingBottom10' ]"  v-if="dataList.length">
      <div style="height: 50px;" class="d-none d-sm-block"></div>
      <van-checkbox-group v-model="result" ref="checkboxGroup">
        <div class="row">
          <Cover class="col-sm-6 col-md-4 col-lg-3 col-xl-2" v-for="(item,index) in dataList" :item="item || {}" :key="item && item.vodId"  :style="index === 0 ?'padding-top: 18px': '' " :showCheck="showFooter"></Cover>
          <div class="pagination">
            <v-pagination :total="pageInfoTotal" :current-page='pageInfo.page' @pagechange="handlePage"></v-pagination>
          </div>
          <fBottom></fBottom>
        </div>
      </van-checkbox-group>
    </div>
    <Empty v-else></Empty>
    <Footer v-if="showFooter" @handleAll="handleAll" :showCheck="showCheck" :result="result"></Footer>  
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Nav from '@/components/nav'
import Cover from '@/components/cover'
import Empty from '@/components/empty'
import Footer from '@/components/footer'
import Test from '@/components/test'
import { uniArray } from '@/utils/format.js'
import commonMinxin from '~/plugins/mixins/common'
import CODES from "~/plugins/enums/codes"

export default{
mixins: [commonMinxin],
data() {
  return {
    spainnerLoading: false,
    loading: false, // 是否处于加载状态
    finished: false, // 是否加载完成
    refreshing: false, // 当前是否刷新重置信息
    dataList: [],
    pageInfo: {
      page: 1,
      size: 20
    },
    showCheck: false,
    showFooter: false,
    result: []
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
computed: {
  ...mapGetters(['userinfo']),
},
mounted(){
  document.documentElement.scrollTop = 0// 滚动到顶部
  this.getList('first')
},
components: {
  Nav,
  Cover,
  Empty,
  Footer,
  Test
},
methods: {
  checkAll() {
    console.log(this.$refs.checkboxGroup)
    this.$refs.checkboxGroup.toggleAll(true);
  },
  toggleAll() {
    this.$refs.checkboxGroup.toggleAll();
  },
  handleAll(type){
    console.log(this.showCheck, type, '123')
    if (!this.showCheck) return 
    if(type==='all'){
      this.$refs.checkboxGroup.toggleAll(true);
    }else if(type==='noall'){
      this.$refs.checkboxGroup.toggleAll();
    }else{
      console.log(this.result, 'arr')
      // 无标题
      if(this.result.length) {
        this.$dialog.confirm({
          title: this.$t('str_tip'),
          message: this.$t('toast11'),
          confirmButtonText: this.$t('str_get_back'),
          cancelButtonText: this.$t('str_cancel')
        })
        .then(async () => {
          // on confirm
          const params = {
            ids: this.result.map(String)
          }
          console.log(params, 'params')
          try {
            const res = await this.$collectApi.postCollectDelete(params)
            if(res.code === CODES.SUCCESS){
              this.loading = false
              this.onRefresh()
              this.result = []
              this.$toast(this.$t('toast9'))
            }
          } catch (error) {
            console.error(error)
          }
        })
        .catch(() => {
          // on cancel
          this.$toast(this.$t('toast5'))
        });
      } else {
        this.$toast(this.$t('toast10'))
      }
    }
  },
   // 管理按钮
   handleControl(val){
    if(val === 1){
      this.showCheck = true
      this.showFooter = true
    }else{
      this.showCheck = false
      this.showFooter = false
    }
  },
  onLoad(){
    this.loading = false
    this.pageInfo.page += 1
    if(!this.loading){
      this.getList();
    }
  },
  async getList(isRefresh){
    try {
      isRefresh  === 'first' && (this.spainnerLoading = true)
      const params = { page: this.pageInfo.page, size: this.pageInfo.size}
      const res = await this.$collectApi.postCollectList(params)
      console.log(res, 'res')
      const { code, data = {} } = res
      if(code === CODES.SUCCESS){
        data.data = data.data.map(item => {
          return  item = item.vod
        })
        this.dataList = data.data
        this.pageInfoTotal = data.meta.pagination.total
        if(data.data.length === 0){
          this.showFooter = false
          this.finished = true
        }
      }
    } catch (error) {
      console.error(error)
    } finally {
      this.spainnerLoading = false
      this.loading = false
      this.refreshing = false
      console.log(this.loading)
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
.collect {
    width: 100vw;
    height: 100vh;
    overflow-y: auto;
}
</style>