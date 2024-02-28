<template>
  <van-sticky>
    <main class="footer-sz">
      <div @click="handleBtn('all')" v-if="isAll" class="cursor-pointer">{{ $t('str_choose_all') }}</div>
      <div @click="handleBtn('noall')" v-else class="cursor-pointer">{{ $t('str_cancel') }}</div>
      <span class="footer-line"></span>
      <div @click="handleBtn('del')" class="footer-del cursor-pointer">{{ $t('str_delete') }}<span v-if="result.length">({{ result.length }})</span></div>
    </main>
  </van-sticky>
</template>
<script>
  export default{
    props: {
      title: {
        type: String,
        default: () => '历史记录'
      },
      result: {
        type: Array,
        default: () => []
      },
      showCheck: {
        type: Boolean,
        default: () => false
      }
    },
    data() {
      return {
        rightText: '管理',
        isAll: true
      }
    },
    methods: {
      handleBtn(type) {
        if(this.showCheck){
          if(type !== 'del'){
            this.isAll = !this.isAll
          }
          this.$emit('handleAll', type)
        }
      }
    }
  }
</script>
<style lang="less" scoped>
.footer-sz{
  display: flex;
  font-size: 16px;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 48px;
  align-items: center;
  justify-content: space-between;
  z-index: 88;
  background-color: var(--bg-color1, #0E0E0F);
  border-top: 1px solid var(--bg-color2, rgba(255, 255, 255, 0.06));
  text-align: center;
  color: var(--text-color2,  rgba(255, 255, 255, 0.70));
}
.footer-sz div{
  width: 35%;
  margin: 0 auto;
}
.footer-del{
  color: var(--bg-primary, #F6D658);
}
.footer-line{
  width: 1px;
  height: 16px;
  background-color: var(--bg-color2, rgba(255, 255, 255, 0.06));
}
</style>