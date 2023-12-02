<template>
  <div>
    <HeaderTop @refresh="onRefresh"></HeaderTop>
    <Nav :title="$t('str_set_mibao')" text></Nav>
    <div class="set-myitbo paddingTop88">
        <div class="user-line"></div>
        <div class="user-lable">
            <span class="lable"> {{ $t('str_mibao_wenti') }}</span>
            <input 
                v-model="form.question" 
                class="input" 
                :placeholder="$t('str_set_mibao_input')" 
                type="text">
        </div>
        <div class="user-lable">
            <span class="lable">{{ $t('str_answer') }}</span>
            <input 
                v-model="form.answer" 
                class="input" 
                :placeholder="$t('str_answer_mibao_input')" 
                type="text">
        </div>
        <div class="user-btn-submit" @click="onClickRight">
            {{ $t('str_save') }} 
            <van-loading class="user-icon" type="spinner" v-show="showLoading" />
        </div>
    </div> 
  </div>
</template>
<script>
import { mapGetters } from "vuex"
import userMinxin from '~/plugins/mixins/user'
import commonMinxin from '~/plugins/mixins/common'
import CODES from "~/plugins/enums/codes"


export default {
    mixins: [userMinxin, commonMinxin],
    data(){
        return {
            form: {
                question: "",
                answer: "",
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
            if( this.showLoading || !(this.form.question && this.form.answer)  ){ // 避免接口慢重复提交
                return this.$toast(this.$t('toast15')) 
            }
            this.showLoading = true;
            requestUserquestion({
              question: this.form.question,
              answer: this.form.answer,
            }).then( res => {
                if(res.code === CODES.SUCCESS){
                    requestUserinfo().then( res => {
                        if( res.code === CODES.SUCCESS ){
                            this.$toast.success(this.$t('toast16'));
                            this.$store.commit('UPDATE_USERINFO', res.body)
                        } 
                    }).finally( res => {
                        this.onClickLeft();
                    })
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
<style src="~/static/less/user.less" lang="less scoped></style>