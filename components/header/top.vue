<template>
  <div class="header">
    <Overlay v-model="overlayShow" v-if="overlayShow"></Overlay>
      <header class="home-header" id="home-header">
        <img @click="handleExpand('left')" :src="themeChecked? require('~/static/images/home_top_more_1.svg'): require('~/static/images/home_top_more.svg')" class="header-common" alt="more">
        <div @click="handleClickNotty"  :class="themeChecked? 'logo-black': 'logo-white'"></div>
        <div class="header-right">
          <nuxt-link :to="localePath('search')">
            <img @click="handleGoPage('search')" :src="themeChecked? require('~/static/images/com_sousuo_1.svg'): require('~/static/images/com_sousuo.svg')" class="header-common header-search" alt="com_sousuo">
          </nuxt-link>
          
          <img @click="handleExpand('right')" class="header-common1" :src="themeChecked? require('~/static/images/home_top_mrtx_1.svg'): require('~/static/images/home_top_mrtx_2.svg')" alt="home_top_mrtx_1">
        </div>
      </header>
    <!-- 左边抽屉 -->
    <van-popup
      v-model="showPop"
      position="left"
      class="vant-pop-320"
      :lazy-render="false"
    >
      <div id="drawer" class="nav-menu menu-right">
        <div class="menu-header">
         <div class="logo-pop" @click="handleClickNotty" :class="themeChecked? 'logo-black': 'logo-white'"></div>
         <img class="close-pop" @click="showPop = false" src="~/static/images/home_top_guanbi_orange.svg">  
        </div>
        <div class="nav-list-tags type">
          <div class="nav-menu-list-tag" @click="handleShowExpand('type')">
            <div class="nav-menu-left">
              <div class="nav-menu-tag"><img :src="themeChecked? require('~/static/images/my_gn_leixing_1.svg'): require('~/static/images/my_gn_leixing.svg')" alt=""></div>
              <div>{{ $t('str_tags') }}</div>
            </div>
            <div :class="showTypeExpand?(themeChecked? 'user-menu-list-right-type' : 'user-menu-list-right-type-white'): (themeChecked? 'user-menu-list-right-type-actived' : 'user-menu-list-right-type-actived-white')"></div>
          </div>
          <template v-if="!showTypeExpand">
            <nuxt-link :to="localePath({
              name: 'category-id-name',
              params: { id: item.id, name: item.title }
            })" v-for="(item) in typeList" :key="item.id">
              <div @click="handleClick(item.id)" class="nav-menu-list-tag-sub">
                <div class="nav-menu-left">
                  <div class="nav-menu-tag hide-opacity"><img src="~/static/images/my_gn_biaoqian_1.svg" alt=""></div>
                  <div class="typeName">{{ item.title }}</div>
                </div>
                <div class="nav-menu-right" v-if="item.id === typeId &&  ['category-id-name___en', 'category-id-name___pt'].includes(routeName) ">
                  <img src="~/static/images/com_select_on.svg" alt="com_select_on">
                </div>
              </div>
            </nuxt-link>
            <nuxt-link class="nav-menu-list-tag-sub nav-menu-list-tag-all" :class="!themeChecked && 'tag-white'" :to="localePath('category')"> {{ $t('str_menu_type_all') }}</nuxt-link>
            <div class="nav-menu-list-tag-empty"></div>
          </template>
        </div>
        <div v-if="!showTypeExpand" class="type-div"></div> 
        <div class="nav-list-tags">
          <div class="nav-menu-list-tag" @click="handleShowExpand('tag')">
            <div class="nav-menu-left">
              <div class="nav-menu-tag"><img :src="themeChecked? require('~/static/images/my_gn_biaoqian_1.svg'): require('~/static/images/my_gn_biaoqian.svg')" alt="my_gn_biaoqian"></div>
              <div>{{ $t('str_menu_tag') }}</div>
            </div>
            <div :class="showExpand?(themeChecked? 'user-menu-list-right-type' : 'user-menu-list-right-type-white'): (themeChecked? 'user-menu-list-right-type-actived' : 'user-menu-list-right-type-actived-white')"></div>
          </div>
          <div v-show="!showExpand">
            <nuxt-link :to="localePath({
              name: 'tag-name',
              params: { id: tag.id, name: tag.name }
            })"  v-for="tag in tagList" :key="tag.id" >
              <div class="nav-menu-list-tag-sub"  @click="set_tagid(item.id)">
                <div class="nav-menu-left">
                  <div class="nav-menu-tag hide-opacity"><img  src="~/static/images/my_gn_biaoqian_1.svg" alt="my_gn_biaoqian_1"></div>
                  <div>{{ tag.name }}</div>
                </div>
                <div class="nav-menu-right" v-if="tag.id === tagId && ['tag-id-name___en', 'tag-id-name___pt'].includes(routeName)">
                  <img src="~/static/images/com_select_on.svg" alt="com_select_on">
                </div>
              </div>
            </nuxt-link>
            <!-- 所有标签 -->
            <nuxt-link class="nav-menu-list-tag-sub nav-menu-list-tag-all" :class="!themeChecked && 'tag-white'" :to="localePath('tag')" > {{ $t('str_menu_tag_all') }}</nuxt-link>
            <div class="nav-menu-list-tag-empty"></div>
          </div>
        </div>
        <nuxt-link class="nav-menu-list" :to="localePath('history')" >
          <div class="nav-menu-left">
            <div class="nav-menu-tag"><img :src="themeChecked? require('~/static/images/my_gn_lsjl_1.svg'): require('~/static/images/my_gn_lsjl.svg')" alt="my_gn_lsjl"></div>
            <div>{{ $t('str_his') }}</div>
          </div>
        </nuxt-link>

        <div class="nav-menu-list" @click="handleGoPage('collect')" >
          <div class="nav-menu-left">
            <div class="nav-menu-tag"><img :src="themeChecked? require('~/static/images/my_gn_wdsc_1.svg'): require('~/static/images/my_gn_wdsc.svg')" alt="my_gn_wdsc"></div>
            <div>{{ $t('str_collect') }}</div>
          </div>
        </div>
        <div class="nav-menu-list" @click="handleGoPage('up')"  >
          <div class="nav-menu-left">
            <div class="nav-menu-tag"><img :src="themeChecked? require('~/static/images/my_gn_dz_1.svg'): require('~/static/images/my_gn_dz.svg')"></div>
            <div>{{ $t('str_like') }}</div>
          </div>
        </div>

        <div class="nav-menu-dl">
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
    </van-popup>
    <!-- 右边抽屉 -->
    <van-popup
      v-model="showRightPop"
      position="right"
      class="vant-pop-320"
      
    >
      <div id="drawer" class="nav-menu menu-left">
        <div class="menu-header">
         <img class="close-pop" @click="showRightPop = false" src="~/static/images/home_top_guanbi_orange.svg">  
         <div class="logo-pop" @click="handleClickNotty" :class="themeChecked? 'logo-black': 'logo-white'"></div>
        </div>
        <div class="nav-menu-btns" v-if="!isLogin">
          <div class="nav-menu-btns-left">
            <div class="nav-menu-login" @click="handleLoginorRegister('login')">
              <img :src="themeChecked? require('~/static/images/home_top_mrtx_1.svg'): require('~/static/images/home_top_mrtx_2.svg')" alt="home_top_mrtx_2">
            </div>
            <div>{{ $t('str_login') }}</div>
        </div>
        <div class="nav-menu-btns-left">
          <div class="nav-menu-res" @click="handleLoginorRegister('register')">
            <img :src="themeChecked? require('~/static/images/home_top_zhuce_1.svg'): require('~/static/images/home_top_zhuce.svg')" alt="home_top_zhuce">
          </div>
          <div>{{ $t('str_register') }}</div>
        </div>
        </div>
        <div class="nav-list-tags" @click="handleGoPage('user')" v-show="isLogin">
          <div class="nav-menu-list-tag nav-menu-list-spec">
            <div class="nav-menu-left">
              <div class="nav-menu-tag"><img src="~/static/images/home_top_gaoliang.svg" alt="home_top_gaoliang"></div>
              <!-- {{ $t('str_user_account') }}  -->
              <div>{{  userinfo.userNickName || userinfo.userName }}</div>
            </div>
            <div @click="handleGoPage('user')">
              <img :src="themeChecked? require('~/static/images/com_jt_sx_you.svg'): require('~/static/images/com_jt_sx_you_rj.svg')" alt="com_jt_sx_you_rj">
            </div>
          </div>
        </div>
        <div class="nav-list-tags">
          <div class="nav-menu-list-tag" @click="handleShowExpand('language')">
            <div class="nav-menu-left">
              <div class="nav-menu-tag"><img :src="themeChecked? require('~/static/images/my_gn_yuyan_1.svg'): require('~/static/images/my_gn_yuyan.svg')" alt="my_gn_yuyan"></div>
              <div>{{ $t('str_change_lang') }}</div>
            </div>
            <div class="nav-menu-right">
              <div class="nav-menu-lang">{{ languageText }}</div>
              <div  :class="showLanguageExpand? (themeChecked? 'user-menu-list-right-type' : 'user-menu-list-right-type-white'): (themeChecked? 'user-menu-list-right-type-actived' : 'user-menu-list-right-type-actived-white')"></div>
            </div>
          </div>
          <template v-if="!showLanguageExpand">
            <nuxt-link class="nav-menu-list-tag-sub" v-for="item in languageList" :key="item.language" :to="switchLocalePath(item.language)">
              <div class="nav-menu-left" @click.stop="window.reload()">
                <div class="nav-menu-tag hide-opacity"><img src="~/static/images/my_gn_biaoqian_1.svg" alt="my_gn_biaoqian_1"></div>
                <div>{{ item.title }}</div>
              </div>
              <div class="nav-menu-right" v-if="item.language === language">
                <img src="~/static/images/com_select_on1.svg" alt="com_select_on">
              </div>
            </nuxt-link>
          </template>
        </div>
        <div v-if="!showLanguageExpand" class="type-div"></div>
        <div class="nav-list-tags" ref="main">
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
            <div class="location-menu" ref="content">
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
        <!-- <div class="nav-menu-list">
          <div class="nav-menu-left">
            <div class="nav-menu-tag"><img :src="themeChecked? require('~/static/images/my_gn_zhuti_1.svg'): require('~/static/images/my_gn_zhuti.svg')" alt="my_gn_zhuti"></div>
            <div>{{ $t('str_change_bg') }} </div>
          </div>
          <div class="nav-menu-right">
            <van-switch @change="handleChangeTheme" v-model="themeChecked" size="16px"/>
          </div>
        </div> -->
        <div class="nav-menu-list" @click="handleLoginOut" v-show="isLogin">
          <div class="nav-menu-left">
            <div class="nav-menu-tag"><img :src="themeChecked? require('~/static/images/my_gn_tuideng_1.svg'): require('~/static/images/my_gn_tuideng.svg')"></div>
            <div> {{ $t('str_logout') }}</div>
          </div>
        </div>
      </div>
    </van-popup>
    <dialogLogin ref="dialogLoginRef" @goRegister="goRegister"></dialogLogin>
    <dialogRegister ref="dialogRegisterRef" @goLogin="goLogin"></dialogRegister>
    <dialogLine ref="dialogLineRef" @goLogin="goLogin"></dialogLine>
    <dialogGuild ref="dialogGuildRef"></dialogGuild>
  </div>
  
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import Overlay from '@/components/overlay'
import dialogGuild from '@/components/dialog/dialog-guild.vue'
import { langMap, areaList } from "~/locales/lang.js"
import CODES from "~/plugins/enums/codes"



