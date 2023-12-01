<template>
  <div class="cover">
    <div class="main-list-group">
      <van-image
        lazy-load
        :src="item.vodPic"
      >
        <template slot="loading">
          <img :src="themeChecked? require('~/static/images/com_lazy_black.svg') : require('~/static/images/com_lazy_white.svg')" alt="">
        </template>
        <template slot="error">
          <img :src="themeChecked? require('~/static/images/com_lazy_black.svg') : require('~/static/images/com_lazy_white.svg')" alt="">
        </template>
      </van-image>
      <div class="main-title">{{ item.vodName }}</div>
      <div class="main-btn">
        <div class="main-btn-view">
          <div :class="themeChecked ? 'main-view':'main-view-white'"></div>
          <div class="main-text">{{ $formatNumber(item.vodHits) }}</div>
        </div>
        <div class="mian-btn-like">
          <div :class="themeChecked ? 'main-like':'main-like-white'"></div>
          <div class="main-text">{{ $formatPer(item.vodUp, item.vodUp+item.vodDown)}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props:{ 
    item: {
      type: Object,
      required: true,
    },
  },
  data(){
    return{
      themeChecked: false,
    }
  }
}
</script>
<style lang="less" scoped>
.main-list{
  width: 100%;
  margin: 0 auto;
}
.main-list-group{
  margin-top: 16px;
}
.main-video{
  position: relative;
}
.main-like-radio{
  position:absolute;
  right: 12.5px;
  top: 12.5px;
  height: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 22;
}
.main-img{
  width: 100vw;
  height: 212px;
  &.main-img-opacity{
    display: none;
  }
}
.van-image{
  width: 100vw;
  height: 212px;
}
.main-img img{
  width: 100%;
  height: 100%;
}
.main-time{
  position: absolute;
  right: 8px;
  bottom: 8px;
  padding: 0 8px;
  height: 24px;
  border-radius: 4px;
  background: var(--bg-color4);
  font-size: 14px;
  text-align: center;
  line-height: 24px;
  z-index: 6;
  color: rgba(255, 255, 255, 0.70); //黑白版都是这个颜色
}
.main-title{
  font-size: 14px;
  font-weight: 400;
  color: var(--text-color2);
  margin-top: 8px;
  word-break: break-word;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  margin-bottom: 8px;
  padding: 0 12px;
}
.main-btn{
  display: flex;
  align-items: center;
  color: var(--text-color2);
  height: 17px;
  padding-left: 12px;
}
.main-btn-view,.mian-btn-like{
  display: flex;
  align-items: center;
  margin-right: 24px;
  height: 17px;
}
.main-like{
  width: 16px;
  height: 16px;
  background-image: url('~~/static/images/com_dianzan_1.svg');
  background-repeat: no-repeat;
  background-size: contain;
  margin-right: 4px;
}
.main-like-white{
  width: 16px;
  height: 16px;
  background-image: url('~~/static/images/com_dianzan.svg');
  background-repeat: no-repeat;
  background-size: contain;
  margin-right: 4px;
}
.main-text{
  font-size: 12px;
  display: flex;
  align-items: center;
  margin-top: 3px;
}
.mian-like{
	transform: translateY(0px);
  filter: drop-shadow(#ffffff 0px 0px 0px);
}
</style>