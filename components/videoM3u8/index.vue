<template>
    <div :class="['video-m3u8', { 'video-m3u8-img': isCompleted }]">
        <van-progress class="video-progress" v-show="!isCompleted" :percentage="progress" />
        <img class="img" v-if="vodPic" :src="vodPic" alt="part1">
        <img class="img" v-else src="~/static/images/cover1.svg" alt="part1">
        <video @click="videobtn" :id="`hls-video-${vodId}`" x5-video-player-type='h5' playsinline  muted="muted" class="video-js vjs-default-skin">
            <source :src="vodPlayUrl()" type="application/x-mpegURL">
        </video>
    </div>
</template>
<script>


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
    },
    data() {
        return {
            player: null,
            progress: 0, // 初始值代表再加载
            isCompleted: false,
            isOpen: false,
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
        console.log( this.player )
        // 视频禁用鼠标右键
        this.player && this.player.on('contextmenu', (e) => {
            e.preventDefault();
        });

        // 加载进度
        this.player && this.player.on('progress', (e) => {
            // this.start();
        });

        // 加载完成等待
        this.player && this.player.on('click', (e) => {
            console.log("点击")
        });

        // 开始播放
        this.player && this.player.on('canplaythrough', (e) => {
            console.log("开始播放");
            this.isOpen = true;
            this.isCompleted = true;
        });

        // // 播放完成事件
        // this.player && this.player.on('ended', (e) => {
        //     this.$store.commit("SET_VODID", "")
        // });

        // 加载异常
        this.player && this.player.on('error', (e) => {
            console.log('加载异常')
            // 如果是开始播放之后捕获异常直接跳出播放器
            if( !this.isOpen ){
                // this.$store.commit("SET_VODID", "")
                // this.player.load(); // 捕获异常重新载入
            }
            
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
        videobtn(){
            console.log("DIAN")
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
    width: 100%;
    height: 100%;
    position: relative;
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
</style>