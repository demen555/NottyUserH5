<template>
  <div class="cover" >
    <div class="main-like-radio" v-show="showCheck" @click.stop>
      <van-checkbox :name="item.vodId" @click.native.stop="()=>{}"></van-checkbox>
    </div>
    <nuxt-link class="main-list" @click.prevent :to="localePath({
        name: 'video-id',
        params: { id: `${item.vodName} ${item.vodId}`.toLowerCase().replace(/ /g, '-') }
    })">
      <!-- <div style="height: 50px;" v-if="!['index___en','index___pt'].includes(this.$route.name)" class="d-none d-md-block"></div> -->
      <!-- <div style="height: 16px;" v-if="!['index___en','index___pt'].includes(this.$route.name)" class="d-sm-none"></div> -->
      <div class="main-list-group" @touchmove="longpressVideo(item)" @mouseenter="longpressVideo(item)">
        <div class="main-video">
          <div :class="['main-img', { 'main-img-opacity' : vodId == item.vodId && item.vodPreviewUrl }]" >
           <van-image
              lazy-load
              :src="item.vodPic"
              :alt="item.vodName || '-'">
            <template slot="loading">
              <img :src="themeChecked? require('~/static/images/com_lazy_black.svg') : require('~/static/images/com_lazy_white.svg')" alt="com_lazy_black">
            </template>
            <template slot="error">
              <img :src="themeChecked? require('~/static/images/com_lazy_black.svg') : require('~/static/images/com_lazy_white.svg')" alt="com_lazy_black">
            </template>
          </van-image>
          </div>
          <client-only>
            <!-- 只加载当前视频id -->
            <div @click="handleGoDetail(item)" class="main-img" v-if="vodId == item.vodId && item.vodPreviewUrl">
              <videoMp4 :vodPic="item.vodPic" :videoSrc="item.vodPreviewUrl" ></videoMp4>
            </div>
          </client-only>  
          <div class="main-time">{{ item.vodDuration }}</div>
        </div>
        <nuxt-link :to="localePath({
            name: 'creator',
            query: { userId: item.user && item.user.userId}
        })">
          <div class="main-update-content">
            <div class="main-update-img" v-if="item.user && item.user.userPortrait"><img :src="item.user.userPortrait" alt="person"></div>
            <div class="main-update-img" v-else><img src="~/static/images/person.svg" alt="person"></div>
            <div class="main-content">
              <div class="main-title">{{ item.vodName }}</div>
              <!-- <div class="main-title">IPX-879丝袜SPA店攻略！哪个是最好的足交餐？-ss时尚大的IPX-879丝袜SPA店攻略！哪...</div> -->
              <div class="main-btn">
                <div>{{ item.user?.name || '--' }}</div>
                <div class="main-btn-right">
                  <div class="main-btn-view">
                    <div :class="themeChecked? 'main-view':'main-view-white'"></div>
                    <div class="main-text">{{ formatNumber(item.vodHits) }}</div>
                  </div>
                  <div class="mian-btn-like">
                    <div :class="themeChecked? 'main-like':'main-like-white'"></div>
                    <div class="main-text">{{ formatPer(item.vodUp, item.vodUp+item.vodDown)}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nuxt-link>
      </div>
    </nuxt-link>
  </div>
</template>
<script>
import Cover from '@/components/cover'
import { formatNumber, formatPer } from '@/utils/format.js'
import { mapGetters } from 'vuex';
import videoM3u8 from "@/components/videoM3u8"
import videoMp4 from "@/components/videoMp4"
import { isPc } from '@/utils/format.js'
export default{
  props: {
    item: {
      type: Object,
      required: true,
    },
    showCheck: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      activeIcon: require('~/static/images/com_select_on1.svg'),
      inactiveIcon: require('~/static/images/com_select_1.svg'),
    }
  },
  computed: {
    ...mapGetters(['theme', 'vodId']),
    themeChecked(){
      return this.theme === 'dark'
    }
  },
  components: {
    Cover,
    videoM3u8,
    videoMp4
  },
  methods: {
    formatNumber,
    formatPer,
    handleGoDetail(item){

      this.$router.push( this.localePath({
        name: 'video-id',
        params: {
          id: item.vodId
        }
      }))
    },
    longpressVideo(item){
      this.$store.commit("SET_VODID", item.vodId)
    },
    mouseenterVideo(item){
      
      if( isPc() ){
        this.$store.commit("SET_VODID", item.vodId)
      }else{
        return;
      }
    }
  }
}
</script>
<style lang="less" scoped>/*main*/
.cover{
  position: relative;
}
.main-list{
  width: 100%;
  margin: 0 auto;
  
}
.main-list-group{
  margin-top: 16px;
}
.main-video{
  padding-top: 56.53%;
  position: relative;
}
.main-like-radio{
  position:absolute;
  right: 12.5px;
  top: 30px;
  height: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 22;
}
.main-img{
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  &.main-img-opacity{
    display: none;
  }
}
.van-image{
  width: 100%;
  height: 100%;
  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.main-img img{
  width: 100%;
  height: 100%;
}
.main-time{
  position: absolute;
  right: 8px;
  bottom: 8px;
  padding: 0 8px;
  height: 24px;
  border-radius: 4px;
  background: var(--bg-color4, rgba(0, 0, 0, 0.6));
  font-size: 14px;

  text-align: center;
  line-height: 24px;
  z-index: 6;
  color: rgba(255, 255, 255, 0.70); //黑白版都是这个颜色
}
.main-content{
  width: 100%;
  padding: 0 12px;
}
.main-title{
  font-size: 14px;
  font-weight: 400;
  color: var(--text-color2,  rgba(255, 255, 255, 0.70));
  margin-top: 8px;
  // word-break: break-all;
  word-break: break-word;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  margin-bottom: 8px;
}
.main-update-content{
  display: flex;
  .main-update-img{
    margin-top: 8px;
    margin-left: 12px;
    img{
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
}
.main-btn{
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--text-color2,  rgba(255, 255, 255, 0.70));
  height: 17px;
  // padding-left: 12px;
  .main-btn-right{
    display: flex;
    align-items: center;
  }
}
.main-btn-view,.mian-btn-like{
  display: flex;
  align-items: center;
  margin-left: 24px;
  height: 17px;
  line-height: 17px;
}
.main-like{
  width: 16px;
  height: 16px;
  background-image: url('~~/static/images/com_dianzan_1.svg');
  background-repeat: no-repeat;
  background-size: contain;
  margin-right: 4px;
}
.main-like-white{
  width: 16px;
  height: 16px;
  background-image: url('~~/static/images/com_dianzan.svg');
  background-repeat: no-repeat;
  background-size: contain;
  margin-right: 4px;
}
.main-text{
  font-size: 12px;
  display: flex;
  align-items: center;
}
.mian-like{
	transform: translateY(0px);
  filter: drop-shadow(#ffffff 0px 0px 0px);
}
</style>