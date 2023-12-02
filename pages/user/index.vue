<template>
  <div>
    <HeaderTop @refresh="onRefresh"></HeaderTop>
    <Nav :title="$t('str_user_center')" text></Nav>
    <div class="user-info">
        <!-- <van-nav-bar
            left-arrow
            fixed
            placeholder
            @click-left="onClickLeft"
        >
            <template #title>
                <h1 class="user-title">  {{ $t('str_user_center') }} </h1>
            </template>
        </van-nav-bar> -->
        <div class="user-content avatar">
            <span class="title">{{ $t('str_header') }}</span>
            <img class="img" src="~/static/images/avatar.png" alt="">
        </div>
        <!-- <div class="user-content name" @click="goPages('setName')" >
            <span class="title">{{ $t('str_nick_name') }}</span>
            <span class="words">{{ userinfo.userNickName }}</span>
            <i :class="themeChecked?'icon': 'icon-white'"></i>
        </div> -->
        <div class="user-content account"> 
            <span class="title">{{ $t('str_user_account') }}</span>
            <span class="words">{{ userinfo.userName }}</span>
        </div>
        <div class="user-content time">
            <span class="title">{{ $t('str_register_time') }} </span>
            <span class="words">{{ $t(formatTime(userinfo.userRegTime)) }}</span>
            
        </div>

        <div class="user-content pwdChange" @click="goPages('pwdChange')">
            <span class="title"> {{ $t('str_change_pwd') }} </span>
            <i class="words" :class="themeChecked?'icon': 'icon-white'"></i>
        </div>

    </div>
  </div>
</template>
<script>

import { mapGetters } from "vuex"
import userMinxin from '~/plugins/mixins/user'
import commonMinxin from '~/plugins/mixins/common'
import { dateFormat, formatTime } from '@/utils/format.js'
import CODES from "~/plugins/enums/codes"


export default {
    name: "userInfo",
    mixins: [userMinxin, commonMinxin],
   
    computed:{
        ...mapGetters([
            "userinfo"
        ])
    },
    created(){
        this.getUserInfo();
    },
    methods:{
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
            requestUserinfo().then( res => {
                if( res.code === CODES.SUCCESS ){
                    this.$store.commit('UPDATE_USERINFO', res.body)
                } 
            })
        },

        // 跳转页面
        goPages(page, type){
            if(type){
                return
            }
            this.$router.push({
                name: page
            })
        }
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
    color: var(--text-color1);
    text-align: center;
    font-family: PingFang SC;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
}
.user-content{
    width: 100%;
    height: 48px;
    .flex-align-center-between;
    cursor: pointer;
    position: relative;
    .title, .placeholder{
        color: var(--text-color2);
        font-family: PingFang SC;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }
    .placeholder{
        font-size: 14px;
        margin-right: 20px;
    }
    .words{
        color: var(--text-color1);
        text-align: right;
        font-family: PingFang SC;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        margin-right: 20px;
    }
    .img{
        width: 32px;
        height: 32px;
        margin-right: 20px;
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
</style>