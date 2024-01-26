<template>
  <div>
    <HeaderTop @refresh="onRefresh"></HeaderTop>
    <div class="main-video">
        <div class="video-container"> 
            <client-only v-if="videoInfo.vodPlayUrl">
                <videoContainer  :videoInfo="videoInfo" :vodChange="vodChange"></videoContainer>
            </client-only>
            
            <van-loading 
                color="var(--bg-primary, #F6D658)" 
                text-color="var(--bg-primary, #F6D658)" 
                v-else 
                type="spinner" 
                vertical>
                Loading... 
            </van-loading>
        </div>
        <div class="video-space"></div>
        <template v-if="videoInfoLoding">
            
            <h1 class="video-title"> {{ videoInfo.seo.title }} </h1>
            <p class="video-description" v-show="videoInfo.seo.description"> {{ videoInfo.seo.description }} </p>
            <div class="video-data">
                <div class="data-watch">
                    <img class="icon" :src="themeChecked? require('~/static/images/com_bofangliang_big_1.svg'): require('~/static/images/com_bofangliang_big.svg')"  alt="com_dianzan">
                    <span class="words">{{ videoInfo.vodHits }} {{$t('str_video_vodHits')}}</span>
                </div> 
                <div class="data-time">
                    {{ $t(dateFormat(videoInfo.vodTimeAdd)) }}
                </div>
            </div>
            <div class="video-controls">
                <div class="controls" @click="setVodUp()">
                    <img class="icon"  v-if="isUpVod(videoStatus)" src="~/static/images/com_dianzan_on.svg" alt="com_dianzan_on">
                    <img class="icon"  v-else :src="themeChecked? require('~/static/images/com_dianzan_1.svg'): require('~/static/images/com_dianzan.svg')"  alt="com_dianzan">
                    <span class="words">{{ vodPercent.vodUp }}%</span>
                </div>
                <div class="controls" @click="setVodDown()">
                    <img class="icon" v-if="isdownVod(videoStatus)" src="~/static/images/com_caizan_on.svg" alt="com_caizan_on">
                    <img class="icon" v-else :src="themeChecked? require('~/static/images/com_caizan_1.svg'): require('~/static/images/com_caizan.svg')"  alt="com_dianzan">
                    <span class="words">{{ vodPercent.vodDown }}%</span>
                </div>
                <div class="controls" @click="setCollect()">
                    <img class="icon" v-if="!videoStatus.collect" :src="themeChecked? require('~/static/images/com_shoucang_1.svg'): require('~/static/images/com_shoucang.svg')"  alt="com_dianzan">
                    <img class="icon" v-else src="~/static/images/com_shoucang_on.svg" alt="com_shoucang_on">
                    <span class="words">{{ videoStatus.collectNumber || 0 }}</span>
                </div>
                <div class="controls" @click="onShowdialogLink()">
                    <img class="icon" :src="themeChecked? require('~/static/images/com_fenxiang_1.svg'): require('~/static/images/com_fenxiang.svg')"  alt="com_fenxiang_1">
                    <span class="words">{{ $t('str_share') }}</span>
                </div>
            </div>
            <!-- <div class="video-title" v-if="videoInfo.tags">
                <h1 class="title" @click="handleClickType(row)" v-for="row in videoInfo.tags" :key="row.id">{{ row.name }}</h1>
            </div> -->
            <div class="video-tags" v-if="videoInfo.tags && videoInfo.tags.length">
                <div 
                    class="tag" 
                    @click="handleClickType(row)" 
                    v-for="row in videoInfo.tags" 
                    :key="row.id">
                    {{ row.name }}
                </div>
                <!-- <h1 class="title" @click="changeVoteShow">
                    <img class="icon" v-if="showVote" src="~/static/images/com_bq_shouqi_1.svg" />
                    <img class="icon" v-else src="~/static/images/com_bq_zhankai_1.svg" />
                </h1> -->
            </div>
            <!-- <div class="video-title" v-else>
              <h1 class="title" @click="changeVoteShow">
                    <img class="icon" v-if="showVote" src="~/static/images/com_bq_shouqi_1.svg" />
                    <img class="icon" v-else src="~/static/images/com_bq_zhankai_1.svg" />
                </h1>
            </div> -->
            <!-- <vote v-if="showVote" :tagsList="videoInfo.tags" :themeChecked="themeChecked" @refresh="handleRefesh"></vote> -->
            <div class="video-line"></div>
            <van-tabs v-model="activeNav" class="video-more" v-if="videoInfo.vodId">
                <van-tab name="about" :title="$t('str_video_about')">
                    <van-list
                        v-if="videoInfo.vodId"
                        v-model="loadingChange"
                        :finished="finishedChange"
                        :finished-text="$t('str_no_more')"
                        loading-text="loading"
                        @load="onLoadAboutVod"
                        >
                        <cover v-for="item in vodChange" :item="item" :key="item.vodId"></cover>
                    </van-list>
                    <Empty v-else></Empty>
                </van-tab>
                <van-tab name="review" :title="$t('str_review')">
                    <div class="review-btn" @click="showVodReview">
                        <span class="num"> {{ $t('str_vodReviewList', { num: vodReviewtotal }) }} </span>
                        <div class="btn words-ellipsis">{{ $t('str_review_btn') }}</div>
                    </div>
                    <div class="review-input" v-show="showInput">
                        <input
                            enterkeyhint="send"
                            @blur="blurFuc"
                            ref="inputVal"
                            v-model="content"
                            @keyup.enter="sendVodReview" 
                            class="input" 
                            type="text">
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
                </van-tab>
            </van-tabs>
        </template>

        <template v-else>
            <videoLoad />
            <cardLoad />
        </template>


        <dialogLogin ref="dialogLoginRef" @goRegister="goRegister"></dialogLogin>
        <dialogRegister ref="dialogRegisterRef" @goLogin="goLogin"></dialogRegister>
    </div>
  </div>
