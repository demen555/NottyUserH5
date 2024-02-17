<template>
  <div class="collect">
    <HeaderTop @refresh="onRefresh"></HeaderTop>
    <Nav @handleControl="handleControl" :imgUrl="require('~/static/images/my_gn_wdsc_1.svg')" :title="$t('str_collect')" :text="dataList.length ? true : false"></Nav>
    <div class="loading-box" v-if="spainnerLoading">
      <cardLoad></cardLoad>
    </div>
    <div  :class="['paddingTop88', showFooter ? 'paddingBottom50': 'paddingBottom10' ]"  v-if="dataList.length">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
         :finished-text="$t('str_no_more')"
          :immediate-check="false"
          @load="onLoad"
          :offset="10"
        >
          <van-checkbox-group v-model="result" ref="checkboxGroup">
            <Cover v-for="item in dataList" :item="item || {}" :key="item && item.vodId" :showCheck="showFooter"></Cover>
          </van-checkbox-group>
        </van-list>
      </van-pull-refresh>
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
  txtTitle(){
    return this.detail.typeName
  }
},
mounted(){
  document.documentElement.scrollTop = 0// 滚动到顶部
  this.getList('first')
  console.log(this.detail)
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
        if(isRefresh){
          console.log(data.data, '1111')
          // this.dataList = [ ...body.records, ...this.dataList ]
          this.dataList = data.data
          this.refreshing = false
        } else {
          console.log('2222')
          this.dataList = uniArray([ ...this.dataList, ...data.data], 'vodId')
          this.loading = false
        }
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