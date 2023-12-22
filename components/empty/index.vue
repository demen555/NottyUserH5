<template>
  <main class="main-list-no">
    <div class="main-list-empty">
      <div class="main-list-empty-img"><img src="~/static/images/com_qsy_nothing.svg" alt="com_qsy_nothing"></div>
      <div class="mian-list-empty-tit">{{ $t('str_no_data') }}</div>
    </div>
  </main>
</template>
<style lang="less" scoped>
/* 暂无数据 */
.main-list-no{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 160px;
  text-align: center;
  overflow: hidden;
  .main-list-empty-img{
    width: 180px;
    height: 180px;
  }
  .mian-list-empty-tit{
    font-size: 14px;
    color: var(--text-color2,  rgba(255, 255, 255, 0.70));
    line-height: 19.6px;
  }
}

</style>