</template>
<script>
import videoContainer from "./video.vue";
import cover from "~/components/cover";
import { mapGetters } from "vuex";
import commonMinxin from '~/plugins/mixins/common'
import { dateFormat, getQueryString } from '~/utils/format.js';
import Empty from '~/components/empty'
import cardLoad from "~/components/skeleton/cardLoad.vue"
import videoLoad from "~/components/skeleton/videoLoad.vue"
import vote from "~/components/vote/index.vue"
import CODES from "~/plugins/enums/codes"

export default {

    mixins: [commonMinxin],
    data(){
        return {
            activeNav: 'about',
            videoInfo: {
                tags: [],
            },

            videoStatus:{},
            
            videoInfoLoding: true,

            content: "",
            showInput: false,
            linkStr: "",

            vodReviewList:[],
            loadingReview: false,
            finishedReview: false,
            vodReviewtotal: 0,
            vodReviewPage:{
                size: 20,
                page: 0
            },


            vodChange: [],
            loadingChange: false,
            finishedChange: false,
            vodChangePage:{
                size: 50,
                page: 1
            },
            showVote: false
        }
    },
    head(){
        const hostName = process.server ? this.$nuxt.context.req.headers.host.replace(/:\d+$/, '') : window.location.host;
        return {
            title: this.videoInfo.seo && this.videoInfo.seo.title,
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: this.videoInfo.seo.description
                },
                {
                    hid: 'keyswords',
                    name: 'keyswords',
                    content: this.videoInfo.seo.keywords
                },
                {
                    hid: 'title',
                    name: 'title',
                    content: this.videoInfo.seo.title
                },
                { hid: 'og:title', property: 'og:title', content: this.videoInfo.seo.title },
                { hid: 'og:description', property: 'og:description', content:  this.videoInfo.seo.description},
                { hid: 'og:keywords', property: 'og:keywords', content: this.videoInfo.seo.keywords },
            ],
            link: [
                {
                    rel: 'canonical',
                    href: `${hostName}${this.$nuxt.context.route.fullPath}`,
                },
            ],
        }
    },
    async asyncData({ $videoApi, params }) {
        const res1 =  await $videoApi.requestVodComment({ vodId: params.id });
        const seo = res1.data.seo ? res1.data.seo : {
                        description: "",
                        keywords: "",
                        title: "",
                    }            
        return { 
            videoInfo: {
                ...res1.data,
                seo: seo,
                code: res1.code
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

        // 未登录点赞过得视频
        upvodIds({ noLoginUpVod }){
            let arr = [];
            noLoginUpVod.forEach( ele => {
                arr.push(ele.vodId)
            });
            return arr;
        },

        // 未登录点踩过得视频
        downvodIds({ noLoginDownVod }){
            let arr = [];
            noLoginDownVod.forEach( ele => {
                arr.push(ele.vodId)
            });
            return arr;
        },

        // 点赞 踩赞 百分比
        vodPercent(){
            const { vodUp, vodDown } = this.videoInfo
            const all = Number(vodUp) + Number(vodDown);

            return {
                vodUp: parseInt(((Number(vodUp)/all)*100) || 0),
                vodDown: parseInt(((Number(vodDown)/all)*100) || 0),
            }
        },
    },

    components:{
        videoContainer,
        cover,
        Empty,
        cardLoad,
        videoLoad,
        vote,
        dialogLogin: () => import('~/components/dialog/dialog-login.vue'),
        dialogRegister: () => import('~/components/dialog/dialog-register.vue'),
    },

    created(){
        // 在页面创建时检查是否有跳转信息
        console.log( this.videoInfo.code,  this.$i18n.locale, "this.videoInfo.code" )
        if (this.videoInfo.code != 100 ) {
            // 跳转路由
            this.$router.push(this.localePath('/'+  this.$i18n.locale ))
        }
        this.initVideo();
         
    },

    mounted(){
      this.addHisVod(this.videoInfo);
    },
    methods:{
        dateFormat,
        handleRefesh(){
          console.log('handleRefresh')
          this.initVideo()
        },
        changeVoteShow(){
            if( !this.isLogin ){
                return this.goLogin()
            }
            this.showVote = !this.showVote
        },
        
        initVideo(){
            const vodId = this.$route.params.id;
            // this.getVideo(vodId);
            this.getVodState(vodId)
        },

        // 显示分享链接
        onShowdialogLink(){
            gtag('event', 'gt4_page_share', {
                share_name: this.videoInfo.vodName,
            });
            const linkStr = window.location.href + '?back=home';
            this.$copyText(linkStr).then(() => {
                this.$toast.success(this.$t('toast3'));
            })
        },

        // 登录用户对当前视频的状态(赞、踩、收藏)
        // 原 vodUp 点赞次数 ； vodDown 踩次数 ； up  down  赞 踩； collectNumber 收藏次数；  collect 是否收藏；
        // 新 totalLike": 总赞数, "totalDisLike": 总踩数, "isLike": 是否赞, "isDisLike": 是否踩, "totalCollect": 总收藏数； "isCollect": 收否收藏,
        getVodState(vodId){
            this.$videoApi.requestVodState({
              vodId: vodId,
            }).then(res => {
                if( res.code === CODES.SUCCESS ){
                    const { totalLike, totalDisLike, isLike, isDisLike, totalCollect, isCollect } = res.data;
                    this.videoStatus = {
                        vodUp: totalLike,
                        vodDown: totalDisLike,
                        up: isLike,
                        down: isDisLike,
                        collect: isCollect,
                        collectNumber: totalCollect,
                        vodId: vodId
                    }
                }
            }).finally( () => {
                
            })
        },

        // 视频详情;
        getVideo(vodId){
            if(process.client){
                gtag('event', 'gt4_look_video', {
                    video_name: this.videoInfo.vodName
                });
            }

            this.$videoApi.requestVodComment({
              vodId: vodId,
            }).then(res => {
                if( res.code === CODES.SUCCESS ){
                    res.data['tags'] = res.data.tags || [];
                    res.data.tags = res.data.tags.filter( ele => ele );
                    this.videoInfo = res.data;
                }
            }).finally( () => {
                this.videoInfoLoding = true
            })
        },

        // 相关视频
        onLoadAboutVod(){
          console.log('this.videoInfo',this.videoInfo)
            this.vodChangePage.page++;
          console.log("加载相关视频列表", {
            typeId: this.videoInfo.typeId,
            excludes: this.videoInfo.vodId,
            ...this.vodChangePage
          });
            this.$videoApi.requestVodChange({
              typeId: this.videoInfo.typeId,
              excludes: this.videoInfo.vodId,
              ...this.vodChangePage
            }).then(res => {
                if( res.code === CODES.SUCCESS ){
                    this.vodChange = [
                        ...this.vodChange,
                        ...res.data.data
                    ];
                    if( this.vodChangePage.page >= res.data.meta.pagination.total_pages ){
                        this.finishedChange = true;
                        this.loadingChange = false;
                    }else{
                        this.finishedChange = false;
                        this.loadingChange = false;
                    }
                }
            })
            
        },
        
        // 评论列表
        onLoadReview(){
            this.vodReviewPage.page++;
            console.log("加载评论列表", {
                vodId: this.$route.params.id,
                ...this.vodReviewPage
            })
            this.$videoApi.requestVodReviewe({
              vodId: this.$route.params.id,
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

        // 点赞 取消点赞 
        setVodUp(){
            // if( !this.isLogin ){
            //     return this.goLogin()
            // }
            const vodId = this.$route.params.id;
            const isUpVod = this.isUpVod(this.videoStatus);
            if( this.onClick ){
                return 
            }
            this.onClick = true;
            if( isUpVod ){
                gtag('event', 'gt4_click_down', {
                    down_name: this.videoInfo.vodName,
                });
                // if( this.isLogin ){
                    this.$set(this.videoStatus, "up", false)
                    this.$videoApi.requestVodupcancel({
                      vodId: vodId,
                    }).then(res => {
                        console.log('res',res)
                        if( res.code === CODES.SUCCESS ){
                            // const num = Number(this.videoStatus.vodUp) - 1;
                            // this.$set(this.videoStatus, "vodUp", num)
                            this.getVodState(vodId)
                            this.getVideo(vodId);
                        } else{
                            this.$set(this.videoStatus, "up", true)
                        }
                    }).finally( () => {
                        this.onClick = false
                    })
                // }else{
                //     this.$store.commit("DEL_UPVOD", vodId)
                //     this.onClick = false
                // }
            }else{
                gtag('event', 'gt4_click_up', {
                    up_name: this.videoInfo.vodName,
                });
                // if( this.isLogin ){
                    this.$set(this.videoStatus, "down", false);
                    this.$set(this.videoStatus, "up", true);
                // }else{
                //     this.$store.commit("DEL_DOWNVOD", vodId)
                //     this.$store.commit("UPDATE_UPVOD", this.videoInfo )
                // }
                this.$videoApi.requestVodup({
                  vodId: this.$route.params.id,
                }).then(res => {
                    if( res.code === CODES.SUCCESS ){
                        // const num = Number(this.videoStatus.vodUp) + 1;
                        // this.$set(this.videoStatus, "vodUp", num);
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
                  vodId: this.$route.params.id,
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
                gtag('event', 'gt4_click_collect', {
                    collect_name: this.videoInfo.vodName,
                });
                const num = Number(this.videoStatus.collectNumber) + 1;
                this.$set(this.videoStatus, "collectNumber", num)
                this.$set(this.videoStatus, "collect", true)
                this.$videoApi.requestVodcollect({
                  vodId: this.$route.params.id,
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

        // 点踩
        setVodDown(){
            // if( !this.isLogin ){
            //     return this.goLogin()
            // }
            const vodId = this.$route.params.id;
            const isdownVod = this.isdownVod(this.videoStatus);
            if( this.onClick ){
                return 
            }
            this.onClick = true;
            console.log( isdownVod , this.isLogin )
            if( isdownVod ){
                // if( this.isLogin ){
                    this.$set(this.videoStatus, "down", false)
                    this.$videoApi.requestVoddowncancel({
                      vodId: vodId,
                    }).then(res => {
                        if( res.code === CODES.SUCCESS ){
                            // const num = Number(this.videoStatus.vodDown) - 1;
                            // this.$set(this.videoStatus, "vodDown", num)
                            this.getVodState(vodId)
                            this.getVideo(vodId);
                        } else {
                            this.$set(this.videoStatus, "down", true)
                        }
                        this.$toast(res.message);
                    }).finally( () => {
                        this.onClick = false;
                    })
                // }else{
                //     this.$store.commit("DEL_DOWNVOD", vodId)
                //     this.onClick = false
                // }
            }else{
                
                // if( this.isLogin ){
                    this.$set(this.videoStatus, "up", false);
                    this.$set(this.videoStatus, "down", true);
                    this.$videoApi.requestVoddown({
                      vodId: this.$route.params.id,
                    }).then(res => {
                        if( res.code === CODES.SUCCESS ){
                            // const num = Number(this.videoStatus.vodDown) + 1;
                            // this.$set(this.videoStatus, "vodDown", num)
                            this.getVodState(vodId)
                            this.getVideo(vodId);
                        } else{
                            this.$set(this.videoStatus, "down", false)
                        }
                    }).finally( () => {
                        this.onClick = false
                    })

                // }else{
                //     this.$store.commit("DEL_UPVOD", vodId)
                //     this.$store.commit("UPDATE_DOWNVOD", this.videoInfo )
                //     this.onClick = false
                // }

            }
        },

        getShareLink(){
            this.$videoApi.requestSharelink({
              vodId: this.$route.params.id,
            }).then(res => {
                if( res.code === CODES.SUCCESS ){
                    console.log(res)
                } 
                
            }).finally( () => {
                
            })
        },

        // 评论
        sendVodReview(){
            gtag('event', 'gt4_video_review', {
                review_name: this.videoInfo.vodName,
            });
            if( this.onClick || !this.content){
                return 
            }
            this.onClick = true;
            // 需要审核，不能直接显示
            this.showInput = false;
            this.$videoApi.requestVodReviewInput({
              vodId: this.$route.params.id,
              content: this.content
            }).then(res => {
                if( res.code === CODES.SUCCESS ){
                    this.$toast(this.$t('str_show_when_allow'))
                }

            }).finally( () => {
                this.onClick = false;
                this.showInput = false;
            })
        },

        showVodReview(){
            if( !this.isLogin ){
                return this.goLogin()
            }
            this.showInput = true;
            this.$nextTick( () => {
                let inputVal = this.$refs.inputVal;
                inputVal.focus();
                setTimeout(() => {
                    inputVal.scrollIntoView() 
                }, 400);
            });
        },

        blurFuc(){
            this.showInput = false;
            this.content = ""
        },

        // 添加历史记录 在vuex里面去重，同样的视频点击也需要排序
        addHisVod(item){
            // console.log("添加历史")
            // const idAdd = this.historyVod.some(  ele => ele.vodId === item.vodId);
            // if( !idAdd ){
                this.$store.commit("UPDATE_HISTORYVOD", item)
            // }
        },

        // 判断是否点赞
        isUpVod(videoInfo){
            // if( this.isLogin ){
            //     return videoInfo.up
            // }else{
            //     return this.upvodIds.includes(Number(videoInfo.vodId))
            // }
            return videoInfo.up
        },

        // 判断是否点踩
        isdownVod(videoInfo){
            // if( this.isLogin ){
            //     return videoInfo.down
            // }else{
            //     return this.downvodIds.includes(Number(videoInfo.vodId))
            // }
            return videoInfo.down
        },

        // 标签调转
        handleClickType(item){
            this.$router.push(this.localePath({
                name: 'tag-name',
                params:{
                    id: item.id,
                    name: item.name,
                    refresh: true,
                },
            }));
        },
        onRefresh(){
          console.log('onRefresh')
        },
        goRegister(){
            this.$refs.dialogRegisterRef.onShow()
        },

        goLogin(){
            this.$refs.dialogLoginRef.onShow()
        },

    },
    destroyed(){
        gtag('event', 'exit_video', {
            share_name: this.videoInfo.vodName,
        });
    }
}
</script>
<style lang="less" scoped>
.flex-align-center{
    display: flex;
    align-items: center;
}

.padding-8-12{
    padding: 8px 12px;
}

.main-video{
    /deep/ .main-list-no{
        margin-top: 20px;
    }
    /deep/ .van-tabs__nav{
        background-color: var(--bg-color1, #0E0E0F);
        .van-tab{
            padding: 0 12px;
            flex: inherit;
            color: var(--text-color2,  rgba(255, 255, 255, 0.70));
            font-size: 14px;
        }
        .van-tab--active{
            color: var(--text-color1, #FFFFFF);
            font-size: 18px;
        }
        .van-tabs__line{
            transform: translateX(40px);
            background-color: #F6D658;
            width: 20px;
            height: 2px;
            bottom: 20px;
        }
    }
    /deep/ .van-nav-bar{
        background-color: transparent;
    }


}
.video-container{
    width: 375px;
    height: 212px;
    position: fixed;
    top: 44px;
    left: 0;
    z-index: 889;
    .flex-align-center;
    justify-content: center;
    .left-arrow{
        position: fixed;
        left: 16px;
        top: 60px;
        z-index: 99;
    }
}
.video-space{
    width: 375px;
    height: 264px;
}
.video-description{
    padding-bottom: 8px;
    padding-left: 12px;
    padding-right: 12px;
    color: var(--text-color1, #FFFFFF);
    font-family: PingFang SC;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
}
.video-title{
    padding-bottom: 8px;
    padding-left: 12px;
    padding-right: 12px;
    color: var(--text-color1, #FFFFFF);
    font-family: PingFang SC;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
}
.video-data{
    .flex-align-center;
    .padding-8-12;
    .data-watch{
        .flex-align-center;
    }
    .icon{
        width: 16px;
        height: 16px;
        // background: var(--icon-bofangliang);
        background-size: cover;
    }
    .words{
        color: var(--text-color2,  rgba(255, 255, 255, 0.70));
        font-size: 12px;
        margin-left: 4px;
    }
    .data-time{
        margin-left: 12px;
        color: var(--text-color2,  rgba(255, 255, 255, 0.70));
        font-size: 12px;
    }
}
.video-controls{
    .flex-align-center;
    padding: 4px 24px 12px;
    justify-content: space-between;
    .controls{
        .flex-align-center;
        flex-direction: column;
        justify-content: center;
        .words{
            margin-top: 4px;
        }
        &:nth-child(1){
            .icon{
                background: url("~~/static/images/com_dianzan_1.svg");
                background-size: cover;
            }
            .icon-on{
                background: url("~~/static/images/com_dianzan_on.svg");
                background-size: cover;
            }
        }
        &:nth-child(2){
            .icon{
                background: url("~~/static/images/com_caizan_1.svg");
                background-size: cover;
            }
            .icon-on{
                background: url("~~/static/images/com_caizan_on.svg");
                background-size: cover;
            }
        }
        &:nth-child(3){
            .icon{
                background: url("~~/static/images/com_shoucang_1.svg");
                background-size: cover;
            }
            .icon-on{
                background: url("~~/static/images/com_shoucang_on.svg");
                background-size: cover;
            }
        }
        &:nth-child(4){
            .icon{
                background: url("~~/static/images/com_fenxiang.svg");
                background-size: cover;
            }
        }
    }
    .icon{
        width: 20px;
        height: 20px;
        
    }
    .words{
        color: var(--text-color2,  rgba(255, 255, 255, 0.70));
        font-size: 12px;
        // transform: scale(0.83); // 10px
    }
}
.video-tags{
    display: flex;
    flex-wrap: wrap;
    .padding-8-12;
    .tag{
        color: var(--text-color2,  rgba(255, 255, 255, 0.70));
        text-align: center;
        font-family: PingFang SC;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        display: inline-flex;
        padding: 3.5px 8px;
        justify-content: center;
        align-items: center;
        gap: 10px;
        border-radius: 4px;
        background: var(--bg-color3, rgba(255, 255, 255, 0.10));
        margin: 0 4px 4px 0;
    }
}
.video-line{
    display: flex;
    width: 100%;
    height: 1px;
    padding-top: 1px;
    background-color: var(--border-line, rgba(245, 245, 247, 0.06));
}
.review-list{
    .padding-8-12;
    .list-top{
        .flex-align-center;
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
    }
}
.review-btn{
    .flex-align-center;
    .padding-8-12;
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
.review-input{
    width: 100%;
    padding: 8px 12px;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 998;
    background-color: var(--bg-color1, #0E0E0F);
    height: 56px;
    .input{
        width: 100%;
        height: 40px;
        flex-shrink: 0;
        border-radius: 8px;
        border: 1px solid var(--border-line, rgba(245, 245, 247, 0.06));
        background: var(--bg-color2, rgba(255, 255, 255, 0.06));
        padding: 0 12px;
    }
}

</style>