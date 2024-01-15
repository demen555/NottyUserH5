<template>
    <div :class="['video-m3u8', { 'video-m3u8-img': isCompleted }]" :id="`video-mp4-${vodId}`">
        <van-progress class="video-progress" v-show="!isCompleted" :percentage="progress" />
        <img class="img" v-if="vodPic" :src="vodPic" alt="part1">
        <img class="img" v-else src="~/static/images/cover1.svg" alt="part1">
        <video 
          autoplay 
          class="webm-previewEl" 
          disableremoteplayback 
          playsinline 
          loop 
          muted="muted" 
          crossorigin="anonymous" 
          @loadedmetadata="handleLoadedMetadata"
          :src="videoSrc">
        </video>
        <!-- :src="videoSrc" -->
        </div>
</template>
<script>
import { mapGetters } from 'vuex';
// https://stream7.iqilu.com/10339/upload_transcode/202002/18/20200218093206z8V1JuPlpe.mp4
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
    },
    data() {
        return {
            player: null,
            progress: 0, // 初始值代表再加载
            isCompleted: false,
            isOpen: false,
        }
    },
    computed:{
        ...mapGetters(['vodId']),
    },
    mounted() {
        this.animateProgress(99, 2000)

        
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

        contains(e){
            let $video = document.querySelector(`#video-mp4-${this.vodId}`);
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

        handleLoadedMetadata(){
          this.isOpen = true;
          this.isCompleted = true;
          console.log("Video metadata loaded");
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
.webm-previewEl{
    width: 100%;
    height: 100%;
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