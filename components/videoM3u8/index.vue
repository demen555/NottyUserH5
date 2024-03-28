<template>
    <div class="dplayer-container">
        <div id="dplayerShorts" ref="dplayerShorts" class="dplayer video-box"></div>
    </div>
</template>
<script>
import {  isPc } from '~/utils/format.js';
// 视频截取
function vodPlayUrl (url){
    const arr = url.split('$')
    const str = arr.find(  ele => ele.includes('.m3u8'))
    return str || ""
}
export default {
    props:{
        videoInfo: {
            type: Object,
            default: () => {}
        },
    },
    mounted(){
        this.initDPlayer()
    },
    methods:{
        initDPlayer(){
            const { videoInfo } = this;
            this.dp = new DPlayer({
                element: this.$refs.dplayerShorts,
                lang: 'en',
                autoplay: true,
                // muted: true, // 添加 muted 属性
                // volume: 0,
                video: {
                    // pic: videoInfo.vodPic, 
                    url: vodPlayUrl(videoInfo.vodPlayUrl),
                    type: 'customHls',
                    hotkey:true,
                    autoplay: true,
                    customType: {
                        customHls: function (video, player) {
                            const hls = new Hls()
                  			hls.loadSource(video.src)
                            hls.attachMedia(video)
                        }
                    }
                },
            });

            this.dp && this.dp.on('loadeddata', () => {
                // 监听视频区域的点击事件
                if( !isPc() ){
                    this.dp && this.dp.container.addEventListener('click', (event) => {
                        if (event.target === this.dp.video) {
                            console.log( '用 toggle 方法切换播放状态' , this.dp.video.paused, this.dp)
                            // 调用 toggle 方法切换播放状态
                            if (this.dp.video.paused) {
                                this.dp.play();
                            } else {
                                console.log("视频暂停")
                                this.dp.pause();
                            }
                        }
                    }, true);
                }
            });



        }
    }
}
</script>
<style lang="less" scoped>
.dplayer-container {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
/deep/ .dplayer {
    height: 100%;
    .dplayer-mobile-play{
        opacity: 0 !important;
    }
    .dplayer-notice{
        opacity: 0 !important;
    }
    &.dplayer-paused .dplayer-mobile-play{
        display: block !important;
        opacity: 1 !important;
        background: url("~~/static/images/bfq_play.png");
        background-size: 100% 100%;
        svg{
            opacity: 0;
        }
    } 
    .dplayer-controller{
        .dplayer-icons{
            display: none;
        }
        .dplayer-bar-wrap{
            bottom: 8px;
        }
    }
}
</style>
