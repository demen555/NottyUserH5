<template>
  <div class="collect">
    <HeaderTop @refresh="onRefresh"></HeaderTop>
    <Nav @handleControl="handleControl" :title="$t('str_like')" :text="dataList.length > 0 ? true : false"></Nav>    
    <div class="loading-box" v-if="spainnerLoading">
      <cardLoad></cardLoad>
    </div>
    <!-- {{ result }} {{ dataList.length }} -->
    <div :class="['paddingTop88', showFooter ? 'paddingBottom50': 'paddingBottom10' ]" v-if="dataList.length">
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
            <Cover v-for="item in dataList" :item="item" :key="item.vodId" :showCheck="showFooter"></Cover>
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
        rel: 'canonical',
        href: `${hostName}${this.$nuxt.context.route.fullPath}`,
      },
    ],
  }
},
computed: {
  ...mapGetters(['userinfo','noLoginUpVod','isLogin']),
  txtTitle(){
    return this.detail.typeName
  }
},
created(){
  this.pageInfo = {
    page: 1,
    size: 20
  }
  this.getList('first')
},
// 重新进入点赞，更新当前未登录点赞视频
activated(){
  this.pageInfo = {
    page: 1,
    size: 20
  }
  this.getList('first')
  // if(this.isLogin){
  //   this.pageInfo = {
  //     page: 1,
  //     size: 20
  //   }
  //   this.getList('first')
  // }else{
  //   this.dataList = this.noLoginUpVod || []
  // }
},

components: {
  Nav,
  Cover,
  Empty,
  Footer
},
methods: {
  ...mapActions(['update_upvod', 'clear_upvod']),
  checkAll() {
    console.log(this.$refs.checkboxGroup)
    this.$refs.checkboxGroup.toggleAll(true);
  },
  toggleAll() {
    this.$refs.checkboxGroup.toggleAll();
  },
  getIds(arr1, arr2){
      const arr =  arr1.filter((ele) => 
          arr2.filter((x) => x === ele.vodId).length > 0
      );
      return arr.map( obj => String(obj.vodId) )
  },
  handleAll(type){
    console.log(type, '123')
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
          message: this.$t('str_del_dianzan')
        })
        .then(async () => {
          // on confirm
          const params = {
            ids: this.getIds(this.dataList, this.result ).join(",")
          }
          console.log(params, 'params')
          // if( !this.isLogin ){
          //   // 未登录
          //   if(this.result.length === this.dataList.length){
          //     //清除全部
          //     this.clear_upvod()
          //     this.result = []
          //   }else{
          //     //部分删除
          //     const newArr = []
          //     this.dataList.forEach(item => {
          //       this.result.forEach(ite => {
          //         if(item.vodId !== ite){
          //           newArr.push(item)
          //         }
          //       })
          //     })
          //     this.update_upvod(newArr)
          //   }
          //   this.dataList = this.noLoginUpVod || []
          // } else {
            try {
              console.log(params, '8888999')
              const res = await this.$upApi.postUpDelete(params)
              if(res.code === CODES.SUCCESS){
                this.$toast(this.$t('toast9'))
                this.onRefresh()
              }
            } catch (error) {
              console.error(error)
            }
          // }
        })
        .catch(() => {
          // on cancel
          this.$toast(this.$t('str_cel'))
        });
      } else {
        this.$toast(this.$t('toast5'))
      }
    }
  },
   // 管理按钮
   handleControl(val){
    if( this.dataList.length ) {
      if(val === 1){
        this.showCheck = true
        this.showFooter = true
      }else{
        this.showCheck = false
        this.showFooter = false
      }
    }
  },
  onLoad(){
    if(this.accessToken){
      this.loading = false
      this.pageInfo.page += 1
      if(!this.loading){
        this.getList();
      }
    }else{
      this.finished = true; // 未登录 不用加载
    }

  },

  async getList(isRefresh){
    try {
      isRefresh  === 'first' && (this.spainnerLoading = true)
      this.loading = true
      const params = { page: this.pageInfo.page, size: this.pageInfo.size}

      const res = await this.$upApi.postUpList(params)
      const { code, data = {} } = res
      if(code === CODES.SUCCESS){
        data.data = data.data.map(item => {
          return  item = item.vod
        })
        if(isRefresh){
          // this.dataList = [ ...body.records, ...this.dataList ]
          this.dataList = data.data
          this.refreshing = false
        } else {
          this.dataList = uniArray([ ...this.dataList, ...data.data], 'vodId')
          this.loading = false
        }
        if(data.data.length === 0){
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