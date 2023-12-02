<template>
  <div>
    <HeaderTop @refresh="onRefresh"></HeaderTop>
    <div class="set-name" style="padding-top: 44px;">  
        <van-nav-bar
            left-arrow
            fixed
            placeholder
            @click-left="onClickLeft"
        >
            <!-- <template #left>
              <img class="header-common" :src="themeChecked? require('~/static/images/com_jt_sx_zuo.svg'): require('~/static/images/com_jt_sx_zuo_rj.svg')" alt="com_jt_sx_zuo">
            </template> -->
            <template #left>
                <h1 class="user-title"> {{ $t('str_set_name') }} </h1>
            </template>
            <template #right>
                <span class="user-submit" @click="onClickRight">{{ $t('str_save') }} </span>
                <van-loading class="user-icon" type="spinner" v-show="showLoading" />
            </template>
        </van-nav-bar>
        <div class="user-line"></div>
        <div class="user-lable">
            <span class="lable">{{ $t('str_nick_name') }}</span>
            <input 
                v-model="form.name" 
                class="input" 
                :placeholder="$t('str_please_set_name')" 
                type="text">
        </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex"
import commonMinxin from '~/plugins/mixins/common'
import CODES from "~/plugins/enums/codes"


export default {
    mixins: [commonMinxin],
    data(){
        return {
            form: {
                name: ""
            },
            showLoading: false
        }
    },
    computed:{
        ...mapGetters([
            "userinfo"
        ])
    },
    methods:{
        onClickLeft(){
            this.$router.go(-1);
        },
        onRefresh(){
          console.log('onRefresh')
        },
        onClickRight(){
            if( this.showLoading || !this.form.name ){ // 避免接口慢重复提交
                return this.$toast(this.$t('toast15')) 
            }
            this.showLoading = true;
            requestUsernickname({
              nickname: this.form.name
            }).then( res => {
                if(res.code === CODES.SUCCESS){
                    this.$toast.success(this.$t('toast16'));
                    this.onClickLeft();
                }else{
                    // this.$toast.fail(res.message);
                }
            }).finally( res => {
                this.showLoading = false;
            })
        }
    }
}
</script>
<style src="~/static/less/user.less" lang="less" scoped></style>
<style lang="less" scoped>
.set-name {
  /deep/.van-nav-bar--fixed{
    top: 44px;
  }
}
</style>
