<template>
    <div
        @touchstart="handleTouchStart"
        @touchend="handleTouchEnd" 
        :class="['myVideo', { 'video-not-full': !isfull }]"
        id="HubmyVideo">
        <div id="dplayer" ref="player" class="dplayer video-box"></div>
        <div class="fast-forward-animation" v-show="fastWforward">
           <span></span>
           <span></span>
           <b>{{ seekTime }}</b>
        </div>
        <div class="fast-rewind-animation" v-show="fastRewind">
           <span></span>
           <span></span>
           <b>{{ seekTime }}</b>
        </div>
        <div class="dplayer-top-controller" v-show="controller">
            <div class="controller-tips">Long press the screen to speed up playback</div>
            <div class="controller-btn">
                <div class="speed" @click.stop="speedStatus = !speedStatus">{{nowSpeed}}x</div>
                <div class="full" @click.stop="fullScreenBtn"></div>
                <div class="speed-check" v-show="speedStatus">
                    <span 
                        :class="['item', { 'active': nowSpeed == item }]"
                        @click.stop="changeVideoSpeed(item)"
                        v-for="item in speed" 
                        :key="item">
                        {{ item }}x
                    </span>
                </div>
            </div>
        </div>
        <div class="controller-notice" v-show="showNotice">
            2X
        </div>
        <div class="video-next" v-if="showNext">
            <div class="next-mask">
                <div class="next-refresh" @click.stop="initStart()">
                    <div class="refresh-icon"></div>
                    <div class="refresh-btn">Replay</div>
                </div>
                <nuxt-link class="next-av" v-if="nextAv" :to="localePath({
                    name: 'video-id',
                    params: { id: nextAv.vodId }
                })">
                    <img class="vodPic" :src="nextAv.vodPic" alt="vodPic">
                    <div class="vodName">{{ nextAv.vodName }} </div>
                    <div class="next"></div>
                </nuxt-link>
            </div>
        </div>
    </div>
</template>
<script>

// 节流函数
function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// 视频截取
function vodPlayUrl (url){
    const arr = url.split('$')
    const str = arr.find(  ele => ele.includes('.m3u8'))
    return str || ""
}

