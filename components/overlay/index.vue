<template>
  <van-overlay class="add-main" :show="value" >
    <div class="wrapper" @click="$emit('input', false)">
      <div class="block">
        <!-- <img src="~~/static/images/add_main.svg"> -->
        <div class="add">
          <div>{{ $t('Addvideo') }}</div>
          <div><img src="~/static/images/xz_tjzpm_tj.svg" alt="xz_tjzpm_tj"></div>
        </div>
        <div class="triangle"></div>
        <div class="circle"><img src="~/static/images/xz_tjzpm_fx.svg" alt="xz_tjzpm_fx"></div>
        <div class="text">{{ $t('Addvideotoscreen') }}</div>
        <div class="know">{{ $t('Gotit') }}</div>
      </div>
      <div class="tip">
        <img src="~~/static/images/xz_tjzpm_jt.svg">
      </div>
    </div>
  </van-overlay>
</template>
<script>
export default{
  props: ['value'],
  data() {
    return {
      
    }
  },
}
</script>
<style lang="less" scoped>
.wrapper{
  // position: relative;
  // .block{
  //   position: absolute;
  //   right:0;
  //   left: 0;
  //   bottom: 48px;
  // }
}
.block{
  width: 343px;
  height: 241px;
  margin: 0 auto;
  position: fixed;
  right:0;
  left:0;
  bottom: 58px;
  border: 1PX dashed rgba(255, 255, 255, 0.70);
  border-radius: 16px;
  background-color: rgba(14, 14, 15, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: center;
  .add{
    width: 279px;
    height: 40px;
    border-radius: 8px;
    background-color: #fff;
    color: #181E2A;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 24px;
    font-size: 14px;
    padding: 0 12px;
  }
  .triangle {
    width: 0;
    height: 0;
    border-top: 12PX solid #fff;
    border-right: 8PX solid transparent;
    border-left: 8PX solid transparent;
  }
  .circle{
    margin-top: 16px;
  }
  .text{
    font-size: 14px;
    color: #fff;
    margin-top: 25px;
  }
  .know{
    font-size: 16px;
    color: #fff;
    width: 96px;
    height: 32px;
    border: 1PX solid #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    margin-top: 14px;
    background-color: #0C0C0D;
  }
}
.tip{
  width: 32px;
  height: 32px;
  margin: 0 auto;
  position: fixed;
  right:0;
  left:0;
  bottom: 8px;
}

</style>