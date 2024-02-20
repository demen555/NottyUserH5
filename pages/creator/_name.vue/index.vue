<template>
  <div>
    <HeaderTop @refresh="onRefresh" v-show="isStickyVisible"></HeaderTop>
    <div class="main-video">
      <div class="video-container">
        <div class="main-update-img" v-if="upInfo?.userPortrait"><img :src="upInfo.userPortrait" alt="person"></div>
        <div class="main-update-img" v-else><img src="~/static/images/person.svg" alt="person"></div>
        <h1 class="main-title">{{ upInfo?.name || 'None' }}</h1>
        <div class="main-btn">
          <div class="main-btn-right">
            <div class="main-btn-view">
              <div :class="themeChecked ? 'main-view' : 'main-view-white'"></div>
              <div class="main-text">{{ formatNumber(upInfo?.vodCount || 0)}}</div>
            </div>
          </div>
        </div>
      </div>

      <template>
        <div class="video-line"></div>
        <div class="video-list">
          <div class="video-tag-list">
            <div class="tag-name" :class="activeTag === tag.id ? 'active' : ''" v-for="(tag, index) in tagList"
              :key="tag.id">
              <div @click="handleChangeTag(tag.id)">{{ tag.name }}</div>
            </div>
          </div>
        </div>
        <!-- <div class="loading-box" v-if="spainnerLoading">
          <cardLoad></cardLoad>
        </div> -->
        <div v-if="dataList.length">
          <van-pull-refresh v-model="refreshing" @refresh="onRefresh" class="paddingTop52">
            <van-list
              v-model="loading"
              :finished="finished"
              :finished-text="$t('str_no_more')"
              :immediate-check='false'
              @load="onLoad"
            >
              <Cover v-for="item in dataList" :item="item" :key="item.vodId"></Cover>
            </van-list>
          </van-pull-refresh>
        </div>
        <Empty v-else></Empty>
      </template>
    </div>
  </div>
</template>
<script>
import cover from "~/components/cover";
import { mapGetters } from "vuex";
import commonMinxin from '~/plugins/mixins/common'
import { dateFormat, formatNumber, uniArray } from '~/utils/format.js';
import Empty from '~/components/empty'
import cardLoad from "~/components/skeleton/cardLoad.vue"
import CODES from "~/plugins/enums/codes"