export default {
    name: 'videoContainer',
    data () {
        return {
            dp: null,
            fastRewind: false,
            fastWforward: false,
            seekTime: 0,
            clickTime: null,
            clickTgs: null,
            startTime: 0,

            controller:  true,
            speed:[ 0.5, 0.75, 1, 1.25, 1.5, 2 ],
            nowSpeed: 1,
            speedStatus: false,

            showNotice: false,

            showNext: false,

            isfull: false,
        }
    },
    props:{
        videoInfo: {
            type: Object,
            default: () => {}
        },
        vodChange:{
            type: Array,
            default: () => []
        }
    },
    computed:{
        nextAv({ vodChange }){
            let randomIndex = Math.floor(Math.random() * vodChange.length);
            return vodChange[randomIndex]
        },  
    },
    mounted(){
        this.loadVideo();

        var clickNum = 0;
        // 双击删除记录
        document.querySelector('#HubmyVideo').addEventListener('click', evt => {
            clickNum++;
            clearTimeout(this.clickTime)
            this.clickTime = setTimeout(function () {
                clickNum = 0;
            }, 300)
            if (clickNum > 1) {
                clickNum = 0;
                console.log("evt 双击", evt);

                var totalWidth = this.dp.video.offsetWidth;
                var clickX = evt.clientX - this.dp.video.getBoundingClientRect().left;
                
                if (clickX < totalWidth / 2) { // 点击视频左半部分
                    this.seekTime -= 10; 
                    this.fastRewind = true;
                } else { // 点击视频右半部分
                    this.seekTime += 10; 
                    this.fastWforward = true
                }
                this.handleClickDebounce();
            }
        });

        // 点击其他元素，卸载视频
        document.addEventListener(
            "click",
            (e) => {
                this.contains(e)
            },
            true
        );
    },
    methods: {
        loadVideo () {
            const { videoInfo } = this;
            let videoWatchTimeInSeconds = 0;

            this.dp = new DPlayer({
                element: this.$refs.player,
                lang: 'en',
                video: {
                    pic: videoInfo.vodPic, 
                    url: vodPlayUrl(videoInfo.vodPlayUrl),
                    autoplay: true,
                    type: 'customHls',
                    hotkey:true,
                    customType: {
                        customHls: function (video, player) {
                            const hls = new Hls()
                  			hls.loadSource(video.src)
                            hls.attachMedia(video)
                        }
                    }
                },
            });
            
            // 监听 DPlayer 播放事件
            this.dp.on('play', () => {
                console.log("video_watch_start", new Date())
                // 记录视频开始播放的时间
                this.startTime = new Date();
            });

            // 监听 DPlayer 暂停事件
            this.dp.on('pause', () => {
                // 计算播放时长并发送事件追踪代码
                const currentTime = new Date() - this.startTime;
                videoWatchTimeInSeconds += Math.floor(currentTime / 1000); // 转换为秒
                // 发送 Google Analytics 事件
                gtag('event', 'video_watch', {
                    'event_category': 'Video',
                    'event_label': videoInfo.vodName,
                    'value': videoWatchTimeInSeconds
                });
            });

            this.dp.on('thumbnails_hide', (e) => {
                console.log( e )
            }) 


            this.dp.on('ended', (e) => {
                this.showNext = true;
            })

            this.dp.on('fullscreen', (e) => {
                console.log("进入全屏")
                this.isfull = true
            })

            this.dp.on('fullscreen_cancel', (e) => {
               console.log("取消全屏")
               this.isfull = false
            })
      

            // 目标元素
            const targetElement = document.getElementById('dplayer');

            // 定义一个回调函数处理变化
            const callback = (mutationsList, observer) => {
                for (const mutation of mutationsList) {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                        const hasYourClass = targetElement.classList.contains('dplayer-hide-controller');
                        console.log(`元素是否有 dplayer-hide-controller 类：${hasYourClass}`);
                        this.controller = !hasYourClass
                        if( hasYourClass ){
                            this.speedStatus = false
                        }
                    }
                }
            };

            // 创建 MutationObserver 实例并配置
            this.observer = new MutationObserver(callback);
            const observerConfig = { attributes: true, attributeFilter: ['class'] };

            // 启动 MutationObserver
            this.observer.observe(targetElement, observerConfig);

        },

        fullScreenBtn(){
            this.dp.fullScreen.request();
        },

        changeVideoSpeed(item){
            this.speedStatus = false;
            this.nowSpeed = item;
            this.dp.speed(item)
        },

        initStart(){
            this.dp.seek(0)
            this.showNext = false;
            this.dp.play();
        },

        handleTouchStart() {
            this.pressTimer = setTimeout(() => {
                this.dp.speed(2)
                this.nowSpeed = 2
                this.showNotice = true
            }, 500); // Adjust the duration for your needs
        },
        handleTouchEnd() {
            clearTimeout(this.pressTimer);
            this.dp.speed(1);
            this.nowSpeed = 1
            this.showNotice = false
        },

        contains(e){
            let $video = document.querySelector(`.speed-check`);
            if( !$video ){
                return;
            }
            if (!$video.contains(e.target)) {
                this.speedStatus = false;
            }
        },

        handleClickDebounce: debounce(function () {
            this.dp.seek(this.dp.video.currentTime + this.seekTime); // 快进 10 秒
            this.fastRewind = false
            this.fastWforward = false
            this.seekTime = 0;
        }, 800),
    },
    beforeDestroy() {
        // 在组件销毁之前移除 DPlayer 的事件监听器
        if (this.dp) {
            let videoWatchTimeInSeconds = 0;
            // 计算播放时长并发送事件追踪代码
            const currentTime = new Date() - this.startTime;
            videoWatchTimeInSeconds += Math.floor(currentTime / 1000); // 转换为秒

            console.log("video_watch_destroy", videoWatchTimeInSeconds)
            // 发送 Google Analytics 事件
            gtag('event', 'video_watch', {
                'event_category': 'Video',
                'event_label': this.videoInfo.vodName,
                'value': videoWatchTimeInSeconds
            });

            this.dp.destroy();
        }

        if( this.observer ){
            this.observer.disconnect();
        }
         
    },
}
</script>

