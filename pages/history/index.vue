<template>
  <div class="collect">
    <HeaderTop @refresh="onRefresh"></HeaderTop>
    <Nav @handleControl="handleControl" :imgUrl="require('~/static/images/my_gn_lsjl_1.svg')" :title="$t('str_his')" :text=" dataList.length > 0 ? true : historyVod.length === 0" text></Nav>
    <div class="loading-box" v-if="spainnerLoading">
      <cardLoad></cardLoad>
    </div>
    <div :class="['paddingTop88', showFooter ? 'paddingBottom50': 'paddingBottom10' ]"  v-if="dataList.length">
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
            <Cover :class="{ 'cover-mask': result.includes(item.vodId) }" v-for="item in dataList" :item="item" :key="item.vodId" :showCheck="showFooter"></Cover>
          </van-checkbox-group>
        </van-list>
      </van-pull-refresh>
    </div>
    <Empty v-else></Empty>
    <Footer v-if="showFooter && dataList.length" @handleAll="handleAll" :result="result" :showCheck="showCheck"></Footer>  
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import Nav from '@/components/nav'
import Cover from '@/components/cover'
import Empty from '@/components/empty'
import Footer from '@/components/footer'
import Test from '@/components/test'
import { uniArray } from '@/utils/format.js'
import commonMinxin from '~/plugins/mixins/common'
export default{
mixins: [commonMinxin],
data() {
  return {
    loading: false, // 是否处于加载状态
    finished: false, // 是否加载完成
    refreshing: false, // 当前是否刷新重置信息
    spainnerLoading: false,
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
computed: {
  ...mapGetters(['userinfo', 'historyVod']),
  txtTitle(){
    return this.detail.typeName
  }
},
mounted(){
  this.getList('first')
  console.log(this.detail)
},
head(){
  const hostName = process.server ? this.$nuxt.context.req.headers.host.replace(/:\d+$/, '') : window.location.host;
  return {
    
    link: [
      {
        hid: "canonical",
        rel: 'canonical',
        href: `${hostName}${this.$nuxt.context.route.fullPath}`,
      },
    ],
  }
},
components: {
  Nav,
  Cover,
  Empty,
  Footer,
  Test
},
methods: {
  ...mapActions(['update_historyvod', 'celar_historyvod']),
  checkAll() {
    console.log(this.$refs.checkboxGroup)
    this.$refs.checkboxGroup.toggleAll(true);
  },
  toggleAll() {
    this.$refs.checkboxGroup.toggleAll();
  },
  handleAll(type){
    console.log(type, '123')
    if(type==='all'){
      this.$refs.checkboxGroup.toggleAll(true);
    }else if(type==='noall'){
      this.$refs.checkboxGroup.toggleAll();
    }else{
      console.log(this.result, 'arr')
      if(this.result.length === this.historyVod.length){
        //清除全部
        this.celar_historyvod()
      }else{
        //部分删除
        const newArr = []
        this.historyVod.forEach(item => {
          this.result.forEach(ite => {
            if(item.vodId !== ite){
              newArr.push(item)
            }
          })
        })
        this.result = []
        this.update_historyvod(newArr)
      }
          
      // this.$toast(this.$t('toast9'))
      this.getList()
    }
      // 无标题
    //   if(this.result.length){
    //     this.$dialog.confirm({
    //       title: this.$t('str_tip'),
    //       message: '你确定要删除选中的历史记录吗？'
    //     })
    //     .then(() => {
    //       // on confirm
    //       if(this.result.length === this.historyVod.length){
    //         //清除全部
    //         this.celar_historyvod()
    //       }else{
    //         //部分删除
    //         const newArr = []
    //         this.historyVod.forEach(item => {
    //           this.result.forEach(ite => {
    //             if(item.vodId !== ite){
    //               newArr.push(item)
    //             }
    //           })
    //         })
    //         this.update_historyvod(newArr)
    //       }
          
    //       this.$toast(this.$t('toast9'))
    //       this.getList()
    //     })
    //     .catch(() => {
    //       // on cancel
    //       this.$toast(this.$t('toast5'))
    //     });
    //   }else{
    //     this.$toast(this.$t("toast10"))
    //   }
    // }
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
  getList(isRefresh){
    try {
      this.loading = true
      isRefresh  === 'first' && (this.spainnerLoading = true)
      setTimeout(() => {
        // const historyVod = [ ...this.historyVod ]
        // console.log(this.historyVod)
        // const arr = historyVod.splice(this.pageInfo.page-1, this.pageInfo.size)
        // this.update_historyvod(arr)
        this.dataList = this.historyVod
        this.loading = false
        this.refreshing = false
        this.spainnerLoading = false
      }, 2000)
      if(this.historyVod.length === 0){
        this.finished = true
      }
    } catch (error) {
      console.error(error)
    } finally {
      // this.spainnerLoading = false
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
:deep(.van-nav-bar__left){
  font-size: 18px;
}
.van-nav-bar__right{
  right: -8px;
}
</style>