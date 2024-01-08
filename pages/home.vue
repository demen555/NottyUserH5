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
            <a href="https://www.facebook.com/nottyhub "><img class="common" :src="themeChecked? require('~/static/images/facebook_1.svg'): require('~/static/images/rat-1.png')" alt="rta"></a>
            <a href="https://www.instagram.com/nottyhub.club/"><img class="common" :src="themeChecked? require('~/static/images/instagram_1.svg'): require('~/static/images/rat-1.png')" alt="rta"></a>
            <a href="https://www.youtube.com/@NottyHub.com "><img class="common" :src="themeChecked? require('~/static/images/youtube_1.svg'): require('~/static/images/rat-1.png')" alt="rta"></a>
            <a href="https://twitter.com/nottyhub"><img class="common" :src="themeChecked? require('~/static/images/twitter_1.svg'): require('~/static/images/rat-1.png')" alt="rta"></a>
            <a href="https://www.tiktok.com/@nottyhub"><img class="common" :src="themeChecked? require('~/static/images/tiktok_1.svg'): require('~/static/images/rat-1.png')" alt="rta"></a>
            <a href="https://t.me/+UClKi43iLeFkYzA1"><img class="common" :src="themeChecked? require('~/static/images/telegram_1.svg'): require('~/static/images/rat-1.png')" alt="rta"></a>
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
      size: 60
    },
    footerList: [
      { name: this.$t('str_footer_nav1'), id: 'policy-csam'},
      { name: this.$t('str_footer_nav2'), id: 'policy-terms'},
      { name: this.$t('str_footer_nav3'), id: 'policy-privacy'},
      { name: this.$t('str_footer_nav4'), id: 'policy-content'},
      { name: this.$t('str_footer_nav6'), id: 'policy-dmca'},
      { name: this.$t('str_footer_nav5'), id: 'policy-ncc'},
      { name: this.$t('str_footer_nav8'), id: 'policy-2257'},
      { name: this.$t('str_footer_nav9'), id: 'policy-faq'},
      { name: this.$t('str_footer_nav10'), id: 'policy-eu'},
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
head(){

  return {
    title: "Assistir Vídeo Pornô Grátis HD | XXX Filmes de Sexo Porno | Porno Tube by Nottyhub.com",
    meta: [
      { name: 'title', content: "Assistir Vídeo Pornô Grátis HD | XXX Filmes de Sexo Porno | Porno Tube by Nottyhub.com" },
      { name: 'description', content: "Nottyhub, assista a Vídeos Pornôs Grátis em HD agora! Obtenha filmes e clipes pornôs diários XXX. Melhor Tube Pornô para Brasileiro! Apresentando pornografia gay, pornografia lésbica, vídeo amador caseiro!" },
      { name: 'keywords', content: "XXX / Video de sexo / porno gratis / filme porno gratis / assistir filme porno gratis" },

      { property: 'og:title', content: "Assistir Vídeo Pornô Grátis HD | XXX Filmes de Sexo Porno | Porno Tube by Nottyhub.com" },
      { property: 'og:description', content: "Nottyhub, assista a Vídeos Pornôs Grátis em HD agora! Obtenha filmes e clipes pornôs diários XXX. Melhor Tube Pornô para Brasileiro! Apresentando pornografia gay, pornografia lésbica, vídeo amador caseiro!" },
      { property: 'og:keywords', content: "XXX / Video de sexo / porno gratis / filme porno gratis / assistir filme porno gratis" },
    ]
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
    console.log(document.querySelector('#home-top'))
    const navHeight = document.querySelector('.home-header').offsetHeight
    
    // scrollIntoView() js原生方法，实现锚点滚动过渡
    const target = document.querySelector('#home-top')
    target.scrollIntoView({ behavior: 'smooth',  block: "start" })
    
    // scrollTo() 把内容滚动到指定的坐标。减去导航高度的目的：导航用定位固定在顶部，如果不减去，导航栏会遮挡一部分内容
    // console.log(target.offsetTop, navHeight, target.offsetTop - navHeight, 'height')
    // window.scrollTo(0, target.offsetTop - navHeight - 10)
  },
  handleClickPage(name){
    this.$router.push(this.localePath({name: name }))
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
  color: var(--text-color3, rgba(96, 105, 128, 0.40));
  font-size: 15px;
}
.video-list{
  // touch-action: none
}

.home-footer{
  margin: 0 12px;
  color: var(--text-color2,  rgba(255, 255, 255, 0.70));
  background-color: var(--bg-color1, #0E0E0F);
  padding-bottom: 24px;
  .home-footer-list{
    height: 40px;
    line-height: 40px;
    display: flex;
    justify-content: space-between;
    border-top: 1PX solid var(--border-line, rgba(245, 245, 247, 0.06));;
    // border-bottom: 1PX solid var(--border-line, rgba(245, 245, 247, 0.06));;
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
  border-bottom: 1PX solid var(--border-line, rgba(245, 245, 247, 0.06));;
}

.pagination{
  margin-top: 12px !important;
  margin-bottom: 12px !important;
}
</style>