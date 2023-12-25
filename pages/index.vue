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
          <van-pagination class="pagination" v-model="pageInfo.size" :total-items="24" :items-per-page="5" />
          <div class="home-footer-list" v-for="(item, index) in footerList" :key="index" @click="handleClickPage(item.id)">
            <div class="home-footer-tag">{{ item.name }}</div>
            <div class="home-footer-right">
              <img :src="themeChecked? require('~/static/images/com_jt_sx_you.svg'): require('~/static/images/com_jt_sx_you_rj.svg')" alt="">
            </div>
          </div>
          <div class="home-footer-com">  © {{ hostname }}, 2023 </div>
          <div class="home-footer-icon">
            <div><img class="rta" :src="themeChecked? require('~/static/images/rat.png'): require('~/static/images/rat-1.png')" alt="rta"></div>
            <div>
              <img class="common" :src="themeChecked? require('~/static/images/facebook_1.svg'): require('~/static/images/rat-1.png')" alt="rta">
              <img class="common" :src="themeChecked? require('~/static/images/instagram_1.svg'): require('~/static/images/rat-1.png')" alt="rta">
              <img class="common" :src="themeChecked? require('~/static/images/youtube_1.svg'): require('~/static/images/rat-1.png')" alt="rta">
              <img class="common" :src="themeChecked? require('~/static/images/twitter_1.svg'): require('~/static/images/rat-1.png')" alt="rta">
              <img class="common" :src="themeChecked? require('~/static/images/tiktok_1.svg'): require('~/static/images/rat-1.png')" alt="rta">
              <img class="common" :src="themeChecked? require('~/static/images/telegram_1.svg'): require('~/static/images/rat-1.png')" alt="rta">
            </div>
          </div>
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
    cardLoad
  },
  async asyncData({ $homeApi }) {
    const res = await $homeApi.requestvodpageHome({ page: 1, size: 20})
    const { data } = res
    return { dataList: data.data }
  },
  methods: {
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
.home-footer{
  margin: 0 12px;
  color: var(--text-color2);
  padding-bottom: 24px;
  .home-footer-list{
    height: 40px;
    line-height: 40px;
    display: flex;
    justify-content: space-between;
    border-top: 1PX solid var(--border-line);
    // border-bottom: 1PX solid var(--border-line);
  }
  .home-footer-com{
    font-size: 14px;
    margin-top: 16px;
    margin-bottom: 16px;
  }
  .home-footer-icon{
    display: flex;
    justify-content: space-between;
    .rta{
      width: 42px;
      height: 16px;
    }
    .common{
      width: 16px;
      height: 16px;
      margin-left: 12px;
    }
  }
}
.home-footer-list:nth-last-child(3) {
  // color: red;
  border-bottom: 1PX solid var(--border-line);
}
.pagination{
  margin-top: 24px !important;
  margin-bottom: 24px !important;
}
</style>