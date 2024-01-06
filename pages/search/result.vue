<template>
  <div class="search-page">
    <HeaderTop></HeaderTop>
    <div class="search">
      <div class="search-img" @click="handleGoHome"><img class="svg-icon" src="~/static/images/com_jt_sx_zuo.svg" alt="com_jt_sx_zuo"></div>
      <div class="search-btn">
        <input v-model="search" placeholder="搜索点什么" class="search-input" type="text" clearable>
        <img class="header-common com-sousuo svg-icon" src="~/static/images/com_sousuo_1.svg" alt="com_sousuo_1">
        <img v-if="search" @click="handleReset" class="header-common com-close svg-icon" src="~/static/images/com_sousuo_guanbi_1.svg" alt="com_sousuo_guanbi_1">
      </div>
    </div>
    <div class="search-result" v-html="$t('Similartoresults', { tags: '日本无码', num: 73 })"> </div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <p>刷新次数: {{ count }}</p>
      <Cover v-for="item in dataList" :item="item" :key="item.id"></Cover>
    </van-pull-refresh>
  </div>
</template>
<script>
import HeaderTop from '@/components/header/top.vue'
import Cover from '@/components/cover'
export default{
data() {
  return {
    search: '',
    count: 0,
    isLoading: false,
    dataList: [
      {
        id: 1,
        time: '01:23:34',
        title: 'IPX-879丝袜SPA店攻略！哪个是最好的足交餐？-ss时尚大的IPX-879丝袜SPA店攻略！哪个是最好的足交餐？-ss时尚大的'
      },
      {
        id: 2,
        time: '01:23:34',
        title: 'IPX-879丝袜SPA店攻略！哪个是最好的足交餐？-ss时尚大的IPX-879丝袜SPA店攻略！哪个是最好的足交餐？-ss时尚大的'
      },
      {
        id: 3,
        time: '01:23:34',
        title: 'IPX-879丝袜SPA店攻略！哪个是最好的足交餐？-ss时尚大的IPX-879丝袜SPA店攻略！哪个是最好的足交餐？-ss时尚大的'
      },
      {
        id: 4,
        time: '01:23:34',
        title: 'IPX-879丝袜SPA店攻略！哪个是最好的足交餐？-ss时尚大的IPX-879丝袜SPA店攻略！哪个是最好的足交餐？-ss时尚大的'
      },
      {
        id: 5,
        time: '01:23:34',
        title: 'IPX-879丝袜SPA店攻略！哪个是最好的足交餐？-ss时尚大的IPX-879丝袜SPA店攻略！哪个是最好的足交餐？-ss时尚大的'
      }
    ]
  }
},
created(){
  this.initDataList()
  this.search = this.$route.query.search
  console.log(1111)
},
components: {
  HeaderTop,
  Cover
},
methods: {
  initDataList(){

  },
  handleReset(){
    this.search = ''
  },
  onRefresh() {
    setTimeout(() => {
      this.$toast(this.$t('toast8'));
      this.isLoading = false;
      this.count++;
    }, 500);
  },
  handleGoHome(){
    this.$router.push(this.localePath('home'))
  }
}
}
</script>
<style lang="less">
.search{
  // width: 90%;
  margin: 0 12px;
  display: flex;
  justify-content: space-between;
  height: 32px;
  align-items: center;
  margin-top: 55px;
}
.search-img{
  width: 16px;
  height: 16px;
  display: flex;
}
.search-btn{
  width: 90%;
  font-size: .389rem;
  position: relative;
  display: flex;
  align-items: center;
}
.search-input{
  width: 100%;
  background-color: var(--bg-color3, rgba(255, 255, 255, 0.10));
  border-radius: 16px;
  text-indent: 6em;
  color: var(--text-color2,  rgba(255, 255, 255, 0.70));
  height: 32px;
  border: none;
}
input::placeholder{
  color: var(--text-color2,  rgba(255, 255, 255, 0.70));
}
.com-sousuo{
  position: absolute;
  left: 12px;
  top: 8px;
  width: 16px;
  height: 16px;
}
.com-close{
  position: absolute;
  right: 12px;
  top: 8px;
  width: 16px;
  height: 16px;
}
.search-result{
  font-size: 14px;
  color: var(--text-color2,  rgba(255, 255, 255, 0.70));
  width: 90%;
  margin: 0 auto;
  margin-top: 12px;
  margin-bottom: 12px
}
.search-result span{
  color: var(--bg-primary, #FFE500);
}
</style>