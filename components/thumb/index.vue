<template>
  <nuxt-link 
    class="thumb-list" 
    :to="localePath(tag.urlSlug)"      
    >
    <van-image
      lazy-load
      :src="tag.img"
    >
      <template slot="loading">
        <img class="loading-img" :src="themeChecked? require('~/static/images/com_lazy_black.svg') : require('~/static/images/com_lazy_white.svg')" alt="com_lazy_white">
      </template>
      <template slot="error">
        <img class="error-img" :src="themeChecked? require('~/static/images/com_lazy_black.svg') : require('~/static/images/com_lazy_white.svg')" alt="com_lazy_white">
      </template>
    </van-image>
    <div class="thumb-text" >
      <div class="thumb-left">{{ tag.title }}</div>
      <!-- <div class="thumb-right">
        <div :class="themeChecked?'main-video-num': 'main-video-num-white'"></div>
        <div class="thumb-num">{{ tag.vodCount || 0 }} <span class="thumb-videos">Videos</span></div>
      </div> -->
    </div>
    <div class="mask" @click.stop="handleClickType(tag)">
    </div>
  </nuxt-link>
</template>
<script>
import { mapActions } from 'vuex'
import commonMinxin from '~/plugins/mixins/common'
export default{
  mixins: [commonMinxin],
  data() {
    return {
      tagList: []
    }
  },
  props: {
    tag: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    ...mapActions(['set_detail', 'set_typeid']),
    handleClickType(item){
      console.log( 'set_typeid' )
      this.set_typeid(item.id)
      localStorage.removeItem('search')
    }
  }
}
</script>
<style lang="less" scoped>
.thumb-list{
  margin-top: 8px;
  position: relative;
  // min-width: 185px;
  // min-height: 105px;
  .mask{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.00) 50%, rgba(0, 0, 0, 0.20) 75%, rgba(0, 0, 0, 0.60) 100%); 
    z-index: 9;
  }
  /deep/ .van-image{
      // min-width:185px;
      // min-height:105px;
      // width:185px;
      // height:105px;
      border-radius: 4px;
      .loading-img, .error-img{
        width: 100%;
        height: 100%;
      }
    }
   
}
.thumb-text{
  position: absolute;
  // left: 0;
  bottom: 0;
  width: 185px;
  z-index: 10;
  // display: flex;
  // justify-content: space-between;
  // align-items: center;

  padding: 4px 8px 8px;
   
  .thumb-left{
    font-size: 14px;
    color: var(--text-color1, #FFFFFF);
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    max-width: 130px;
  }
  .thumb-right{
    font-size: 12px;
    color: var(--text-color2,  rgba(255, 255, 255, 0.70));
    display: flex;
    align-items: center;
    line-height: 16.8px;
    margin: auto 0;
    margin-top: 5px;
  }
  .thumb-num{
    margin-top: 2px;
  }
  .main-view{
    width: 12px;
    height: 12px;
  }
  .thumb-videos{
    margin-left: 5px;
  }
}
</style>