export default {
  async fetch() {
    const res1 = await this.$homeApi.postTagListPage({ page: 1, size: 10})
    this.tagList = res1.data.data;
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
      
      languageList: langMap, // 语言数据
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
      }
    }
  },

  components: {
    dialogLogin: () => import('@/components/dialog/dialog-login.vue'),
    dialogRegister: () => import('@/components/dialog/dialog-register.vue'),
    dialogLine: () => import('@/components/dialog/dialog-line.vue'),
    // dialogGuild: () => import('@/components/dialog/dialog-guild.vue'),
    dialogGuild,
    Overlay
  },
  created(){
    console.log( 'this.$route.name', this.$route.name )
    this.initTypeList()
    // this.initTagList()
    this.themeChecked = this.theme === 'dark'
    if(process.client){
      document.documentElement.setAttribute('data-theme', this.theme)
      this.$nextTick(() => {
        this.location = localStorage.getItem('location') || 'US1'
        !localStorage.getItem('showGuild') && this.$refs.dialogGuildRef.onShow()
      })
    }
    if(['home___en', 'home___pt'].includes(this.$route.name)){
      this.set_tagid('')
      this.set_typeid('')
    }
  },

  activated(){
    console.log( 'this.$route.name', this.$route.name )
    this.showPop = false
    this.showRightPop = false
    
  },
  computed: {
    ...mapGetters(['userinfo', 'theme', 'isLogin', 'tagId', 'typeId','accessToken']),
    languageText({ language,  languageList}) {
      console.log( 'languageList', languageList, language )
      const obj = languageList[language];
      return obj.title
    },
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
    ...mapActions(['set_userinfo', 'set_detail', 'update_theme', 'set_show', 'set_tagid', 'set_typeid','clearAccessToken']),
    handleClick(id){
      this.set_typeid(id)
      console.log(id, 'typeid')
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
        const res = await this.$homeApi.postTypeList(this.pageInfo)
        console.log(res, 'typeList334')
        if(res.code === CODES.SUCCESS){
          console.log(res.data, 'initTagList')
          this.typeList = res.data.data || []
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
          this.$refs.dialogLoginRef.onShow()
        }
      } catch (error) {
        console.error(error)
      }
    },
    goRegister(){
      this.$refs.dialogRegisterRef.onShow()
    },
    goLogin(){
      this.$refs.dialogLoginRef.onShow()
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
    handleLoginorRegister(val){
      if(val === 'login'){
        this.$refs.dialogLoginRef.onShow()
      } else if (val === 'register') {
        this.$refs.dialogRegisterRef && this.$refs.dialogRegisterRef.handleShow()
      }
      this.showRightPop = false
    },
    handleGoPage(val){
      console.log(this.$route.name, 'route')
      if( val == "collect" && !this.isLogin ){
        return this.$refs.dialogLoginRef.onShow()
      }
      // if( val == "up" && !this.isLogin ){
      //   return this.$refs.dialogLoginRef.onShow()
      // }
      if( val == "pwdset" && !this.isLogin ){
        return this.$refs.dialogLoginRef.onShow()
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
  background-color: var(--bg-color1, #0E0E0F);
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
  img{
    width: 24px;
    height: 24px;
  }
}
.header-common1{
  width: 24px;
  height: 24px;
  img{
    width: 24px;
    height: 24px;
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

</style>