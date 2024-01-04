<template>
  <div class="thumb-list" @click="handleClickTag(tag)">
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
    <div class="thumb-text">
      <div class="thumb-left">{{ tag.title }}</div>
      <div class="thumb-right">
        <!-- <div class="main-view"></div> -->
        <!-- com_shipinshu_1 -->
        <div :class="themeChecked?'main-video-num': 'main-video-num-white'"></div>
        <div class="thumb-num">{{ tag.vodCount || 0 }}</div>
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
    ...mapActions(['set_detail', 'set_tagid']),
    handleClickTag(item){
      this.set_tagid(item.id)
      this.$router.push(this.localePath({
        name: 'type-id-name',
        params:{
          id: item.id,
          name: item.name,
          refresh: true,
        }
      }))
    }
  }
}
</script>
<style lang="less" scoped>
.thumb-list{
  margin-top: 8px;
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
  width: 185px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 4px;
  margin-bottom: 8px;
  padding: 0 8px;
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