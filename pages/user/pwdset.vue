<template>
  <div>
    <HeaderTop @refresh="onRefresh"></HeaderTop>
    <Nav :title="$t('str_setting')" text></Nav>
    <div class="pwd-set">
        <div class="user-item" @click="goPages('/user/pwdChange')">
            <span class="words"> {{ $t('str_change_pwd') }} </span>
            <i :class="themeChecked?'icon': 'icon-white'"></i>
        </div>
        <div class="user-item" @click="handleLoginOut">
            <span class="words">{{ $t('str_logout') }}</span>
            <i :class="themeChecked?'icon': 'icon-white'"></i>
        </div>
        
    </div>
  </div>
</template>
<script>
import userMinxin from '~/plugins/mixins/user'
import commonMinxin from '~/plugins/mixins/common'
import { mapActions } from 'vuex'
import CODES from "~/plugins/enums/codes"


export default {
    mixins: [userMinxin, commonMinxin],
    methods:{
        ...mapActions(['set_userinfo','clearAccessToken']),
        onClickLeft(){
            this.$router.go(-1);
        },
        // 跳转页面
        goPages(page, type){
            if(type){
                return
            }
            this.$router.push({
                name: page
            })
        },
        onRefresh(){
          console.log('onRefresh')
        },
        async handleLoginOut(){
            try {
                const res = await this.$homeApi.postLoginOut()
                if(res.code === CODES.SUCCESS){
                    this.$toast(this.$t('toast7'))
                    this.set_userinfo({})
                    this.clearAccessToken()
                    this.$router.push("/")
                }
            } catch (error) {
                console.error(error)
            }
        },
    }
}
</script>
<style lang="less" scoped>
.pwd-set{
  padding-top:  88px;
}
.user-title{
    color: var(--text-color1, #FFFFFF);
    text-align: center;
    font-family: PingFang SC;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
}
.user-item{
    width: 100%;
    height: 58px;
    padding: 0 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    .words{
        color: var(--text-color2,  rgba(255, 255, 255, 0.70));
        font-family: PingFang SC;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }
    .icon{
        width: 12px;
        height: 12px;
        position: absolute;
        right: 16px;
        top: 50%;
        transform: translateY(-50%);
        background: url("~~/static/images/com_jt_sx_you.svg");
        background-size: cover;
    }
    .icon-white{
        width: 12px;
        height: 12px;
        position: absolute;
        right: 16px;
        top: 50%;
        transform: translateY(-50%);
        background: url("~~/static/images/com_jt_sx_you_rj.svg");
        background-size: cover;
    }
}
</style>