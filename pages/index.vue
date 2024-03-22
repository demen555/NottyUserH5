<template>
  <div class="home container-fluid">
    <HeaderTop @refresh="onRefresh" v-show="isStickyVisible" id="home-top"></HeaderTop>
    <div class="loading-box" v-if="spainnerLoading">
      <cardLoad></cardLoad>
    </div>
    <div class="video-list paddingTop45 row" >
      <div class="video-tag-list col-sm-12 col-md-12 col-lg-12 col-xl-12" >
          <nuxt-link :to="localePath({
              name: 'tag-name',
              params: { id: tag.id, name: tag.urlSlug }
          })" class="tag-name" v-for="tag in tagList" :key="tag.id">
            <div @click.stop="set_tagid(item.id)">{{ tag.name }}</div>
          </nuxt-link>
          <nuxt-link class="tag-name" style="padding-right: 12px;" :to="localePath('tag')" > {{ $t('str_menu_tag_all') }}</nuxt-link>
      </div>
      <!-- 短片列表 -->
      <div class="shorts-list col-sm-12 col-md-12 col-lg-12 col-xl-12" >
        <div class="list-title">
          <div class="title-left">
            <img src="~/static/images/gn_shorts.png" alt="gn_shorts">
            <span> Shorts </span>
          </div>
          <div class="title-right">
            <span> More </span>
            <img src="~/static/images/com_jt_sx_you.png" alt="com_jt_sx_you">
          </div>
        </div>
        <div class="list-content" ref="shortsList">
          <nuxt-link class="list-item" @click.prevent v-for="item in storiesList" :key="item.vodId" draggable="false" :to="localePath({
              name: 'shorts-id',
              params: { id: item.vodId }
          })">
            <img :src="item.vodPic" alt="" draggable="false">
            <div class="list-des">
              <h2 class="vodName">{{ item.vodName }}</h2>
              <div class="list-btn">
                <div class="main-btn-view">
                  <img :src="require('~/static/images/com_shipinshu_1.svg')" alt="com_shipinshu_1">
                  <div class="main-text">{{ formatNumber(item.vodHits) }}</div>
                </div>
                <div class="mian-btn-like">
                  <img :src="require('~/static/images/com_dianzan_1.svg')" alt="com_dianzan_1">
                  <div class="main-text">{{ formatPer(item.vodUp, item.vodUp+item.vodDown)}}</div>
                </div>
              </div>
            </div>
          </nuxt-link>
          <div class="list-more">
            <img src="~/static/images/gn_shorts.png" alt="gn_shorts">
            <span>All</span>
          </div>
        </div>
      </div>

      <div v-for="(item,index) in dataList" :key="item.vodId" class="col-sm-6 col-md-4 col-lg-3 col-xl-2">
        <Cover style="margin-top: 12px;" :item="item"></Cover>
        <div class="top-category d-sm-none" v-if="index === 1">
          <div class="top-category-title">
            <div>{{ $t('str_page_text5') }}</div>
            <client-only>
              <nuxt-link :to="localePath('category')" class="top-category-more">
                {{ $t('str_page_text6') }} <img :src="require('~/static/images/com_jt_sx_you.svg')" alt="com_jt_sx_you">
              </nuxt-link>
            </client-only>
          </div>
          <div class="top-category-thumb">
            <Thumb class="top-category-thumb-tag" :tag="tag" v-for="tag in categoryList" :key="tag.id"></Thumb>
            <client-only>
              <nuxt-link :to="localePath('category')" class="top-category-thumb-all">
                <img :src="require('~/static/images/my_gn_fenlei_1.svg')" alt="my_gn_fenlei_1">
                <div class="top-category-thumb-text">{{ $t('str_page_text7') }}</div>
              </nuxt-link>
            </client-only> 
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="pagination">
        <v-pagination :total="pageInfoTotal" :routeName="$route.name" :current-page='pageInfo.page' @pagechange="handlePage"></v-pagination>
      </div>
        <!-- <div style="min-height: 304px;" class="d-none d-sm-block"></div> -->
      <fBottom></fBottom>
    </div>
    <div class="sticky-upload" v-show="showSticky">
      <div class="sticky-close" @click="handleClose"></div>
      <div class="sticky-text">{{ $t('str_page_text4') }}</div>
      <a href="https://t.me/NottyOF" target="_blank">
        <img :src="require('~/static/images/upload.svg')" alt="upload">
      </a>
    </div>
    <dialogBottom ref="dialogBottomRef"></dialogBottom>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex"