<style lang="less" scoped>
@keyframes fastForward {
    0%{
        opacity: 0.8;
    }
    100%{
        opacity: 0.5;
    }
}
.dplayer{
    overflow: inherit;
}
.fast-forward-animation {
    position: absolute;
    right: 50px;
    top: 50%;
    transform: translateY(-50%);
    span{
        width: 40px;
        height: 40px;
        display: inline-block;
        animation: fastForward 0.4s ease infinite;
        &:nth-child(1){
            background: url("~~/static/images/bfq_bf_r1.png");
            background-size: 100% 100%;
        }
        &:nth-child(2){
            background: url("~~/static/images/bfq_bf_r2.png");
            background-size: 100% 100%;
        }       
    }
    b{
        position: absolute;
        bottom: -8px;
        font-size: 12px;
        line-height: 12px;
        color: #FFF;
        left: 50%;
        transform: translateX(-50%);
    }
    span:nth-child(2){
        animation-delay: 0.2s;
        margin-left: -25px;
    }
}

@keyframes fastRewind {
    0%{
        opacity: 0.8;
    }
    100%{
        opacity: 0;
    }
}

.fast-rewind-animation {
    position: absolute;
    left: 50px;
    top: 50%;
    transform: translateY(-50%);
    span{
        width: 40px;
        height: 40px;
        display: inline-block;
        animation: fastForward 1s ease infinite;
        &:nth-child(1){
            background: url("~~/static/images/bfq_bf_l2.png");
            background-size: 100% 100%;
        }
        &:nth-child(2){
            background: url("~~/static/images/bfq_bf_l1.png");
            background-size: 100% 100%;
        }
    }
    b{
        position: absolute;
        bottom: -8px;
        font-size: 12px;
        line-height: 12px;
        color: #FFF;
        left: 50%;
        transform: translateX(-50%);
    }
    span:nth-child(2){
        animation-delay: 0.2s;
        margin-left: -25px;
    }
}




.myVideo{
    width: 100%;
    height: 100%;
    position: relative;
}
.video-box {
    width: 100%;
    height: 100%;
}
/deep/ .dplayer-video{
    object-fit: contain;
}
/deep/ .dplayer.dplayer-mobile .dplayer-controller .dplayer-icons .dplayer-full .dplayer-full-in-icon{
    display: none !important;
}
/deep/ .dplayer-controller{
    padding: 0 12px;
    transition: all 0s;

    .dplayer-bar-wrap{
        width: calc(100% - 24px);
        height: 4px !important;
        border-radius: 2px;
        background: rgba(255, 255, 255, 0.40);
        padding: 0;
        .dplayer-bar{
            height: 4px !important;
        }
        .dplayer-loaded{
            height: 4px !important;
        }
        .dplayer-played{
            height: 4px !important;
            border-radius: 2px;
            background:  #F6D658 !important;
        }
    }
}
/deep/ .dplayer-controller .dplayer-icons.dplayer-icons-right{
    right: 12px;
}
/deep/ .dplayer-notice{
    display: none;
}
/deep/ .dplayer-notice-list{
    display: none;
}

.video-not-full{
    /deep/ .dplayer-mobile{
        &.dplayer-hide-controller{
            .dplayer-time{
                display: none !important;
            }
        }
        .dplayer-controller-mask{
            transition: none !important;
            background: url("~~/static/images/video-mask.png");
            background-size: 100% 100%;
        }
        .dplayer-menu{
            display: none !important;
        }
        // .diplayer-loading-icon{
        //     display: none !important;
        // }
        &.dplayer-loading{
            .dplayer-mobile-play{
                opacity: 0 !important;
            }
        }
        .dplayer-mobile-play{
            background: url("~~/static/images/bfq_play.png");
            background-size: 100% 100%;
            svg{
                opacity: 0;
            }
        } 
        &.dplayer-playing{
            .dplayer-mobile-play{
                background: url("~~/static/images/bfq_pause.png");
                background-size: 100% 100%;
                svg{
                    opacity: 0;
                }
            } 
        }
        &.dplayer-paused{
            .dplayer-mobile-play{
                background: url("~~/static/images/bfq_play.png");
                background-size: 100% 100%;
                svg{
                    opacity: 0;
                }
            }
        }
        &.dplayer-hide-controller{
            .dplayer-mobile-play{
                display: none;
            }
        }
        .dplayer-controller{
            padding: 0;
            opacity: 1 !important;
            transform: translateY(0) !important;
            .dplayer-icons-right{
                display: none;
            //    position: absolute;
            //    top: 0;
            //    right: 0;
            }
            .dplayer-icons-left{
                position: absolute;
                left: 50%;
                bottom: 28px;
                transform: translateX(-50%);
                .dplayer-time{
                    color: #FFF;
                    text-align: center;
                    text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.20);
                    font-family: PingFang SC;
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 500;
                    line-height: 16px; /* 114.286% */
                }
            }
            .dplayer-bar-wrap{
                width: 100%;
                border-radius: 0;
                height: 6px !important;
                bottom: 0px;
 
                .dplayer-bar{
                    height: 6px !important;
                    position: relative;
                    &::after{
                        content: "";
                        position: absolute;
                        width: 100%;
                        height: 40px;
                        bottom: -20px;
                        left: 0;
                        opacity: 0;
                    }
                }
                .dplayer-loaded{
                    height: 6px !important;
                }
                .dplayer-played{
                    height: 6px !important;
                    border-radius: 2px;
                }
                .dplayer-thumb{
                    background:  #FFF !important;
                    transform: scale(1) !important;
                    width: 12px;
                    height: 12px;
                    margin-top: -3px;
                }
            }
        }
    }
}


