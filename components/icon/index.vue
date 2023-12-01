<template>
  <div>
    <svg>
      <use :href="`#icon-${iconName}`"></use>
    </svg>
  </div>
</template>
 
<script>

 
export default {
  props: {
    iconName: String
  },
}
</script>

<style lang="less" scoped>
.icon {
    fill: #000000; /* 修改为你想要的颜色值 */
}
</style>