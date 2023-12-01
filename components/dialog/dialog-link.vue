<template>
    <van-popup v-model="show">
        <div class="dialog">
            <div class="dialog-top">
                <div></div>
                <div class="dialog-title">{{ $t('str_rec_share') }}</div>
                <div class="dialog-close" @click="show = false"><img :src="themeChecked ? require('~/static/images/home_top_guanbi_1.svg'): require('~/static/images/home_top_guanbi.svg')"></div>
            </div>
            <div class="dialog-content" @click="copy(linkStr)">
                <h1 class="title">{{ $t('str_rec_browser_link') }}</h1>
                <p class="words" >{{ linkStr }}</p>
                <img class="copy" :src="themeChecked ? require('~/static/images/com_fuzhi_1.svg'): require('~/static/images/com_fuzhi.svg')">
            </div>
        </div>
    </van-popup>
</template>
<script>
import commonMinxin from '~/plugins/mixins/common'
export default {
    mixins: [commonMinxin],
    data(){
        return {
            show: false,
        }
    },
    props: {
        linkStr: {
            type: String,
            default: () => ""
        },
    },
    methods:{
        onShow(){
            this.show = true
        },
        copy(e){
            this.$copyText(e).then(() => {
                this.$toast.success(this.$t('toast3'));
                this.show = false;
            }, () => { 
                this.show = false
            })
        }
    }
}
</script>
<style lang="less" scoped>
.van-popup {
    background-color: transparent;
}
.dialog {
    background-color: var(--dialog-bg-color);
    border-radius: 16px;
    width: 343px;
    padding: 16px;
}
.dialog-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.dialog-title {
    font-size: 16px;
    font-weight: 500;
}

.dialog-content{
    margin-top: 24px;
    width: 100%;
    height: 68px;
    border-radius: 8px;
    background: var(--bg-color2);
    padding: 12px;
    position: relative;
    .title{
        color: var(--text-color2);
        font-family: PingFang SC;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }

    .words{
        width: 223px;
        color: var(---text-color1);
        font-family: PingFang SC;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        margin-top: 8px;
        overflow: hidden;
        /*文本不会换行*/
        white-space: nowrap;
        /*当文本溢出包含元素时，以省略号表示超出的文本*/
        text-overflow: ellipsis;
    }

    .copy{
        width: 16px;
        height: 16px;
        position: absolute;
        right: 12px;
        bottom: 12px;
    }
}
</style>