.dplayer-top-controller{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 45px;
    padding: 10px 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .controller-tips{
        flex: 1;
        color: var(--text-color2,  rgba(255, 255, 255, 0.70));
        font-family: PingFang SC;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        opacity: 0;
    }
    .controller-btn{
        margin-left: 4px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        .speed{
            display: inline-flex;
            padding: 3px 3.5px;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            border-radius: 4px;
            border: 1px solid #FFF;
            font-size: 8px;
            background: var(--bg-color3, rgba(255, 255, 255, 0.10));
            font-size: 12px;
            zoom: 0.75;
        }
        .full{
            width: 16px;
            height: 16px;
            flex-shrink: 0;
            margin-left: 12px;
            background-image: url('~~/static/images/bfq_qp.svg');
            background-repeat: no-repeat;
            background-size: 100% 100%;
        }
        .speed-check{
            position: absolute;
            top: 20px; 
            right: 0;
            background-color: var(--bg-color4, rgba(0, 0, 0, 0.6));
            display: flex;
            flex-direction: column;
            width: 48px;
            border-radius: 4px;
            padding: 2px;
            .item{
                width: 100%;
                height: 21px;
                text-align: center;
                font-size: 12px;
                line-height: 21px;             
            }
            .active{
                border-radius: 4px;
                background: var(--text-color4, rgba(255, 255, 255, 0.20));
                color: var(--f-6-d-658, #F6D658);
            }
        }
    }
}


.controller-notice{
    position: absolute;
    // width: 60px;
    height: 20px;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    display: inline-flex;
    padding: 4px 8px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.60);

    color: var(--text-color1, #FFFFFF);
    text-align: center;
    font-family: PingFang SC;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

}

.video-next{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    background-color: #000;
    .next-mask{
        width: 100%;
        height: 100%;
        background-color:  rgba(255, 255, 255, 0.1);
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .next-refresh{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        margin: 0 22px;
        .refresh-icon{
            width: 64px;
            height: 64px;
            background: url("~~/static/images/com_bfq_replay.png");
            background-size: 100% 100%;
        }
        .refresh-btn{
            width: 76px;
            height: 32px;
            margin-top: 24px;
            background-color: var(--bg-primary, #F6D658);
            color: var(--text-color1-new, #181E2A) ;
            text-align: center;
            line-height: 32px;
            border-radius: 32px;
            font-size: 14px;
        }
    }
    .next-av{
        margin: 0 22px;
        width: 180px;
        height: 130px;
        background-color: var(--bg-color2, rgba(255, 255, 255, 0.06));
        border-radius: 8px;
        overflow: hidden;
        position: relative;
        .vodPic{
            display: block;
            width: 180px;
            height: 102px;
        }
        .vodName{
            width: 180px;
            height: 28px;
            padding: 0 8px;
            line-height: 28px;
            color: var(--text-color2,  rgba(255, 255, 255, 0.70));
            font-family: PingFang SC;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            overflow:hidden; //超出的文本隐藏
            text-overflow:ellipsis; //溢出用省略号显示
            white-space:nowrap; //溢出不换行
        }
        .next{
            position: absolute;
            top: 35px;
            left: 50%;
            transform: translateX(-50%);
            width: 32px;
            height: 32px;
            background: url("~~/static/images/bfq_next.png");
            background-size: 100% 100%;
        }
    }
}

</style>

