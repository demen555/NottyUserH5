<template>
  <div>
    <HeaderTop @refresh="onRefresh"></HeaderTop>
    <Nav :title="$t('str_user_center')" text></Nav>
    <div class="user-info">

        <div class="user-content avatar">
            <span class="title">{{ $t('str_header') }}</span>
            <van-uploader :before-read="beforeRead">
                <div class="img-icon">
                    <img class="img" v-if="userinfo.userPortrait" :src="userinfo.userPortrait" alt="avatar">
                    <img class="img" v-else src="~/static/images/home_top_mrtx_1.svg" alt="avatar">
                    <i :class="themeChecked?'icon': 'icon-white'"></i>
                </div>
            </van-uploader>
        </div>

        <div class="user-content account"> 
            <span class="title">{{ $t('str_user_account') }}</span>
            <span class="words">{{ userinfo.userName }}</span>
        </div>
        <div class="user-content time">
            <span class="title">{{ $t('str_register_time') }} </span>
            <span class="words">{{ formatTime(userinfo.userRegTime) }}</span>
            
        </div>

        <div class="user-content pwdChange" @click="goPages('user-pwdChange')">
            <span class="title"> {{ $t('str_change_pwd') }} </span>
            <i class="words" :class="themeChecked?'icon': 'icon-white'"></i>
        </div>

    </div>
  </div>
</template>
<script>

import { mapGetters, mapActions } from "vuex"
import userMinxin from '~/plugins/mixins/user'
import commonMinxin from '~/plugins/mixins/common'
import { dateFormat, formatTime } from '@/utils/format.js'
import CODES from "~/plugins/enums/codes"


export default {
    name: "user",
    mixins: [userMinxin, commonMinxin],
   
    computed:{
        ...mapGetters([
            "userinfo"
        ]),
    },
    created(){
        this.getUserInfo();
    },
    methods:{
        ...mapActions(['set_userinfo']),
        dateFormat,
        formatTime,
        onClickLeft(){
            this.$router.go(-1);
        },
        onRefresh(){
          console.log('onRefresh')
        },
        // 获取用户信息
        getUserInfo(){
            this.$userApi.requestUserinfo().then( res => {
                if( res.code === CODES.SUCCESS ){
                   this.set_userinfo({...user, ...this.userinfo}); 
                } 
            })
        },

        // 跳转页面
        goPages(page, type){
          console.log(page)
            if(type){
                return
            }
            
            this.$router.push(this.localePath(page))
        },

        async beforeRead(file){
            this.$toast.loading({
                forbidClick: true,
                duration: 0,
                loadingType: "spinner"
            });
            const formData = new FormData();
            formData.append('file', file);
            const res = await this.$userApi.requestuserSetAvatar(formData);
            if(res.code === CODES.SUCCESS){
                const userData = await this.$userApi.requestUserinfo(); // 请求用户详情
                if(userData.code === CODES.SUCCESS){
                    const user = userData.data;
                    this.set_userinfo({...user, ...this.userinfo});     
                }
                this.$toast.clear();
            }
        },


    },
    
}
</script>
<style lang="less" scoped>
.flex-align-center-between{
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.user-info{
    padding: 98px 16px 0;
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
.img-icon{
    padding-right: 20px;
}
.user-content{
    width: 100%;
    height: 48px;
    .flex-align-center-between;
    cursor: pointer;
    position: relative;
    .title, .placeholder{
        color: var(--text-color2,  rgba(255, 255, 255, 0.70));
        font-family: PingFang SC;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }
    .placeholder{
        font-size: 14px;;
    }
    .words{
        color: var(--text-color1, #FFFFFF);
        text-align: right;
        font-family: PingFang SC;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;

    }
    .img{
        width: 32px;
        height: 32px;

    }
    .icon{
        width: 12px;
        height: 12px;
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        background: url("~~/static/images/com_jt_sx_you.svg");
        background-size: cover;
    }
    .icon-white{
        width: 12px;
        height: 12px;
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        background: url("~~/static/images/com_jt_sx_you_rj.svg");
    }
}
:deep(.van-nav-bar__left){
  font-size: 18px;
}
</style>