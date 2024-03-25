<template>
    <div :class="['video-m3u8', { 'video-m3u8-img': isCompleted }]" >
        <van-progress class="video-progress" v-show="!isCompleted" :percentage="progress" />
        <!-- <img class="img" v-if="vodPic" :src="vodPic" alt="part1">
        <img class="img" v-else src="~/static/images/cover1.svg" alt="part1">  -->
        <video :id="`hls-video-${vodId}`" x5-video-player-type='h5' playsinline :muted="shortsMute" class="video-js vjs-default-skin" autoplay>
            <source :src="vodPlayUrl()" type="application/x-mpegURL">
        </video>
        <div class="replay" v-show="showReplayplayer" @click="checkPlayStatus"></div>
        <div class="shorts_mute" v-show="shortsMute"  @click.stop="unmuteVideo">
            <img src="~/static/images/shorts_mute.svg" alt="shorts_mute">
            <span> TAP TO UNMUTE </span>
        </div>
    </div>
</template>
<script>
import { isPc } from '@/utils/format.js'
export default {
    name: 'videoM3u8',
    props: {
        videoSrc: {
            type: String,
            default() {
                return ""
            }
        },
        vodPic: {
            type: String,
            default() {
                return ""
            }
        },
        vodId: {
            type: Number,
            default() {
                return 0
            }
        },
        shortsMute: {
            type: Boolean,
            default() {
                return true
            }
        },
    },
    data() {
        return {
            player: null,
            progress: 0, // 初始值代表再加载
            isCompleted: false,
            isOpen: false,
            showReplayplayer: false,

            paused: false,
        }
    },

    mounted() {
        this.animateProgress(99, 2000)
        this.player = videojs(`hls-video-${this.vodId}`, {
            loop: true,
            controls: false,
            preload: 'auto',
            autoplay: true,
        });

        // 视频禁用鼠标右键
        this.player && this.player.on('contextmenu', (e) => {
            e.preventDefault();
        });

        // 加载完成等待
        this.player && this.player.on('click', (e) => {
            e.preventDefault();
            console.log("click点击")
            this.checkPlayStatus()
        });

        this.player && this.player.on('touchstart', (e) => {
            console.log("touchstart点击")
            this.checkPlayStatus()
        });

        // 开始播放
        this.player && this.player.on('canplaythrough', (e) => {
            console.log("开始播放");
            this.isOpen = true;
            this.isCompleted = true;
        });



        // 加载异常
        this.player && this.player.on('loadedmetadata', (e) => {
            this.paused =  this.player.paused();
            console.log('是否暂停:', this.player.paused());
        });

        // 网络异常
        this.player && this.player.on('stalled', (e) => {
            console.log('网络异常')
            // 如果是开始播放之后捕获异常直接跳出播放器
            if( !this.isOpen ){
                // this.$store.commit("SET_VODID", "")
                this.player.load(); // 捕获异常重新载入
            }
            
        });
        
        // 页面禁用右键
        document.oncontextmenu = new Function("event.returnValue=false");
        // 页面禁用选择
        document.onselectstart = new Function("event.returnValue=false");
        
        // 点击其他元素，卸载视频
        document.addEventListener(
            "click",
            (e) => {
                this.contains(e)
            },
            true
        );
    },
    methods:{
        isPc,
        vodPlayUrl (){
            const arr = this.videoSrc.split('$')
            const str = arr.find(  ele => ele.includes('.m3u8'))
            return str
            // return (str || "") + '?segments=8&time=2';
        },
        contains(e){
            let $video = document.querySelector(`#hls-video-${this.vodId}`);
            if( !$video ){
                return;
            }
            if (!$video.contains(e.target)) {
                this.$store.commit("SET_VODID", "")
            }
        },

        animateProgress(target, duration) {
            return new Promise((resolve, reject) => {
                let start = this.progress;
                const end = target;

                const doAnimation = () => {
                    const elapsed = Date.now() - startTime;
                    const progress = Math.min(elapsed / duration, 1);

                    this.progress = start + ((end - start) * progress);
                    // else if (this.isCompleted) {
                    //     resolve();
                    // }
                    if (progress === 1) {
                        resolve();
                    }  else {
                        requestAnimationFrame(doAnimation);
                    }
                };

                const startTime = Date.now();
                requestAnimationFrame(doAnimation);
            });
        },

        // 播放视频
        playVideo() {
            this.player && this.player.play();
        },

        // 暂停视频
        pauseVideo() {
            this.player && this.player.pause();
        },

        // 开启声音
        unmuteVideo() {
            console.log("开启声音")
            this.$emit('unmuteVideo', !this.shortsMute)
            this.player && this.player.muted(false);
        },

        // 关闭声音
        mutedVideo(){
            this.player && this.player.muted(true);
        },

        // 获取播放状态
        checkPlayStatus() {
            var isPaused = this.paused;
            console.log( this.player, this.player.paused() )
            if (isPaused) {
                this.playVideo();
                this.showReplayplayer = false;
                this.paused = !isPaused
            } else {
                this.pauseVideo();
                this.showReplayplayer = true;
                this.paused = !isPaused
            }
        }

    },
    beforeDestroy() {
      if (this.player) {
        this.player.dispose()
      }
      document.removeEventListener("click", this.contains)
    }
}
</script>
<style lang="less" scoped>
.video-m3u8{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
    .replay{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 64px;
        height: 64px;
        background: url("~~/static/images/bfq_play.png");
        background-size: 100% 100%;
        z-index: 99;
    }
    .shorts_mute{
        position: absolute;
        top: 80px;
        left: 16px;
        display: flex;
        align-items: center;
        z-index: 101;
        img{
            width: 24px;
            height: 24px;
        }
        span{
            font-size: 14px;
            font-weight: 500;
            margin-left: 12px;
        }
    }
    .img{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        z-index: 2;
    }
    &.video-m3u8-img{
        .img{
            opacity: 0;
        }
    }
}
.video-js{
    width: 100%;
    height: 100%;
    object-fit: contain;
}
/deep/ .video-progress{
    height: 2px;
    background-color: var(--bg-color4, rgba(0, 0, 0, 0.6));
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 3;

    .van-progress__portion{
        background-color: var(--bg-primary, #F6D658);
    }
    .van-progress__pivot{
        display: none;
    }
}

/deep/ .video-js {
    .vjs-control-bar {
        display: flex !important;
        z-index: 999;
        background-color: transparent;
    }
    .vjs-play-control,
    .vjs-volume-panel,
    .vjs-current-time,
    .vjs-time-divider,
    .vjs-duration,
    .vjs-remaining-time,
    .vjs-picture-in-picture-control,
    .vjs-fullscreen-control {
        display: none !important;
    }
    .vjs-control-bar .vjs-captions-button {
      display: none;
    }
}


</style>