<template>
  <div class="new-nav">
    <div class="fenlei"><img :src="imgUrl"></div>
    <h1>{{ title }}</h1>
  </div>
</template>
<script>
export default{
  name: 'nav-new',
  props: {
    title: {
      type: String,
      default: () => this.$t('str_menu_type_all')
    },
    imgUrl: {
      type: String,
      default: () => ''
    }
  }
}
</script>
<style lang="less" scoped>
.new-nav{
  position: fixed;
  left: 0;
  top: 45px;
  z-index: 97;
  // padding-top: 52px;
  display: flex;
  align-items: center;
  // margin: 10px 0;
  padding-left: 12px;
  width: 100%;
  height: 44px;
  background-color: #0E0E0F;
  font-size: 18px;
  font-weight: normal;
  color: #FFFFFF;
  .fenlei{
    margin-right: 8px;
  }
  h1{
    font-size: 18px;
  }
}
</style>