<template>
  <div class="home-footer">
    <nuxt-link :to="localePath(item.id)" class="home-footer-list d-sm-none" v-for="(item, index) in footerList" :key="index">
      <div class="home-footer-tag">{{ item.name }}</div>
      <div class="home-footer-right">
        <img :src="themeChecked? require('~/static/images/com_jt_sx_you.svg'): require('~/static/images/com_jt_sx_you_rj.svg')" alt="">
      </div>
    </nuxt-link>
    <div class="d-none d-sm-block pc-footer">
      <nuxt-link :to="localePath(item.id)" class="home-footer-list-pc" v-for="(item, index) in footerList" :key="index">
        <div class="home-footer-tag">{{ item.name }}</div>
      </nuxt-link>
    </div>
    
    <div class="home-footer-icon">
      <div class="home-footer-com">  © {{ hostname }}, 2023 </div>
      <div><img class="rta" :src="themeChecked? require('~/static/images/rat.png'): require('~/static/images/rat-1.png')" alt="rta"></div>
      <div class="footer-row">
        <a href="https://www.facebook.com/nottyhub" target="_blank"><img class="common" :src="themeChecked? require('~/static/images/facebook_1.svg'): require('~/static/images/rat-1.png')" alt="rta"></a>
        <a href="https://www.instagram.com/nottyhub.club/" target="_blank"><img class="common" :src="themeChecked? require('~/static/images/instagram_1.svg'): require('~/static/images/rat-1.png')" alt="rta"></a>
        <a href="https://www.youtube.com/@NottyHub" target="_blank"><img class="common" :src="themeChecked? require('~/static/images/youtube_1.svg'): require('~/static/images/rat-1.png')" alt="rta"></a>
        <a href="https://twitter.com/nottyhub" target="_blank"><img class="common" :src="themeChecked? require('~/static/images/twitter_1.svg'): require('~/static/images/rat-1.png')" alt="rta"></a>
        <a href="https://www.tiktok.com/@nottyhub" target="_blank"><img class="common" :src="themeChecked? require('~/static/images/tiktok_1.svg'): require('~/static/images/rat-1.png')" alt="rta"></a>
        <a href="ttps://t.me/+UClKi43iLeFkYzA1" target="_blank"><img class="common" :src="themeChecked? require('~/static/images/telegram_1.svg'): require('~/static/images/rat-1.png')" alt="rta"></a>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex"
export default{
  data(){
    return {
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
  }
}
</script>
<style lang="less" scoped>
.home-footer{
  // position: absolute;
  // z-index: 9999;
  // bottom: 0;
  // left: 0;
  // right: 0;
  width: 100%;
  padding: 0 12px;
  color: var(--text-color2, rgba(255, 255, 255, 0.70));
  background-color: #262627;
  min-height: 144px;
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
  .pc-footer{
    padding: 8px 0;
    border-bottom: 1PX solid rgba(245, 245, 247, 0.1);
  }
  .home-footer-list-pc{
    display: inline-block;
    padding: 16px 40px 16px 0;
  }
  .home-footer-com{
    font-size: 14px;
    margin-top: 16px;
    margin-bottom: 16px;
    margin-right: 16px;
    width: 100%;
  }
  .home-footer-icon{
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
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
</style>