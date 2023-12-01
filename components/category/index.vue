<template>
  <div class="thumb-list" @click="handleClickTag(tag)">
    <van-image
      lazy-load
      :src="tag.typePic"
    >
      <template slot="loading">
        <img class="loading-img" :src="themeChecked? require('~/static/images/com_lazy_black.svg') : require('~/static/images/com_lazy_white.svg')" alt="">
      </template>
      <template slot="error">
        <img class="error-img" :src="themeChecked? require('~/static/images/com_lazy_black.svg') : require('~/static/images/com_lazy_white.svg')" alt="">
      </template>
    </van-image>
    <div class="thumb-text">
      <div class="thumb-left">{{ tag.typeName }}</div>
      <div class="thumb-right">
        <!-- <div class="main-view"></div> -->
        <!-- com_shipinshu_1 -->
        <div :class="themeChecked?'main-video-num': 'main-video-num-white'"></div>
        <div class="thumb-num">{{ tag.quantity }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import commonMinxin from '~/plugins/mixins/common'
export default{
  mixins: [commonMinxin],
  data() {
    return {
    }
  },
  props: {
    tag: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    ...mapActions(['set_typeid']),
    handleClickTag(item){
      gtag('event', 'gt4_click_type', {
        typeId: item.typeId,
        typeName: item.typeName,
      });
      this.set_typeid(item.typeId)
      this.$router.push({
        name: 'categories',
        params:{
          id: item.typeId,
          name: item.typeName,
          refresh: true,
        },
      })
    }
  }
}
</script>
<style lang="less" scoped>
.thumb-list{
  margin-top: 2px;
  position: relative;
  /deep/ .van-image{
      width:185px;
      height:105px;
      .loading-img, .error-img{
        width: 100%;
        height: 100%;
      }
    }
}
.thumb-text{
  position: absolute;
  left: 12px;
  bottom: 4px;
  // width: 185px;
  display: flex;
  flex-direction: column;
  // justify-content: space-between;
  // margin-top: 4px;
  // margin-bottom: 8px;
  // padding: 0 8px;
  .thumb-left{
    font-size: 14px;
    color: var(--text-color1);
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    // max-width: 130px;
  }
  .thumb-right{
    font-size: 12px;
    color: var(--text-color2);
    display: flex;
    align-items: center;
    line-height: 16.8px;
    margin: auto 0;
  }
  .thumb-num{
    margin-top: 2px;
  }
  .main-view{
    width: 12px;
    height: 12px;
  }
}
</style>