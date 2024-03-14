<template>
  <div class="header">
    <Overlay v-model="overlayShow" v-if="overlayShow"></Overlay>
      <header class="home-header" id="home-header">
        <img @click="handleExpand('left')" :src="themeChecked? require('~/static/images/home_top_more_1.svg'): require('~/static/images/home_top_more.svg')" class="header-common cursor-pointer" alt="more">
        <nuxt-link :to="localePath({ name: 'index' })"> 
          <div class="pc-logo d-none d-sm-block cursor-pointer" @click="handleClickNotty"  :class="themeChecked? 'logo-black': 'logo-white'"></div>
          <div class="d-block d-sm-none cursor-pointer" @click="handleClickNotty"  :class="themeChecked? 'logo-black': 'logo-white'"></div>
        </nuxt-link>
        <!-- <div class="d-sm-none" @click="handleClickNotty"  :class="themeChecked? 'logo-black': 'logo-white'"></div> -->
        <nuxt-link :to="localePath('search')" class="search-btn-content">
          <div class="d-none d-sm-block search-btn cursor-pointer" @click.stop="handleGoPage('search')">
            <!-- <form>
              <input ref="searchRef" type="search"  :placeholder="$t('str_search')" class="search-input" autofocus/>
            </form> -->
            <div class="search-top-btn cursor-pointer">
              <img class="header-common search-top-icon" :src="themeChecked? require('~/static/images/com_sousuo_1.svg'): require('~/static/images/com_sousuo_rj.svg')" alt="com_sousuo_1">
              <div class="search-top-text">{{ $t('str_search') }}</div>
            </div>
          </div>
        </nuxt-link>
        <div class="header-right">
          <nuxt-link :to="localePath('search')" class="d-sm-none">
            <img @click="handleGoPage('search')" :src="themeChecked? require('~/static/images/com_sousuo_1.svg'): require('~/static/images/com_sousuo.svg')" class="header-common header-search cursor-pointer" alt="com_sousuo">
          </nuxt-link>
          <div class="home-nav-loc d-none d-sm-table">
            <img class="loc-img" @click="pcNavLocShow = !pcNavLocShow" src="~/static/images/home_top_yuyan.png" alt="home_top_yuyan">
            <div class="nav-loc-pop" v-show="pcNavLocShow">
              <nuxt-link :class="['nav-menu-list-tag-sub', 'cursor-pointer', { 'nav-menu-list-tag-sub-a': item.code === language }]" v-for="item in languageList" :key="item.code" :to="switchLocalePath(item.code)">
                <div class="nav-menu-left" >
                  <div>{{ item.name }}</div>
                </div>
                <div class="nav-menu-right" v-if="item.code === language">
                  <img src="~/static/images/com_select_on1.svg" alt="com_select_on">
                </div>
              </nuxt-link>
            </div>
          </div>
          <img v-if="userinfo.userPortrait" @click="handleExpand('right')" class="header-common1 cursor-pointer"  :src="userinfo.userPortrait" alt="avatar">
          <img v-else @click="handleExpand('right')" class="header-common1 cursor-pointer" :src="themeChecked? require('~/static/images/home_top_mrtx_1.svg'): require('~/static/images/home_top_mrtx_2.svg')" alt="home_top_mrtx_1">
        </div>
      </header>
    <!-- 左边抽屉 -->
    <van-popup
      v-model="showPop"
      position="left"
      class="vant-pop-320 vant-pop-320-left"
      :lazy-render="false"
      overlay-class="nav-overlay"
    >
      <div id="drawer" class="nav-menu menu-right">
        <div class="menu-header">
          <nuxt-link :to="localePath({ name: 'index', query: { page: 1 }})"> 
            <div class="logo-pop" @click="handleClickNotty" :class="themeChecked? 'logo-black': 'logo-white'"></div>
          </nuxt-link>
         <img class="close-pop" @click="showPop = false" src="~/static/images/home_top_guanbi_orange.svg">  
        </div>
        <!-- 分类 -->
        <div class="nav-list-tags type ">
          <div class="nav-menu-list-tag" >
            <div class="nav-menu-left">
              <div class="nav-menu-tag"><img :src="themeChecked? require('~/static/images/my_gn_leixing_1.svg'): require('~/static/images/my_gn_leixing.svg')" alt=""></div>
              <div>{{ $t('str_tags') }}</div>
            </div>
            <nuxt-link :to="localePath({ name: 'category'})"  class="all-type">{{ $t("All") }}</nuxt-link>
          </div>
          <div class="category-thumb">
            <Thumb :tag="type" v-for="(type, i) in typeList" v-show="i < 6" :key="type.id"></Thumb>
          </div>
          <div class="nav-menu-list-tag-empty"></div>
        </div>
        <div v-show="!showTypeExpand" class="type-div"></div> 
        <!-- 标签 -->
        <div class="nav-list-tags">
          <div class="nav-menu-list-tag" >
            <div class="nav-menu-left">
              <div class="nav-menu-tag"><img :src="themeChecked? require('~/static/images/my_gn_biaoqian_1.svg'): require('~/static/images/my_gn_biaoqian.svg')" alt="my_gn_biaoqian"></div>
              <div>{{ $t('str_menu_tag') }}</div>
            </div>
            <nuxt-link :to="localePath({ name: 'tag'})"  class="all-tag">{{ $t("All") }}</nuxt-link>
          </div>
          <div class="tags-link">
            <nuxt-link :to="localePath({
              name: 'tag-name',
              params: { id: tag.id, name: tag.urlSlug }
            })"  v-for="tag in tagList" :key="tag.id" >
              <span class="tags"> {{ tag.name }}</span>
            </nuxt-link>
          </div>
          <div class="nav-menu-list-tag-empty"></div>
        </div>
      </div>
    </van-popup>
    <!-- 右边抽屉 -->
    <van-popup
      v-model="showRightPop"
      position="right"
      class="vant-pop-320 vant-pop-320-right"
      overlay-class="nav-overlay"
    >
      <div id="drawer" class="nav-menu menu-left">
        <div class="menu-flex">
          <div class="menu-header">
          <img class="close-pop" @click="showRightPop = false" src="~/static/images/home_top_guanbi_orange.svg">  
          <nuxt-link :to="localePath({ name: 'index', query: { page: 1 }})"> 
            <div class="logo-pop" @click="handleClickNotty" :class="themeChecked? 'logo-black': 'logo-white'"></div>
          </nuxt-link>
          </div>
          <!-- 登录 -->
          <div class="nav-menu-btns cursor-pointer" v-if="!isLogin">
            <nuxt-link class="nav-menu-btns-left" :to="localePath('login')">
              <div class="nav-menu-login">
                <img :src="themeChecked? require('~/static/images/home_top_mrtx_1.svg'): require('~/static/images/home_top_mrtx_2.svg')" alt="home_top_mrtx_2">
              </div>
              <div>{{ $t('str_login') }}</div>
            </nuxt-link>
            <!-- 注册 -->
            <nuxt-link class="nav-menu-btns-left cursor-pointer" :to="localePath('register')">
              <div class="nav-menu-res">
                <img :src="themeChecked? require('~/static/images/home_top_zhuce_1.svg'): require('~/static/images/home_top_zhuce.svg')" alt="home_top_zhuce">
              </div>
              <div>{{ $t('str_register') }}</div>
            </nuxt-link>
          </div>
          <!-- 用户中心 -->
          <div class="nav-list-tags nav-user-center cursor-pointer" @click="handleGoPage('user')" v-show="isLogin">
            <div class="nav-menu-list-tag nav-menu-list-spec">
              <div class="nav-menu-left">
                <div class="nav-menu-tag">
                  <img v-if="userinfo.userPortrait" :src="userinfo.userPortrait" alt="avatar">
                  <img v-else src="~/static/images/home_top_gaoliang.svg" alt="home_top_gaoliang">
                </div>
                <div class="register-name">
                  <span class="user-nick-name"> {{  userinfo.userNickName || userinfo.userName }} </span>
                  <span class="user-register-time"> {{ formatTime1(userinfo.userRegTime) }} </span>
                </div>
              </div>
              <div @click="handleGoPage('user')">
                <img :src="themeChecked? require('~/static/images/com_jt_sx_you.svg'): require('~/static/images/com_jt_sx_you_rj.svg')" alt="com_jt_sx_you_rj">
              </div>
            </div>
          </div>
          <!-- 历史记录 -->
          <nuxt-link class="nav-menu-list cursor-pointer" :to="localePath('porn-history')" >
            <div class="nav-menu-left">
              <div class="nav-menu-tag"><img :src="themeChecked? require('~/static/images/my_gn_lsjl_1.svg'): require('~/static/images/my_gn_lsjl.svg')" alt="my_gn_lsjl"></div>
              <div>{{ $t('str_his') }}</div>
            </div>
          </nuxt-link>
          <!-- 收藏 -->
          <div class="nav-menu-list cursor-pointer" @click="handleGoPage('collect')" >
            <div class="nav-menu-left">
              <div class="nav-menu-tag"><img :src="themeChecked? require('~/static/images/my_gn_wdsc_1.svg'): require('~/static/images/my_gn_wdsc.svg')" alt="my_gn_wdsc"></div>
              <div>{{ $t('str_collect') }}</div>
            </div>
          </div>
          <!-- 点赞 -->
          <div class="nav-menu-list cursor-pointer" @click="handleGoPage('up')"  >
            <div class="nav-menu-left">
              <div class="nav-menu-tag"><img :src="themeChecked? require('~/static/images/my_gn_dz_1.svg'): require('~/static/images/my_gn_dz.svg')"></div>
              <div>{{ $t('str_like') }}</div>
            </div>
          </div>
          <!-- 语言 -->
          <div class="nav-list-tags cursor-pointer">
            <div class="nav-menu-list-tag" @click="handleShowExpand('language')">
              <div class="nav-menu-left">
                <div class="nav-menu-tag"><img :src="themeChecked? require('~/static/images/my_gn_yuyan_1.svg'): require('~/static/images/my_gn_yuyan.svg')" alt="my_gn_yuyan"></div>
                <div>{{ $t('str_change_lang') }}</div>
              </div>
              <div class="nav-menu-right">
                <div class="nav-menu-lang">{{ $i18n.localeProperties.name }}</div>
                <div  :class="showLanguageExpand? (themeChecked? 'user-menu-list-right-type' : 'user-menu-list-right-type-white'): (themeChecked? 'user-menu-list-right-type-actived' : 'user-menu-list-right-type-actived-white')"></div>
              </div>
            </div>
            <template v-if="!showLanguageExpand">
              <nuxt-link class="nav-menu-list-tag-sub cursor-pointer" v-for="item in languageList" :key="item.code" :to="switchLocalePath(item.code)">
                <!-- @click.stop="window.reload()" -->
                <div class="nav-menu-left" >
                  <div class="nav-menu-tag hide-opacity"><img src="~/static/images/my_gn_biaoqian_1.svg" alt="my_gn_biaoqian_1"></div>
                  <div>{{ item.name }} </div>
                </div>
                <div class="nav-menu-right" v-if="item.code === language">
                  <img src="~/static/images/com_select_on1.svg" alt="com_select_on">
                </div>
              </nuxt-link>
            </template>
          </div>
          <!-- 地区 -->
          <div v-if="!showLanguageExpand" class="type-div"></div>
          <div class="nav-list-tags cursor-pointer" ref="main">
            <div class="nav-menu-list-tag" @click="handleShowExpand('location')">
              <div class="nav-menu-left">
                <div class="nav-menu-tag"><img :src="themeChecked? require('~/static/images/my_gn_guojia_1.svg'): require('~/static/images/my_gn_guojia.svg')" alt="my_gn_guojia"></div>
                <div> {{ $t('str_change_cuy') }} </div>
              </div>
              <div class="nav-menu-right">
                <div class="nav-menu-lang">{{ locationText }}</div>
                <div :class="showLocationExpand? themeChecked ? 'user-menu-list-right-type' : 'user-menu-list-right-type-white': themeChecked? 'user-menu-list-right-type-actived' : 'user-menu-list-right-type-actived-white'"></div>
              </div>
            </div>
            <template v-if="!showLocationExpand">
              <div class="location-menu cursor-pointer" ref="content">
                <div class="nav-menu-list-tag-sub" v-for="item in locationList" :key="item.id" @click="handleChangLocation(item)">
                  <div class="nav-menu-left">
                    <div class="nav-menu-tag hide-opacity"><img src="~/static/images/my_gn_biaoqian_1.svg" alt="my_gn_biaoqian_1"></div>
                    <div>{{ $t(item.country) }}</div>
                  </div>
                  <div class="nav-menu-right" v-if="item.code === location">
                    <img src="~/static/images/com_select_on1.svg" alt="com_select_on">
                  </div>
                </div>
              </div>
            </template>
          </div>
          <div v-if="!showLocationExpand" class="type-div"></div>
          <!-- 添加主屏 -->
          <div class="nav-menu-dl cursor-pointer">
            <div class="nav-menu-btn nav-ios" @click="handleAddMain">
              <div class="header-common"><img :src="themeChecked? require('~/static/images/my_gn_xz_ios_1.svg'): require('~/static/images/my_gn_xz_ios.svg')"></div>
              <div class="nav-text">{{ $t('str_tianjia_zhupin') }}</div>
            </div>
            <div v-if="false" class="nav-menu-btn nav-and" @click="downloadApp">
              <div class="header-common"><img :src="themeChecked? require('~/static/images/my_gn_xz_android_1.svg'): require('~/static/images/my_gn_xz_android.svg')"></div>
              <div class="nav-text">{{ $t('str_down_load') }} </div>
            </div>
          </div>
        </div>

        <!-- 推出登录 -->
        <div class="nav-menu-list login-out" @click="handleLoginOut" v-show="isLogin">
          <div class="nav-menu-left">
            <div class="nav-menu-tag"><img :src="themeChecked? require('~/static/images/my_gn_tuideng_1.svg'): require('~/static/images/my_gn_tuideng.svg')"></div>
            <div> {{ $t('str_logout') }}</div>
          </div>
        </div>
      </div>
    </van-popup>

    <dialogLine ref="dialogLineRef" @goLogin="goLogin"></dialogLine>
    <dialogGuild ref="dialogGuildRef"></dialogGuild>
  </div>
  
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import Overlay from '@/components/overlay'
import dialogGuild from '@/components/dialog/dialog-guild.vue'
import { areaList } from "~/locales/lang.js"
import CODES from "~/plugins/enums/codes"
import Thumb from '~/components/thumb'
import { formatTime1 } from '@/utils/format.js'