export default {
  mixins: [commonMinxin],
  data() {
    return {
      spainnerLoading: false,
      loading: false, // 是否处于加载状态
      finished: false, // 是否加载完成
      refreshing: false, // 当前是否刷新重置信息
      dataList: [],
      pageInfo: {
        page: 1,
        size: 20
      },
      tagList: [
        { id: 'vod_time_add', name: this.$t('str_page_text15') },
        { id: 'vod_hits', name: this.$t('str_page_text16') },
        { id: 'vod_up', name: this.$t('str_page_text17') }
      ],
      activeTag: 'vod_time_add',
      upInfo: {}
    }
  },
  head(){
    const hostName = process.server ? this.$nuxt.context.req.headers.host.replace(/:\d+$/, '') : window.location.host;
    return {
      title: 'our creator' + this.name,
      meta: [
          {
              hid: 'description',
              name: 'description',
              content: `Checkout naked ${this.name} fuck hardcore in XXX videos. All sex scenes of anal, lesbian porn, threesome, and big dicks porno on Nottyhub, Free to Watch!`
          },
          {
              hid: 'keyswords',
              name: 'keyswords',
              content: this.name + '-' + 'Creator'
          },
          {
              hid: 'title',
              name: 'title',
              content: 'our creator' + this.name
          },
          { hid: 'og:title', property: 'og:title', content: 'our creator' + this.name },
          { hid: 'og:description', property: 'og:description', content:  `Checkout naked ${this.name} fuck hardcore in XXX videos. All sex scenes of anal, lesbian porn, threesome, and big dicks porno on Nottyhub, Free to Watch!`},
          { hid: 'og:keywords', property: 'og:keywords', content: this.name + '-' + 'Creator' },
      ],
      link: [
          {
              hid: "canonical",
              rel: 'canonical',
              href: `https://${hostName}${this.$nuxt.context.route.fullPath}`,
          },
      ],
    }
  },
  computed: {
    ...mapGetters([
      "historyVod",
      "userinfo",
      "noLoginUpVod",
      "noLoginDownVod",
      "isLogin"
    ]),
    userId(){
      return localStorage.getItem('userId')
    },
    name(){
      return this.$route.params.name
    }
  },

  components: {
    cover,
    Empty,
    cardLoad
  },

  created() {
    this.getUpInfo()
    this.getList('first')
  },
  methods: {
    dateFormat,
    formatNumber,
    handleChangeTag(id) {
      this.activeTag = id
      this.getList(true)
    },
    onLoad(){
      this.pageInfo.page += 1
      this.getList();
    },
    async getUpInfo() {
      try {
        const res = await this.$homeApi.requestUpInfo({userId: this.userId})
        const { code, data = {} } = res
        if (code === CODES.SUCCESS) {
          console.log(data, 'upInfo')
          this.upInfo = data
        }
      } catch (error) {
        console.error(error)
      }
    },
    async getList(isRefresh) {
      try {
        isRefresh === 'first' && (this.spainnerLoading = true)
        this.loading = true
        const params = { page: this.pageInfo.page, size: this.pageInfo.size, userId: this.userId, orderBy: this.activeTag}
        const res = await this.$homeApi.requestvodpageHome(params)
        const { code, data = {} } = res
        if (code === CODES.SUCCESS) {
          // data.data = data.data.map(item => {
          //   return item = item.vod
          // })
          if (isRefresh) {
            // this.dataList = [ ...body.records, ...this.dataList ]
            this.dataList = data.data
            this.refreshing = false
          } else {
            this.dataList = uniArray([...this.dataList, ...data.data], 'vodId')
            this.loading = false
          }
          if (data.data.length === 0) {
            this.finished = true
          }
        }
      } catch (error) {
        console.error(error)
      } finally {
        this.spainnerLoading = false
        this.loading = false
        this.refreshing = false
        console.log(this.loading)
      }
    },
    onRefresh() {
      this.pageInfo.page = 1
      this.getList(true);
    }
  }
}
</script>
<style lang="less" scoped>
.flex-align-center {
  display: flex;
  align-items: center;
}

.padding-8-12 {
  padding: 8px 12px;
}

