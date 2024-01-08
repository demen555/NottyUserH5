<template>
    <div class="myVideo" id="HubmyVideo">
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
        }
    },
    props:{
        videoInfo: {
            type: Object,
            default: () => {}
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
    },
    methods: {
        loadVideo () {
            const { videoInfo } = this;
            let videoWatchTimeInSeconds = 0;

            this.dp = new DPlayer({
                element: this.$refs.player,
                lang: 'en',
                // 自定义播放按钮
                icon: {
                    play: require("~/static/images/bfq_bf_r1.png"), 
                    pause: '',
                },
                video: {
                    pic: videoInfo.vodPicThumb, 
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
    .dplayer-bar-wrap{
        width: calc(100% - 24px);
        height: 4px !important;
        border-radius: 2px;
        background: rgba(255, 255, 255, 0.40);
        padding: 0;
        overflow: hidden;
        .dplayer-bar{
            height: 4px !important;
        }
        .dplayer-loaded{
            height: 4px !important;
        }
        .dplayer-played{
            height: 4px !important;
            border-radius: 2px;
            background:  #FFE500 !important;
            .dplayer-thumb{
                background:  #FFE500 !important;
            }
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


/deep/ .dplayer-mobile-play{
    // background: url("~~/static/images/bfq_bf_r1.png");
    // background-size: 100% 100%;
    // svg{
    //     opacity: 0;
    // }
} 
// /deep/ .dplayer-controller .dplayer-bar-wrap .dplayer-bar .dplayer-loaded, .dplayer-controller .dplayer-bar-wrap .dplayer-bar .dplayer-played{
//     height: auto;
// }
</style>