export default {
  async fetch() {
    const res1 = await this.$homeApi.postTagListPage({ page: 1, size: 20})
    const res2 = await this.$homeApi.postTypeList({ page: 1, size: 20, isSorted: true,})
    this.tagList = res1.data.data;
    this.typeList = res2.data.data;
  },
  fetchOnServer: true,
  data() {
    return {
      showPop: false, // 左边抽屉
      showRightPop: false, // 右边抽屉
      showTypeExpand: true, //分类
      showLanguageExpand: true, //语言
      showLocationExpand: true, //国家
      showExpand: true, // 标签
      
      languageList: this.$i18n.locales, // 语言数据
      language: this.$i18n.locale, //语言
      location: 'US1', //国家
      locationList: areaList, // 国家数据
      themeChecked: true, // 主题切换
      typeList: [],  // 分类数据
      overlayShow: false,  // 指引遮罩层
      tagList: [], //标签数据
      pageInfo: {
        page: 1,
        size: 10
      },
      pcNavLocShow: false,
    }
  },

  components: {
    dialogLine: () => import('@/components/dialog/dialog-line.vue'),
    // dialogGuild: () => import('@/components/dialog/dialog-guild.vue'),
    dialogGuild,
    Overlay,
    Thumb
  },
  created(){
    console.log( 'this.$route.name', this.$route.name )
    // this.initTypeList()
    // this.initTagList()
    this.themeChecked = this.theme === 'dark'
    if(process.client){
      document.documentElement.setAttribute('data-theme', this.theme)
      this.$nextTick(() => {
        // this.handleFocus()
        this.location = localStorage.getItem('location') || 'US1'
        !localStorage.getItem('showGuild') && this.$refs.dialogGuildRef.onShow()
      })
    }
    if(['home___en', 'home___pt'].includes(this.$route.name)){
      this.set_tagid('')
      this.set_typeid('')
    }
  },

  mounted(){
    this.set_categoryList( this.typeList)
    this.set_tagList( this.tagList)
    this.handleFocus()

    // 点击其他元素，卸载视频
    document.addEventListener(
        "click",
        (e) => {
            
            let vantPopleft = document.querySelector('.vant-pop-320-left');
            if( vantPopleft && !vantPopleft.contains(e.target) ){
              this.showPop = false;
            }

            let vantPopright = document.querySelector('.vant-pop-320-right');
            if( vantPopright && !vantPopright.contains(e.target) ){
              this.showRightPop = false;
            }
          
            let homenavlocDom = document.querySelector('.home-nav-loc');
            if( homenavlocDom && !homenavlocDom.contains(e.target) ){
              this.pcNavLocShow = false;
            }
        },
        true
    );

    console.log( this.tagList, this.typeList, "typeList&tagList" )
  },
  computed: {
    ...mapGetters(['userinfo', 'theme', 'isLogin', 'tagId', 'typeId','accessToken']),

    locationText() {
      const obj = this.locationList.find(item => this.location === item.code) || {}
      return this.$t(obj.country)
    },
    // 当前得路由
    routeName(){
      return this.$route.name
    }
  },
  methods: {
    formatTime1 ,
    ...mapActions(['set_userinfo', 'set_detail', 'update_theme', 'set_show', 'set_tagid', 'set_typeid','clearAccessToken', 'set_tagList', 'set_categoryList']),
    handleClick(id){
      this.set_typeid(id)
      console.log(id, 'typeid')
    },
    handleFocus(){
      this.$refs.searchRef && this.$refs.searchRef.focus()
    },
    handleClickNotty(){
      console.log(this.$route.name)
      if(['index___en', 'index___pt'].includes(this.$route.name)){
        console.log('789')
        this.$emit('refresh')
        this.handleScroll()
      } else {
        this.$router.push(this.localePath('/'+  this.$i18n.locale ))
        this.$emit('refresh')
      }
    },
    handleScroll() {
      console.log(document.querySelector('#home-top'))
      const navHeight = document.querySelector('.home-header').offsetHeight
      console.log('top')
      // scrollIntoView() js原生方法，实现锚点滚动过渡
      const target = document.querySelector('#home-top')
      target.scrollIntoView({ behavior: 'smooth',  block: "start" })
      // window.scrollTo(0, 0)
      // scrollTo() 把内容滚动到指定的坐标。减去导航高度的目的：导航用定位固定在顶部，如果不减去，导航栏会遮挡一部分内容
      // console.log(target.offsetTop, navHeight, target.offsetTop - navHeight, 'height')
      // window.scrollTo(0, target.offsetTop - navHeight - 10)
    },
    handleAddMain(){
      this.overlayShow = true
    },
    handleGoTag(){
      this.$router.push(this.localePath('tag'))
    },
    handleClickTag(item){
      gtag('event', 'gt4_click_tags', {
        id: item.id,
        name: item.name,
      });
      localStorage.removeItem('search')
      this.set_tagid(item.id)
      this.$router.push(this.localePath({
        name: 'tag-name',
        params:{
          id: item.id,
          name: item.name,
          refresh: true,
        },
      }));
    },
    async initTypeList(){
      try {
        const params = {
          isSorted: true,
          ...this.pageInfo
        }
        const res = await this.$homeApi.postTypeList(params)
        console.log(res, 'typeList334')
        if(res.code === CODES.SUCCESS){
          console.log(res.data, 'initTagList')
          this.typeList = res.data.data || []
          this.set_categoryList(res.data.data || [])
        }
        console.log(this.typeList, res, 'tag')
      } catch (error) {
        console.error(error)
      }
    },
    async initTagList(){
      try {
        const res = await this.$homeApi.postTagListPage(this.pageInfo)
        console.log(res, 'tagList334')
        if(res.code === CODES.SUCCESS){
          console.log(res.data, 'initTagList')
          this.tagList = res.data.data || []
          this.set_tagList(res.data.data || [])
        }
        console.log(this.tagList, res, 'tag')
      } catch (error) {
        console.error(error)
      }
    },

    async handleLoginOut(){
      try {
        this.set_userinfo({})
        const res = await this.$homeApi.postLoginOut()
        if(res.code === CODES.SUCCESS){
          this.$toast(this.$t('toast7'))
          this.set_userinfo({})
          this.clearAccessToken()
        }
      } catch (error) {
        console.error(error)
      }
    },


    handleShowExpand(val){
      if(val==='type'){
        this.showTypeExpand = !this.showTypeExpand
      } else if(val === 'tag') {
        this.showExpand = !this.showExpand
      } else if(val === 'language') {
        this.showLanguageExpand = !this.showLanguageExpand
      } else if(val === 'location') {
        this.showLocationExpand = !this.showLocationExpand
      }
    },
    handleExpand(val) {
      if(val==='left'){
        this.showPop = !this.showPop
      }else{
        this.showRightPop = !this.showRightPop
      }
    },
    onClickLeft() {
      Toast('返回');
    },
    onClickRight() {
      Toast('按钮');
    },

    handleChangLocation(item){
      this.location = item.code;
      // this.$i18n.setLocale(item.code)
      // this.$nuxtI18nSetLanguage(item.code)
      localStorage.setItem("location", item.code)
      if( process.client ){
        window.scrollTo(0, 0); // 滚动到顶部
        this.$nuxt.$router.go(); // 刷新当前路由
      }
    },
    handleChangeTheme(val){
      if(val){
        document.documentElement.setAttribute('data-theme', 'dark')
        this.update_theme('dark')
      } else {
        document.documentElement.setAttribute('data-theme', 'light')
        this.update_theme('light')
      }
    },
    goLogin(){
      this.$router.push(this.localePath('login'))
    },
    handleGoPage(val){
      if( val == "collect" && !this.isLogin ){
        return this.$router.push(this.localePath('login'))
      }
      if( val == "pwdset" && !this.isLogin ){
        return this.$router.push(this.localePath('login'))
      }
      if(val === 'line') {
        this.$refs.dialogLineRef.onLineShow()
      } else if (val === 'search') {
        this.set_show(true)
      } else {
        this.$router.push(this.localePath(val))
      }
    },
    downloadApp() {
      let url = "https://nottyhub.com/nottyhub-1-0-0.apk"
      let fileName = "Nottyhub"
      const aLink = document.createElement('a');
      aLink.style.display = 'none';
      aLink.href = url;
      aLink.download = fileName;
      aLink.target = '_parent';
      document.body.appendChild(aLink);
      aLink.click();
      document.body.removeChild(aLink); // 下载完成移除元素
    },


  }
}
</script>
<style lang="less" scoped>
header{
  height: 45px;
  line-height: 45px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px;
  background-color: #0C1015;
  border-bottom: 1px solid var(--bg-color2, rgba(245, 245, 247, 0.06));
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  .header-right{
    display: flex;
    align-items: center;
  }
  .header-search{
    margin-right: 16px;
  }
}
.header-common{
  width: 24px;
  height: 24px;
  border-radius: 24px;
  object-fit: cover;
  img{
    width: 24px;
    height: 24px;
    border-radius: 24px;
  }
}
.header-common1{
  width: 24px;
  height: 24px;
  border-radius: 24px;
  object-fit: cover;
  img{
    width: 24px;
    height: 24px;
    border-radius: 24px;
  }
}
.header-logo{
  width: 108px;
  height: 24px;
}
.header-logo img{
  width: 100%;
  height: 100%;
}
.color{
  color: var(--text-color3, rgba(96, 105, 128, 0.40));
  font-size: 15px;
}
.logo-black{
  width: 108px;
  height: 24px;
  background-image: url('~~/static/images/logo-black.svg');
  background-repeat: no-repeat;
  background-size: cover;
}
.logo-white{
  width: 108px;
  height: 24px;
  background-image: url('~~/static/images/logo-white.svg');
  background-repeat: no-repeat;
  background-size: cover;
  // margin-top: 8px;
  // margin-bottom: 16px;
}
.nav-menu-btns{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
  margin-bottom: 24px;
}
.nav-menu-btns-left{
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #FFFFFF;
}
.nav-menu-btns-left:first-child{
  margin-right: 80px;
}
.nav-menu-login,.nav-menu-res{
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: var(--bg-color2, rgba(255, 255, 255, 0.06));
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  img{
    width: 24px;
    height: 24px;
  }
}
.nav-menu{
  width: 100%;
  height: 100%;
  padding: 0 12px;
  overflow: auto;
}
.nav-list-tags{
  background-color: var(--bg-color2, rgba(255, 255, 255, 0.06));
  border-radius: 7.992px;
  &.type{
    /deep/ .category-thumb {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .thumb-list{
        width: 49%;
        display: block;
        margin-top: 0;
      }
      .van-image{
        width: 100%;
        height: 78px;
      }
      .thumb-text{
        width: 100%;
      }
    }
  }
}
.type-div{
  height: 4px;
  background-color: var(--bg-color1, #0E0E0F);
}
// .nav-list-tags:first-child{
//   margin-top: 16px;
// }
.nav-menu-list-tag{
  /* background-color: var(--bg-color2, rgba(255, 255, 255, 0.06)); */
  line-height: 40px;
  color: var(--text-color1, #FFFFFF);
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  padding: 0 12px;
  margin-bottom: 4px;
}

.nav-menu-list-tag-sub{
  height: 32px;
  line-height: 32px;
  color: var(--text-color1, #FFFFFF);
  font-size: 14px;
  border-radius: 8px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nav-menu-list{
  height: 40px;
  background-color: var(--bg-color2, rgba(255, 255, 255, 0.06));
  line-height: 40px;
  color: var(--text-color1, #FFFFFF);
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  padding: 0 12px;
  margin-bottom: 4px;
}
.nav-menu-lang{
  margin-right: 8px;
  color: var(--text-color2,  rgba(255, 255, 255, 0.70));
}
.nav-menu-theme{
  color: var(--text-color2,  rgba(255, 255, 255, 0.70));
}
.nav-menu-switch{
  margin: 0 8px;
}
.nav-menu-list-tag-all{
  width: 232px;
  height: 28px;
  border-radius: 8px;
  background-color: var(--bg-color2, rgba(255, 255, 255, 0.06));
  margin: 0 auto;
  text-align: center;
  // margin-bottom: 4px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
.nav-menu-list-tag-empty{
  height: 6px;
  margin-bottom: 4px;
}
.tag-white {
  background-color: #ffffff;
}
.nav-menu-list:first-child{
  margin-top: 4px;
}
.nav-menu-dl{
  height: 68px;
  padding-top: 4px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}
.nav-text{
  color: var(--text-color1, #FFFFFF);
  line-height: 19.6px;
  margin-top: 9px;
}
.nav-menu-btn{
  width: 146px;
  height: 68px;
  border-radius: 8px;
  background-color: var(--bg-color2, rgba(255, 255, 255, 0.06));
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 14px;
  padding-top: 9px;
}
.nav-menu-left{
  flex: 1;
}
.nav-menu-left,.nav-menu-right{
  display: flex;
  align-items: center;
  // justify-content: center;
  /deep/ .van-switch--on{
    // width: 40px;
    // height: 24px;
    .van-switch__node{
      background-image: url("~~/static/images/cbl_zt_night_hui.svg");
      
      // margin-top: 4px;
      // top: 50%;
      // transform: translateY(-50%);
    }
  }
}
.nav-menu-tag{
  width: 24px;
  height: 24px;
  margin-right: 8px;
  display: flex;
}
.nav-ios{
  margin-right: 4px;
}
.hide-opacity{
  opacity: 0;
}
.typeName{
  font-size: 14px;
}
.user-menu-list-right-type{
  width: 12px;
  height: 12px;
  background-image: url(~~/static/images/com_jt_sx_xia.svg);
  background-size: contain;
  background-repeat: no-repeat;
}
.user-menu-list-right-type-white{
  width: 12px;
  height: 12px;
  background-image: url(~~/static/images/com_jt_sx_xia_rj.svg);
  background-size: contain;
  background-repeat: no-repeat;
}
.user-menu-list-right-type-actived{
  width: 12px;
  height: 12px;
  background-image: url(~~/static/images/com_jt_sx_shang.svg);
  background-size: contain;
  background-repeat: no-repeat;
}
.user-menu-list-right-type-actived-white{
  width: 12px;
  height: 12px;
  background-image: url(~~/static/images/com_jt_sx_shang_rj.svg);
  background-size: contain;
  background-repeat: no-repeat;
}
.nav-menu-list-spec{
  margin-bottom: 8px;
}
.home-header{
  .logo-black, .logo-white{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-54px, -12px);
  }
  .pc-logo{
    position: absolute;
    left: 100px;
    cursor: pointer;
  }
}

.menu-header{
  width: 100%;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  .logo-pop{
    width: 108px;
    height: 24px;
  }
  .close-pop{
    width: 24px;
    height: 24px;
  }
}
.menu-left .menu-header{
  margin-bottom: 0;
}
.category-thumb{
  padding: 0 12px;
}
.tags-link{
  padding: 0 12px;
  .tags{
    color: rgba(255, 255, 255, 0.70);
    font-size: 12px;
    padding: 3.5px 8px 3.5px 8px;
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 0.1);
    margin-right: 8px;
    margin-bottom: 8px;
    display: inline-block;
  }
}
.menu-left{
  display: flex;
  flex-direction: column;
}
.menu-flex{
  flex: 1;
}
.login-out{
  margin-top: 12px;
  margin-bottom: 32px;
  cursor: pointer;
}
.nav-user-center{
  background-color: transparent;
  .nav-menu-list-spec{
    margin-bottom: 35px;
    margin-top: 24px;
  }
  .nav-menu-list-tag{
    line-height: normal;
  }
  img{
    width: 24px;
    height: 24px;
  }
  .nav-menu-tag{
    width: auto;
    height: auto;
    img{
      width: 56px;
      height: 56px;
      border-radius: 56px;
      object-fit: cover;
    }
  } 
  .register-name{

    .user-nick-name{
      font-size: 18px;
      color: #FFFFFF;
      display: block;
    }
    .user-register-time{
      display: block;
      color: var(--ffffff-70, rgba(255, 255, 255, 0.70));
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      margin-top: 12px;
    }
  }
}

.all-tag, .all-type{
  color: #FFFFFF;
}

.search-img{
  width: 16px;
  height: 16px;
  display: flex;
}

.search-input{
  width: 75vw;
  margin: 0 auto;
  background-color: var(--bg-color3, rgba(246, 214, 88, 0.1));
  border-radius: 24px;
  text-indent: 2.5em;
  color: var(--bg-secondry,  #FD46F6);
  height: 48px;
  border: 1PX solid var(--bg-primary, #F6D658);
}
input::placeholder{
  color: var(--bg-secondry,  #FD46F6);
}
.com-sousuo{
  position: absolute;
  left: 12px;
  top: 8px;
  width: 16px;
  height: 16px;
}
.search-icon{
  position: absolute;
  left: 12px;
  top: 40px;
  width: 16px;
  height: 16px;
  cursor: pointer;
}

</style>