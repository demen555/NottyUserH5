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
              <span class="words">{{ $t('str_collect') }}</span>
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
          <div class="shorts-review" @wheel.stop @touchstart.stop>
            <div class="review-btn" >
                <span class="num"> {{ $t('str_vodReviewList', { num: vodReviewtotal }) }} </span>
                <!-- <div class="btn words-ellipsis d-sm-none">{{ $t('str_review_btn') }}</div> -->
            </div>
            <van-list
                  v-model="loadingReview"
                  :finished="finishedReview"
                  loading-text="loading"
                  :immediate-check='false'
                  @load="onLoadReview"
                  >
                  <template #finished>
                  <span v-show="!(!vodReviewList.length && !loadingReview)"> {{ $t('str_no_more') }} </span> 
                  </template>
      
                  <Empty v-if="!vodReviewList.length && !loadingReview"></Empty>

                  <template v-else>
                      <div class="review-list" v-for="item in vodReviewList" :key="item.commentId">
                          <div class="list-top">
                              <img class="top-img" src="~/static/images/home_top_mrtx_1.svg" alt="avatar">
                              <div class="top-name">{{ item.commentName || item.userName ||   $t('str_tourist') }}</div>
                              <div class="top-time">{{ $t(dateFormat(item.commentTime)) }}</div> 
                          </div>
                          <div class="list-bottom">
                              {{ item.commentContent }}
                          </div>
                      </div>
                  </template>

            </van-list>
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
import { mapGetters } from "vuex"
import CODES from "~/plugins/enums/codes"
import { dateFormat, formatNumber, formatPer, getQueryString } from '~/utils/format.js';
export default {
  components:{ videoM3u8 },
  mixins: [commonMinxin],
  async asyncData({ $homeApi,  $videoApi, params }) { 
    const res1 = await $homeApi.requestvodpageStoriesHome({
      size: 10,
      excludes: params.id,
    })
    const res2 =  await $videoApi.requestVodComment({ 
      vodId: params.id 
    });
    console.log("当前视频：", res2.data)
    console.log("下一部10个视频：", res1.data.data)
    return { 
      dataList: [ res2.data, ...res1.data.data] || [],
      pageInfo: {
        size: 10
      },
      shortsMute: true,
      curVodId: params.id,

      videoStatus:{},
    }
  },

  data(){
    return{
      pageInfo: {
        size: 10
      },
      dataList:[],
      swipeIndex: 0,

      curVodId: "",

      vodReviewList:[],
      loadingReview: false,
      finishedReview: false,
      vodReviewtotal: 0,
      vodReviewPage:{
          size: 24,
          page: 0
      },

    }
  },

  computed:{
      ...mapGetters([
          "historyVod", 
          "userinfo", 
          "noLoginUpVod", 
          "noLoginDownVod", 
          "isLogin"
      ]),
  },
  
  created(){
    this.onLoadReview();
  },

  methods:{
    dateFormat,
    unmuteVideo(){
      this.shortsMute = false;
    },

    goLogin(){
        this.$router.push(this.localePath('login'))
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
      window.history.pushState({}, "", url);
      this.loadList(i)
    },

    async loadList(i){
      if( i + 1 >= this.dataList.length ){
        this.pageInfo.size = this.pageInfo.size + 10;
        const res1 = await this.$homeApi.requestvodpageStoriesHome({
          size: this.pageInfo.size,
          excludes: this.curVodId,
        });
        const res2 =  await this.$videoApi.requestVodComment({ 
          vodId: this.curVodId
        });

        this.dataList = [ res2.data, ...res1.data.data] || []
      }
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

    // 评论列表
    onLoadReview(){
        this.vodReviewPage.page++;
        this.$videoApi.requestVodReviewe({
          vodId: 63287,
          ...this.vodReviewPage
        }).then(res => {
            if( res.code === CODES.SUCCESS ){
                this.vodReviewtotal = res.data.meta.pagination.total;
                this.vodReviewList = [
                    ...this.vodReviewList,
                    ...res.data.data
                ];
                if( this.vodReviewPage.page >= res.data.meta.pagination.total_pages ){
                    this.finishedReview = true;
                    this.loadingReview = false;
                }else{
                    this.finishedReview = false;
                    this.loadingReview = false;
                }
            } 
        })
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
  .shorts-review{
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 60%;
    background: rgba(24, 24, 28, 1);
    border-radius: 16px 16px 0 0;
    z-index: 999;
    display: flex;
    flex-direction: column;
    .van-list{
      flex: 1;
      overflow: auto;
    }
    .review-btn{   
      padding: 8px 12px;
      display: flex;
      align-items: center;  
      justify-content: space-between;
      .num{
          color: var(--text-color2,  rgba(255, 255, 255, 0.70));
          font-family: PingFang SC;
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
      }
      .btn{
          width: 80px;
          height: 32px;
          text-align: center;
          line-height: 32px;
          background-color: var(--bg-primary, #F6D658);
          color: var(--text-color1, #181E2A);
          font-size: 14px;
          cursor: pointer;
          border-radius: 32px;
          padding: 0 8px;
      }
    }
    .review-list{
      padding: 8px 12px;
      .list-top{
        display: flex;
        align-items: center;  
        justify-content: space-between;
        .top-img{
          width: 32px;
          height: 32px;
        }
        .top-name{
          flex: 1;
          color: var(--text-color2,  rgba(255, 255, 255, 0.70));
          font-size: 14px;
          padding-left: 8px;
        }
        .top-time{
          color: var(--text-color2,  rgba(255, 255, 255, 0.70));
          font-size: 12px;
        }
      }
      .list-bottom{
        color: var(--text-color1, #FFFFFF);
        font-size: 14px;
        padding-left: 40px;
        word-break: break-all;
      }
    }
  }
}
</style>
