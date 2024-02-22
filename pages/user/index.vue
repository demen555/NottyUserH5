<template>
  <div>
    <HeaderTop @refresh="onRefresh"></HeaderTop>
    <div class="user container-fluid">   
        <NavNew class="d-md-none" :title="$t('str_user_center')"></NavNew>
        <h1 class="d-none d-md-block user-title" > {{ $t('str_user_center') }} </h1>
        <div class="user-info row">
            <div class="user-content avatar d-md-none">
                <span class="title">{{ $t('str_header') }}</span>
                <van-uploader :before-read="beforeRead">
                    <div class="img-icon">
                        <img class="img" v-if="userinfo.userPortrait" :src="userinfo.userPortrait" alt="avatar">
                        <img class="img" v-else src="~/static/images/home_top_mrtx_1.svg" alt="avatar">
                        <i :class="themeChecked?'icon': 'icon-white'"></i>
                    </div>
                </van-uploader>
            </div>

            <div class="user-avatar d-none d-md-flex ">
                <van-uploader :before-read="beforeRead">
                    <div class="img-icon">
                        <img class="img" v-if="userinfo.userPortrait" :src="userinfo.userPortrait" alt="avatar">
                        <img class="img" v-else src="~/static/images/home_top_mrtx_1.svg" alt="avatar">
                        <i :class="themeChecked?'icon': 'icon-white'"></i>
                    </div>
                </van-uploader>
                <div class="user-name">
                    <span> {{ userinfo.userName }} </span>
                    <span> {{ userinfo.userEmail }} </span>
                </div>
            </div>

            <div class="user-content account col-sm-12 col-md-4 col-lg-4 col-xl-4"> 
                <span class="title">{{ $t('str_user_account') }}</span>
                <span class="words">{{ userinfo.userName }}</span>
            </div>
            <div class="user-content time col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <span class="title">{{ $t('str_register_time') }} </span>
                <span class="words">{{ formatTime(userinfo.userRegTime) }}</span>
            </div>

            <div class="user-content pwdChange col-sm-12 col-md-4 col-lg-4 col-xl-4" @click="goPages('user-pwdChange')">
                <span class="title"> {{ $t('str_change_pwd') }} </span>
                <span class="words"> ****** </span>
                <i class="words" :class="themeChecked?'icon': 'icon-white'"></i>
            </div>

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
                    console.log( {...this.userinfo, ...res.data}, "set_userinfo" )
                   this.set_userinfo({...this.userinfo, ...res.data}); 
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
                    this.set_userinfo({...this.userinfo, ...user });     
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
        border-radius: 32px;
        object-fit: cover;
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
@media (min-width: 1024px) {
    .user{
        margin: 96px auto 0;
        overflow: hidden;
        .user-title{
            margin: 24px 0;
        }
        .user-info{
            width: 1000px;
            height: 185px;
            border-radius: 24px;
            background: rgba(255, 255, 255, 0.06);
            margin: 0 auto;
            padding: 24px;
        }
        .user-content{
            &.col-sm-4, &.col-md-4, &.col-lg-4, &.col-xl-4{
                flex-direction: column;
                align-items: inherit;
                // justify-content: inherit;
                .words{
                    text-align: left;
                }
            }
        }
        .user-avatar{
            width: 100%;
            height: 56px;
            display: flex;
            align-items: center;
            .img-icon{
                width: 56px;
                height: 56px;
                padding-right: 0;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .user-name{
                display: flex;
                flex-direction: column;
                margin-left: 8px;
                span{
                    margin: 4px 0;
                    font-size: 16px;
                    &:nth-child(2){
                        color: rgba(255, 255, 255, 0.7);
                    }
                }
            }
        }
    }
}
</style>