.main-video {
  /deep/ .main-list-no {
    margin-top: 20px;
  }

  /deep/ .van-tabs__nav {
    background-color: var(--bg-color1, #0E0E0F);

    .van-tab {
      padding: 0 12px;
      flex: inherit;
      color: var(--text-color2, rgba(255, 255, 255, 0.70));
      font-size: 14px;
    }

    .van-tab--active {
      color: var(--text-color1, #FFFFFF);
      font-size: 18px;
    }

    .van-tabs__line {
      transform: translateX(40px);
      background-color: #F6D658;
      width: 20px;
      height: 2px;
      bottom: 20px;
    }
  }

  /deep/ .van-nav-bar {
    background-color: transparent;
  }


}

.video-container {
  width: 375px;
  height: 212px;
  margin-top: 44px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .flex-align-center {
    justify-content: center;
  }

  .left-arrow {
    position: fixed;
    left: 16px;
    top: 60px;
    z-index: 99;
  }
}

.video-space {
  width: 375px;
  height: 264px;
}

.video-description {
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

.video-title {
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

.video-data {
  .flex-align-center;
  .padding-8-12;

  .data-watch {
    .flex-align-center;
  }

  .icon {
    width: 16px;
    height: 16px;
    // background: var(--icon-bofangliang);
    background-size: cover;
  }

  .words {
    color: var(--text-color2, rgba(255, 255, 255, 0.70));
    font-size: 12px;
    margin-left: 4px;
  }

  .data-time {
    margin-left: 12px;
    color: var(--text-color2, rgba(255, 255, 255, 0.70));
    font-size: 12px;
  }
}

.video-controls {
  .flex-align-center;
  padding: 4px 24px 12px;
  justify-content: space-between;

  .controls {
    .flex-align-center;
    flex-direction: column;
    justify-content: center;

    .words {
      margin-top: 4px;
    }

    &:nth-child(1) {
      .icon {
        background: url("~~/static/images/com_dianzan_1.svg");
        background-size: cover;
      }

      .icon-on {
        background: url("~~/static/images/com_dianzan_on.svg");
        background-size: cover;
      }
    }

    &:nth-child(2) {
      .icon {
        background: url("~~/static/images/com_caizan_1.svg");
        background-size: cover;
      }

      .icon-on {
        background: url("~~/static/images/com_caizan_on.svg");
        background-size: cover;
      }
    }

    &:nth-child(3) {
      .icon {
        background: url("~~/static/images/com_shoucang_1.svg");
        background-size: cover;
      }

      .icon-on {
        background: url("~~/static/images/com_shoucang_on.svg");
        background-size: cover;
      }
    }

    &:nth-child(4) {
      .icon {
        background: url("~~/static/images/com_fenxiang.svg");
        background-size: cover;
      }
    }
  }

  .icon {
    width: 20px;
    height: 20px;

  }

  .words {
    color: var(--text-color2, rgba(255, 255, 255, 0.70));
    font-size: 12px;
    // transform: scale(0.83); // 10px
  }
}

.video-tags {
  display: flex;
  flex-wrap: wrap;
  .padding-8-12;

  .tag {
    color: var(--text-color2, rgba(255, 255, 255, 0.70));
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

.video-line {
  display: flex;
  width: 100%;
  height: 1px;
  padding-top: 1px;
  background-color: var(--border-line, rgba(245, 245, 247, 0.06));
}

.review-list {
  .padding-8-12;

  .list-top {
    .flex-align-center;
    justify-content: space-between;

    .top-img {
      width: 32px;
      height: 32px;
    }

    .top-name {
      flex: 1;
      color: var(--text-color2, rgba(255, 255, 255, 0.70));
      font-size: 14px;
      padding-left: 8px;
    }

    .top-time {
      color: var(--text-color2, rgba(255, 255, 255, 0.70));
      font-size: 12px;
    }
  }

  .list-bottom {
    color: var(--text-color1, #FFFFFF);
    font-size: 14px;
    padding-left: 40px;
  }
}

.review-btn {
  .flex-align-center;
  .padding-8-12;
  justify-content: space-between;

  .num {
    color: var(--text-color2, rgba(255, 255, 255, 0.70));
    font-family: PingFang SC;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  .btn {
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

.review-input {
  width: 100%;
  padding: 8px 12px;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 998;
  background-color: var(--bg-color1, #0E0E0F);
  height: 56px;

  .input {
    width: 100%;
    height: 40px;
    flex-shrink: 0;
    border-radius: 8px;
    border: 1px solid var(--border-line, rgba(245, 245, 247, 0.06));
    background: var(--bg-color2, rgba(255, 255, 255, 0.06));
    padding: 0 12px;
  }
}

.main-update-img {
  margin-top: 32px;
  width: 80px;
  height: 80px;

  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
}

.main-title {
  font-size: 14px;
  color: #FFFFFF;
  margin-top: 16px;
}

.main-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--text-color2, rgba(255, 255, 255, 0.70));
  height: 17px;
  padding-left: 12px;
  margin-top: 12px;

  .main-btn-right {
    display: flex;
    align-items: center;
  }
}

.main-view {
  width: 16px;
  height: 16px;
  background-image: url('~~/static/images/com_shipinshu_1.svg');
  background-repeat: no-repeat;
  background-size: contain;
  margin-right: 4px;
}

.main-like {
  width: 16px;
  height: 16px;
  background-image: url('~~/static/images/com_dianzan_1.svg');
  background-repeat: no-repeat;
  background-size: contain;
  margin-right: 4px;
}

.main-like-white {
  width: 16px;
  height: 16px;
  background-image: url('~~/static/images/com_dianzan.svg');
  background-repeat: no-repeat;
  background-size: contain;
  margin-right: 4px;
}

.main-btn-view,
.mian-btn-like {
  display: flex;
  align-items: center;
  margin-right: 24px;
  height: 17px;
}

.video-tag-list {
  display: flex;
  // min-width: 375px;
  margin-bottom: 16px;
  overflow-x: auto;
  flex-grow: 1;
  margin-left: 12px;
  // margin-right: 12px;
  margin-top: 16px;

  a {
    color: #fff;
    display: block;
    display: flex;
    flex-grow: 1;
  }

  .active {
    border-color: #F6D658 !important;
  }

  .tag-name {
    flex-shrink: 0;
    padding: 5px 8px;
    // width: 98px;
    // height: 28px;
    border-radius: 4px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    text-align: center;
    margin-right: 10px;
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), linear-gradient(0deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.06));
  }
}</style>