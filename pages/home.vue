<template>
  <div class="home">
    



    <!-- {{ $t('hello') }} 
    {{ homeList }}
    <van-button @click="changeTheme('dark')">
      切换黑色主题
    </van-button>
    <van-button @click="changeTheme('light')">
      切换白色主题
    </van-button> -->
  </div>
  
</template>

<script>
import setTheme from '~/plugins/theme/theme.js';
export default {
  name: 'IndexPage',
  data(){
    return{
      homeList:[],
    }
  },
  async asyncData ({ $homeApi }) {
    const res = await $homeApi.requestvodpageHome();
    console.log(res)
    if( res.code == 200 ){
      return {
        homeList: res.data.data
      }
    }
  },
  created(){

  },
  methods:{
    changeTheme(theme) {
      setTheme(theme);
    },
  }
}
</script>
<style lang="less" scoped>
.a{
  font-size: 36px;
  color: var(--bg-color1);
}
</style>

