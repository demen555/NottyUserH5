<template>
  <div class="subNav">
    <van-nav-bar
      :right-text="rightText"
      left-arrow
      @click-left.stop="onClickLeft"
      @click-right="onClickRight"
    >
      <!-- <van-icon name="search" slot="right" /> -->
      <!-- <template #left>
        <img class="header-common" :src="themeChecked? require('~/static/images/com_jt_sx_zuo.svg'): require('~/static/images/com_jt_sx_zuo_rj.svg')" alt="com_jt_sx_zuo">
      </template> -->
      <template #left>
        <span>{{ title || $t('str_his') }}</span>
      </template>
    </van-nav-bar>
  </div>
</template>
<script>
  import commonMinxin from '~/plugins/mixins/common'
  export default{
    mixins: [commonMinxin],
    props: {
      title: {
        type: String,
        default: () => ""
      },
      text: {
        type: Boolean,
        default: () => false
      }
    },
    data() {
      return {
        rightText: this.$t('str_manage'),
      }
    },
    created(){
      console.log(this.text, ' 999')
      this.rightText = !this.text ? this.rightText : ''
    },
    methods: {
      onClickLeft() {
        this.$router.go('-1')
        // this.$toast('返回');
      },
      onClickRight() {
        if(!this.text) return
        // this.$toast('按钮');
        if (this.rightText === this.$t('str_manage')) {
          this.$emit('handleControl', 1)
          this.rightText = this.$t('str_cancel')
        } else {
          this.$emit('handleControl', 2)
          this.rightText = this.$t('str_manage')
        }
      }
    }
  }
</script>
<style lang="less" scoped>
.subNav{
  z-index: 999;
  position: fixed;
  top: 44px;
  width: 100%;
}
.header-common{
  width: 20px;
  height: 20px;
}
</style>