import HeaderTop from '~/components/header/top.vue'
import Cover from '~/components/cover'
import CODES from "~/plugins/enums/codes"
import commonMinxin from '~/plugins/mixins/common'
import dialogBottom from "~/components/dialog/dialog-bottom.vue"
import { formatNumber, formatPer } from '@/utils/format.js'
export default{
fetchOnServer: true,
mixins: [commonMinxin],
data() {
  return {
    spainnerLoading: false,// 全局loading层
    loading: false, // 是否处于加载状态
    finished: false, // 是否加载完成
    refreshing: false, // 当前是否刷新重置信息
    dataList: [],
    pageInfo: {
      page: this.$route.query.page * 1 || 1,
      size: 24
    },
    showSticky: true,
    tagList: [],
    categoryList: [],
    showPopup: false, //底部popup

    storiesList:[],
  }
},
computed: {
  ...mapGetters(['theme']),
  themeChecked(){
    return this.theme === 'dark'
  }
},
head(){
  const hostName = process.server ? this.$nuxt.context.req.headers.host.replace(/:\d+$/, '') : window.location.host;
  
  return {
    title: "Assistir Vídeo Pornô Grátis HD | XXX Filmes de Sexo Porno | Porno Tube by Nottyhub.com",
    meta: [
      { hid: "title", name: 'title', content: "Assistir Vídeo Pornô Grátis HD | XXX Filmes de Sexo Porno | Porno Tube by Nottyhub.com" },
      { hid: "description", name: 'description', content: "Nottyhub, assista a Vídeos Pornôs Grátis em HD agora! Obtenha filmes e clipes pornôs diários XXX. Melhor Tube Pornô para Brasileiro! Apresentando pornografia gay, pornografia lésbica, vídeo amador caseiro!" },
      { hid: "keywords", name: 'keywords', content: "XXX / Video de sexo / porno gratis / filme porno gratis / assistir filme porno gratis" },

      { property: 'og:title', content: "Assistir Vídeo Pornô Grátis HD | XXX Filmes de Sexo Porno | Porno Tube by Nottyhub.com" },
      { property: 'og:description', content: "Nottyhub, assista a Vídeos Pornôs Grátis em HD agora! Obtenha filmes e clipes pornôs diários XXX. Melhor Tube Pornô para Brasileiro! Apresentando pornografia gay, pornografia lésbica, vídeo amador caseiro!" },
      { property: 'og:keywords', content: "XXX / Video de sexo / porno gratis / filme porno gratis / assistir filme porno gratis" },
    ],
    link: [
      {
        hid: "canonical",
        rel: 'canonical',
        href: `https://${hostName}${this.$nuxt.context.route.fullPath}`,
      },
    ],
  }
},
created(){
  if(process.client){
    this.$nextTick(() => {
      if( !localStorage.getItem('showBottom') ){
        this.$refs.dialogBottomRef.onShow()
        gtag('consent', 'default', {
          'ad_storage': 'denied',
          'analytics_storage': 'denied'
        });
      }
    })
  }
  // this.showPopup = true
},
mounted(){
  this.initHorizontalScroll();
},
components: {
  HeaderTop,
  Cover,
  dialogBottom
},
async asyncData({ $homeApi, query }) { 
  const res2 = await $homeApi.postTypeList({ 
    page: 1, 
    size: 10, 
    isSorted: true,
  })
  const res = await $homeApi.postTagListPage({
    page: 1,
    size: 10
  });

  const res1 = await $homeApi.requestvodpageHome({
    page: query.page * 1 || 1,  
    size: 24,
  })

  const res3 = await $homeApi.requestvodpageStoriesHome({
    size: 10
  })

  return { 
    tagList: res.data.data || [],
    categoryList:  res2.data.data || [],
    dataList: res1.data.data || [],
    pageInfoTotal: res1.data.meta.pagination.total || 0,
    pageInfo: {
      page: Number(query.page) || 1,
      size: 24,
    },
    storiesList: res3.data.data || [],
  }
},
methods: {
  formatNumber,
  formatPer,
  ...mapActions(['set_tagid']),
  handleClose(){
    this.showSticky = false
  },
  handleClickPage(name){
    this.$router.push(this.localePath({name: name }))
  },
  onLoad(){
    this.pageInfo.page += 1
    this.getList();
  },
  async getList(isRefresh ){
    console.log( isRefresh, "isRefresh" )
    try {
      this.spainnerLoading = true
      isRefresh  === 'first' && (this.spainnerLoading = true)
      // this.loading = true
      const res = await this.$homeApi.requestvodpageHome({ page: this.pageInfo.page, size: this.pageInfo.size})
      const { code, data } = res
      if(code == CODES.SUCCESS && data){
        this.pageInfoTotal = data.meta.pagination.total
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
  initHorizontalScroll() {
      let isMouseDown = false;
      let startX = 0;
      let scrollLeft = 0;

      const content = this.$refs.shortsList;

      content.addEventListener('mousedown', (event) => {
        isMouseDown = true;
        startX = event.pageX - content.offsetLeft;
        scrollLeft = content.scrollLeft;
        content.style.cursor = 'grabbing'; /* 鼠标样式为抓取中手型 */
      });

      content.addEventListener('mousemove', (event) => {
        if (!isMouseDown) return;
        const x = event.pageX - content.offsetLeft;
        const walk = (x - startX) * 2; // 控制滚动速度
        content.scrollLeft = scrollLeft - walk;
      });

      content.addEventListener('mouseup', () => {
        isMouseDown = false;
        content.style.cursor = 'grab'; /* 鼠标样式为抓取手型 */
      });

      content.addEventListener('mouseleave', () => {
        isMouseDown = false;
        content.style.cursor = 'grab'; /* 鼠标样式为抓取手型 */
      });
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
    width: 100%;
    position: absolute;
    left: 0px;
    bottom: 15px;
    font-size: 10px;
    font-weight: bold;
    text-align: center;
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
    // display: block;
    display: flex;
    // flex-grow: 1;
  }
  .tag-name{
    flex-shrink: 0;
    padding: 6px 12px;
    display: flex;
    justify-content: center;
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
    width: 185px;
    height: 105px;
    .van-image{
      width: 185px;
      height: 105px;
    }
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
.shorts-list{
  width: 100%;
  margin-top: 12px;
  cursor: grab; /* 鼠标样式为抓取手型 */
  .list-content{
    display: flex;
    overflow-x: auto;
    flex-grow: 1;
    justify-content: space-between;
  }
  .list-item{
    flex-shrink: 0;
    width: 161px;
    height: 289px;
    // background-color: pink;
    border-radius: 12px;
    margin-left: 12px;
    background: rgba(255, 255, 255, 0.1);
    position: relative;
    img{
      width: 100%;
      height: 100%;
    }
    .list-des{
      position: absolute;
      bottom: 0;
      left: 12px;
      right: 12px;
      h2{
        font-size: 14px;
        font-weight: 400;
        color: #fff;
        word-break: break-word;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
      .list-btn{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 8px 0 12px 0;
      }
      .main-btn-view, .mian-btn-like{
        display: flex;
        align-items: center;
        img{
          width: 16px;
          height: 16px;
          margin-right: 4px;
        }
        .main-text{
          font-size: 12px;
          color: rgba(255, 255, 255, 0.7);
        }
      }
    }

  }
  .list-more{
    flex-shrink: 0;
    width: 56px;
    height: 289px;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.1);
    margin-left: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    img{
      width: 24px;
      height: 24px;
    }
    span{
      font-size: 14px;
      color: #fff;
      margin-top: 8px;
    }

  }
  .list-title{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
    padding-left: 12px;
    padding-right: 12px;
    .title-right, .title-left{
      display: flex;
      align-items: center;
    }
    .title-right img{
      width: 12px;
      height: 12px;
      margin-left: 8px;
    }
    .title-left img{
      width: 24px;
      height: 24px;
      margin-right: 8px;
    }
    .title-right span{
      font-size: 14px;
      color: rgba(255, 255, 255, 0.7);
    }
    .title-left span{
      font-size: 16px;
      color: #fff;
    }
  }
}
</style>