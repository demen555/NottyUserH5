<template>
  <div class="porn-shorts" @wheel="handleScrollDebounced">
    <van-swipe ref="pornShorts" vertical :loop="false" :show-indicators="false">
      <van-swipe-item v-for="item in dataList" :key="item.vodId">
        <!-- <videoM3u8 :videoSrc="item.vodPlayUrl" :vodPic="item.vodPic"></videoM3u8> -->
        <div class="shorts-controls">
          <!-- 点赞 -->
          <div class="controls-btn controls-up"> 
            <div class="controls-img">
              <img class="img" src="~/static/images/my_gn_dz_1.png" alt="my_gn_dz_1">
            </div>
            <span class="words">{{ item.vodUp }}</span>
          </div>
          <!-- 点踩 -->
          <div class="controls-btn controls-down">
            <div class="controls-img">
              <img class="img" src="~/static/images/my_gn_caizan_1.png" alt="my_gn_caizan_1">
            </div>
            <span class="words">{{ item.vodDown }}</span>
          </div>
          <!-- 评论 -->
          <div class="controls-btn controls-review">
            <div class="controls-img">
              <img class="img" src="~/static/images/my_gn_comments_1.png" alt="my_gn_comments_1">
            </div>
            <span class="words">{{ item.vodHits }}</span>
          </div>
          <!-- 收藏 -->
          <div class="controls-btn controls-collect">
            <div class="controls-img">
              <img class="img" src="~/static/images/my_gn_wdsc_1.png" alt="my_gn_wdsc_1">
            </div>
            <span class="words">Collect</span>
          </div>
          <!-- 分享 -->
          <div class="controls-btn controls-share">
            <div class="controls-img">
              <img class="img" src="~/static/images/my_gn_share_1.png" alt="my_gn_share_1">
            </div>
            <span class="words">Share</span>
          </div>
        </div>
        <div class="shorts-des">
          <div class="des-upid">
            <img class="img" :src="item.user.userPortrait" alt="userPortrait">
            <span class="name">{{ item.user.userName }}</span>
          </div>
          <h2> {{ item.vodName }} </h2>
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<script>
import { debounce  } from 'lodash';
import videoM3u8 from "@/components/videoM3u8"
export default {
  components:{ videoM3u8 },
  async asyncData({ $homeApi, params }) { 
    console.log( params.id )
    const res1 = await $homeApi.requestvodpageHome({
      page: 1,  
      size: 10
    })
    return { 
      dataList: res1.data.data || [],
      pageInfo: {
        page: 1,  
        size: 10
      },
    }
  },

  data(){
    return{
      pageInfo: {
        page: 1,  
        size: 10
      },
      dataList:[]
    }
  },

  methods:{
    handleScrollDebounced: debounce(function(event){
      const swipeInstance = this.$refs.pornShorts;
      const delta = Math.sign(event.deltaY);
      console.log("触发滚轮事件")
      if (delta > 0) {
        swipeInstance.prev();
      } else {
        swipeInstance.next();
      }
    }, 300),
  },
}
</script>

<style lang="less" scoped>
.porn-shorts{
  // background: pink;
  .van-swipe{
    height: 100vh;
  }
  .shorts-controls{
    position: absolute;
    right: 12px;
    bottom: 130px;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 111;
    .controls-btn{
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 12px;
      cursor: pointer;
      .controls-img{
        width: 40px;
        height: 40px;
        border-radius: 40px;
        background: rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        .img{
          width: 24px;
          height: 24px;
        }
      }
      .words{
        font-size: 12px;
        color: #fff;
        margin-top: 2px;
      }
    }
  }
  .shorts-des{
    width: 100%;
    height: 88px;
    padding: 0 12px;
    position: absolute;
    bottom: 0;
    h2{
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
      color: #fff;
      margin-top: 8px;
    }
    .des-upid{
      display: flex;
      align-items: center;
      .img{
        width: 24px;
        height: 24px;
        border-radius: 24px;
      }
      .name{
        margin-left: 12px;
        font-size: 16px;
        color: #fff;
        font-weight: 500;
      }
    }
  }
}
</style>
