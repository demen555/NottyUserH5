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
    <div class="video-list paddingTop45" >
      <div class="video-tag-list">
        <client-only>
          <nuxt-link :to="localePath({
              name: 'tag-name',
              params: { id: tag.id, name: tag.name }
          })" class="tag-name" v-for="tag in tagList" :key="tag.id">
            <div @click.stop="set_tagid(item.id)">{{ tag.name }}</div>
          </nuxt-link>
          <!-- 所有标签 -->
          <nuxt-link class="tag-name" style="padding-right: 12px;" :to="localePath('tag')" > {{ $t('str_menu_tag_all') }}</nuxt-link>
        </client-only>
      </div>
      <template v-for="(item,index) in dataList" >
        <Cover :item="item" :key="item.vodId"></Cover>
        <div class="top-category" v-if="index === 1">
          <div class="top-category-title">
            <div>Top Category</div>
            <client-only>
              <nuxt-link :to="localePath('category')" class="top-category-more">
                More <img :src="require('~/static/images/com_jt_sx_you.svg')" alt="com_jt_sx_you">
              </nuxt-link>
            </client-only>
          </div>
          <div class="top-category-thumb">
            <Thumb class="top-category-thumb-tag" :tag="tag" v-for="tag in categoryList" :key="tag.id"></Thumb>
            <client-only>
              <nuxt-link :to="localePath('category')" class="top-category-thumb-all">
                <img :src="require('~/static/images/my_gn_fenlei_1.svg')" alt="my_gn_fenlei_1">
                <div class="top-category-thumb-text">All</div>
              </nuxt-link>
            </client-only> 
          </div>
        </div>
      </template>
      <div class="home-footer">
        <!-- <van-pagination class="pagination" @change="handleChanege" v-model="pageInfo.page" :total-items="pageInfo.total" pages="[1,2,3,4,5]" :page-count="pageInfo.total" :show-page-size="4" force-ellipses >
          <template #prev-text>
            Prev
          </template>
          <template #page="{ number,text, active }">{{ handlePage(number, text, active) }}</template>
        </van-pagination> -->
        <v-pagination :total="pageInfo.total" :current-page='pageInfo.page' @pagechange="handlePage"></v-pagination>
        <nuxt-link :to="localePath(item.id)" class="home-footer-list" v-for="(item, index) in footerList" :key="index">
          <div class="home-footer-tag">{{ item.name }}</div>
          <div class="home-footer-right">
            <img :src="themeChecked? require('~/static/images/com_jt_sx_you.svg'): require('~/static/images/com_jt_sx_you_rj.svg')" alt="">
          </div>
        </nuxt-link>
        <div class="home-footer-com">  © {{ hostname }}, 2023 </div>
        <div class="home-footer-icon">
          <div><img class="rta" :src="themeChecked? require('~/static/images/rat.png'): require('~/static/images/rat-1.png')" alt="rta"></div>
          <div>
            <a href="https://www.facebook.com/nottyhub" target="_blank"><img class="common" :src="themeChecked? require('~/static/images/facebook_1.svg'): require('~/static/images/rat-1.png')" alt="rta"></a>
            <a href="https://www.instagram.com/nottyhub.club/" target="_blank"><img class="common" :src="themeChecked? require('~/static/images/instagram_1.svg'): require('~/static/images/rat-1.png')" alt="rta"></a>
            <a href="https://www.youtube.com/@NottyHub" target="_blank"><img class="common" :src="themeChecked? require('~/static/images/youtube_1.svg'): require('~/static/images/rat-1.png')" alt="rta"></a>
            <a href="https://twitter.com/nottyhub" target="_blank"><img class="common" :src="themeChecked? require('~/static/images/twitter_1.svg'): require('~/static/images/rat-1.png')" alt="rta"></a>
            <a href="https://www.tiktok.com/@nottyhub" target="_blank"><img class="common" :src="themeChecked? require('~/static/images/tiktok_1.svg'): require('~/static/images/rat-1.png')" alt="rta"></a>
            <a href="ttps://t.me/+UClKi43iLeFkYzA1" target="_blank"><img class="common" :src="themeChecked? require('~/static/images/telegram_1.svg'): require('~/static/images/rat-1.png')" alt="rta"></a>
          </div>
        </div>

      </div>
    </div>
    <div class="sticky-upload" v-show="showSticky">
      <div class="sticky-close" @click="handleClose"></div>
      <div class="sticky-text">{{ $t('str_page_text4') }}</div>
      <a href="https://t.me/NottyHubClub" target="_blank">
        <img :src="require('~/static/images/upload.svg')" alt="upload">
      </a>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex"
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
    hostname: '',
    showSticky: true
  }
},
computed: {
  ...mapGetters(['theme', 'tagList', 'categoryList']),
  themeChecked(){
    return this.theme === 'dark'
  }
},
head(){
  const hostName = process.server ? this.$nuxt.context.req.headers.host.replace(/:\d+$/, '') : window.location.host;

  return {
    title: "Assistir Vídeo Pornô Grátis HD | XXX Filmes de Sexo Porno | Porno Tube by Nottyhub.com",
    meta: [
      { name: 'title', content: "Assistir Vídeo Pornô Grátis HD | XXX Filmes de Sexo Porno | Porno Tube by Nottyhub.com" },
      { name: 'description', content: "Nottyhub, assista a Vídeos Pornôs Grátis em HD agora! Obtenha filmes e clipes pornôs diários XXX. Melhor Tube Pornô para Brasileiro! Apresentando pornografia gay, pornografia lésbica, vídeo amador caseiro!" },
      { name: 'keywords', content: "XXX / Video de sexo / porno gratis / filme porno gratis / assistir filme porno gratis" },

      { property: 'og:title', content: "Assistir Vídeo Pornô Grátis HD | XXX Filmes de Sexo Porno | Porno Tube by Nottyhub.com" },
      { property: 'og:description', content: "Nottyhub, assista a Vídeos Pornôs Grátis em HD agora! Obtenha filmes e clipes pornôs diários XXX. Melhor Tube Pornô para Brasileiro! Apresentando pornografia gay, pornografia lésbica, vídeo amador caseiro!" },
      { property: 'og:keywords', content: "XXX / Video de sexo / porno gratis / filme porno gratis / assistir filme porno gratis" },
    ],
    link: [
      {
        rel: 'canonical',
        href: `${hostName}${this.$nuxt.context.route.fullPath}`,
      },
    ],
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
  ...mapActions(['set_tagid']),
  handleClose(){
    this.showSticky = false
  },
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
        // console.log( code, data, this.dataList, 'data' )
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


.home-footer{
  margin: 0 12px;
  color: var(--text-color2,  rgba(255, 255, 255, 0.70));
  background-color: var(--bg-color1, #0E0E0F);
  padding-bottom: 24px;
  a {
    color: var(--text-color2,  rgba(255, 255, 255, 0.70));
  }
  .home-footer-list{
    height: 40px;
    line-height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1PX solid var(--border-line, rgba(245, 245, 247, 0.06));
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
.sticky-upload{
  position: fixed;
  right: 12px;
  bottom: 35px;
  z-index: 999;
  .sticky-close{
    width: 16px;
    height: 16px;
    background-color: transparent;
    position: absolute;
    right: 0;
    top: 0;
  }
  .sticky-text{
    position: absolute;
    left: 5px;
    bottom: 15px;
    font-size: 10px;
    font-weight: bold;
    color: var(--text-color1, #181E2A);
  }
}
.video-tag-list{
  display: flex;
  // min-width: 375px;
  overflow-x: auto;
  flex-grow: 1;
  margin-left: 12px;
  // margin-right: 12px;
  margin-top: 8px;
  a{
    color: #fff;
    display: block;
    display: flex;
    flex-grow: 1;
  }
  .tag-name{
    flex-shrink: 0;
    padding: 5px 8px;
    // width: 98px;
    // height: 28px;
    border-radius: 4px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    text-align: center;
    margin-right: 10px;
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)),linear-gradient(0deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.06));
  }
}
.top-category{
  // display: flex;
  .top-category-title{
    display: flex;
    justify-content: space-between;
    margin: 0 12px;
    margin-top: 20px;
    font-size: 16px;
  }
  .top-category-more{
    font-size: 14px;
    color: rgba(255, 255, 255, 0.7);
    margin-right: 4px;
  }
  .top-category-thumb{
    display: flex;
    overflow-x: auto;
    margin-left: 12px;
  }
  .top-category-thumb-tag{
    margin-right: 10px;
  }
  a{
    color: #fff;
  }
  .top-category-thumb-all{
    // width: 108px;
    // height: 148px;
    // height:105px;
    margin-top: 10px;
    padding: 0 10px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .top-category-thumb-text{
      font-size: 14px;
      margin-top: 8px;
    }
  }
}
@media screen and (min-width: 420px) {
  .sticky-text{
    width: 150px;
    position: absolute;
    left: 5px;
    bottom: 18PX !important;
    font-size: 10PX !important;
    font-weight: bold;
    color: var(--text-color1, #181E2A);
  }
}
</style>