<template>
  <div class="porn-shorts" >
    <HeaderTop class="d-none d-sm-block"></HeaderTop>
    <div class="shorts-back d-sm-none" @click="goback"><img src="~/static/images/com_jt_sx_zuo.svg" alt=""></div>
    <div class="shorts-content" @wheel="handleScrollDebounced">
      <van-swipe ref="pornShorts" class="shorts-swipe" vertical :loop="false" :show-indicators="false" @change="changeswipe">
        <van-swipe-item v-for="(item,i) in dataList" :key="item.vodId">
          <videoM3u8 
            :videoSrc="item.vodPlayUrl" 
            :vodPic="item.vodPic" 
            :vodId="item.vodId" 
            :shortsMute="shortsMute" 
            @unmuteVideo="unmuteVideo" 
            v-if="swipeIndex == i">
          </videoM3u8>
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
            <div class="controls-btn controls-share" @click="onShowdialogLink">
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
    <fBottom class="d-none d-sm-block"></fBottom>
  </div>
</template>
<script>
import { debounce  } from 'lodash';
import videoM3u8 from "@/components/videoM3u8"
import commonMinxin from '~/plugins/mixins/common'
export default {
  components:{ videoM3u8 },
  mixins: [commonMinxin],
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
      shortsMute: true
    }
  },

  data(){
    return{
      pageInfo: {
        page: 1,  
        size: 10
      },
      dataList:[],
      swipeIndex: 0,
    }
  },

  methods:{

    unmuteVideo(){
      this.shortsMute = false;
    },

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
    
    changeswipe(i){
      this.swipeIndex = i;
      const item  = this.dataList[i];
      this.shortsMute = false;
      const currentVideo = document.getElementById('hls-video-' + item.vodId);
      console.log( "切换路由：" ,  item.vodId, currentVideo);
      if (currentVideo) {
        currentVideo.muted = false;
      }
      const url = this.localePath({
        name: 'shorts-id',
        params: {
          id: item.vodId
        }
      })
      window.history.pushState({}, "", url)
    },

    goback(){
      this.$router.push( this.localePath("/"))
    },

    // 显示分享链接
    onShowdialogLink(){
        const linkStr = window.location.href;
        this.$copyText(linkStr).then(() => {
            this.$toast.success(this.$t('toast3'));
        })
    },

    // 收藏 取消收藏
    setCollect(){
        if( !this.isLogin ){
            return this.goLogin()
        }
        if( this.onClick ){
            return 
        }
        this.onClick = true;

        if( this.videoStatus.collect ){
            const num = Number(this.videoStatus.collectNumber) - 1;
            this.$set(this.videoStatus, "collectNumber", num)
            this.$set(this.videoStatus, "collect", false)
            this.$videoApi.requestVodcollectcancel({
              vodId: this.vodId,
            }).then(res => {
                if( res.code !== CODES.SUCCESS ){
                    const num = Number(this.videoStatus.collectNumber) + 1;
                    this.$set(this.videoStatus, "collectNumber", num)
                    this.$set(this.videoStatus, "collect", true)
                }
            }).finally( () => {
                this.onClick = false
            })
        }else{
            const num = Number(this.videoStatus.collectNumber) + 1;
            this.$set(this.videoStatus, "collectNumber", num)
            this.$set(this.videoStatus, "collect", true)
            this.$videoApi.requestVodcollect({
              vodId: this.vodId,
            }).then(res => {
                if( res.code !== CODES.SUCCESS ){
                    const num = Number(this.videoStatus.collectNumber) - 1;
                    this.$set(this.videoStatus, "collectNumber", num)
                    this.$set(this.videoStatus, "collect", false)
                }
            }).finally( () => {
                this.onClick = false
            })
        }
    },


    // 点赞 取消点赞 
    setVodUp(){
        const vodId = this.vodId;
        const isUpVod = this.isUpVod(this.videoStatus);
        if( this.onClick ){
            return 
        }
        this.onClick = true;
        if( isUpVod ){
            gtag('event', 'gt4_click_down', {
                down_name: this.videoInfo.vodName,
            });
            this.$set(this.videoStatus, "up", false)
            this.$videoApi.requestVodupcancel({
              vodId: vodId,
            }).then(res => {
                console.log('res',res)
                if( res.code === CODES.SUCCESS ){
                    this.getVodState(vodId)
                    this.getVideo(vodId);
                } else{
                    this.$set(this.videoStatus, "up", true)
                }
            }).finally( () => {
                this.onClick = false
            })

        }else{
            gtag('event', 'gt4_click_up', {
                up_name: this.videoInfo.vodName,
            });
            this.$set(this.videoStatus, "down", false);
            this.$set(this.videoStatus, "up", true);
            this.$videoApi.requestVodup({
              vodId: this.vodId,
            }).then(res => {
                if( res.code === CODES.SUCCESS ){
                    this.getVodState(vodId)
                    this.getVideo(vodId);
                }else{
                    this.$set(this.videoStatus, "up", false);
                }
            }).finally( () => {
                this.onClick = false
            })
        }
    },


    // 点踩 取消点踩
    setVodDown(){
        const vodId = this.vodId;
        const isdownVod = this.isdownVod(this.videoStatus);
        if( this.onClick ){
          return 
        }
        this.onClick = true;
        if( isdownVod ){
            this.$set(this.videoStatus, "down", false)
            this.$videoApi.requestVoddowncancel({
              vodId: vodId,
            }).then(res => {
                if( res.code === CODES.SUCCESS ){

                    this.getVodState(vodId)
                    this.getVideo(vodId);
                } else {
                    this.$set(this.videoStatus, "down", true)
                }
                this.$toast(res.message);
            }).finally( () => {
                this.onClick = false;
            })
        }else{
          this.$set(this.videoStatus, "up", false);
          this.$set(this.videoStatus, "down", true);
          this.$videoApi.requestVoddown({
            vodId: this.vodId,
          }).then(res => {
              if( res.code === CODES.SUCCESS ){
                  this.getVodState(vodId)
                  this.getVideo(vodId);
              } else{
                  this.$set(this.videoStatus, "down", false)
              }
          }).finally( () => {
              this.onClick = false
          })
        }
    },

  },




}
</script>

<style lang="less" scoped>
.porn-shorts{
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
  .shorts-back{
    width: 24px;
    height: 24px;
    position: absolute;
    left: 16px;
    top: 24px;
    z-index: 99;
    cursor: pointer;
    img{
      width: 100%;
      height: 100%;
      display: block;
    }
  }
}
</style>
