<template>
  <div class="tags-vote">
      <div class="vote-btn">
          <span class="title"> {{ $t('str_tag_vote') }} </span>
          <span class="btn" @click="submitVote"> submit </span>
      </div>
      <div 
          class="vote-list"                     
          v-for="(row, i) in list" 
          :key="row.id">
          <div class="vote-up" @click="changTgasCheckUp(i)">
              <img class="icon" v-show="row.up == false" :src="themeChecked? require('~/static/images/tp_bq_up_1.svg'): require('~/static/images/tp_bq_up.svg')"  alt="tp_bq_up_1">
              <img class="icon" v-show="row.up == true" src="~/static/images/tp_bq_up_green.svg" alt="tp_bq_up_green">
          </div>
          <div class="vote-down" @click="changTgasCheckDown(i)">
              <img class="icon" v-show="row.down == false" :src="themeChecked? require('~/static/images/tp_bq_down_1.svg'): require('~/static/images/tp_bq_down.svg')"  alt="tp_bq_down_1">
              <img class="icon" v-show="row.down == true" src="~/static/images/tp_bq_down_red.svg" alt="tp_bq_down_red">
          </div>
          <span class="name">{{ row.name }}</span>
      </div>
      <div class="vote-btn vote-suggest">
          <span class="title">  {{ $t('str_tag_suggest') }} </span>
      </div>
      <!-- <div class="vote-err">
          Tags cannot be empty
      </div> -->
      <div class="vote-suc" v-show="suc">
          {{ $t('tag_suggest_success_tip') }}
      </div>
      <div class="suggest-list">
          <span class="item" v-for="item in addSug" :key="item"> {{ item }} </span>
      </div>
      <div class="suggest-input" @focusout="changeBlur" @focusin="changeFocus">
          <label for="content">
          <input
              enterkeyhint="send"
              v-model="content"
              @input="Suggest()"
              class="input"
              ref="inputRef"
              id="content"
              type="text">
          </label>
          <span class="btn" @click="addSuggest">{{ $t('str_add') }}</span>
          <div class="sugList-list" v-show="sugList.length">
              <span 
                  class="item"
                  @click="chooseSuggest(item.name)"
                  :key="item.id"
                  v-for="item in sugList">
                  {{ item.name }}
              </span>
          </div>
      </div>
      <div :class="['suggest-btn', { 'opacity-6': addSug.length == 0 }]" @click="submitSuggest">
          {{ $t('str_suggest') }} 
          <van-loading class="user-icon" type="spinner" v-show="onClick1" />
      </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import {  debounce } from '@/utils/format.js'
export default {
  props:["tagsList", "themeChecked"],
  
  data(){
      return{
          list: [],
          content: "",
          shouldHandleInput: true, // 标志位，用于判断是否在重新输入时触发输入事件

          // 联想列表
          sugList:[],
          // 提交建议列表
          addSug:[], 

          onClick1: false,

          suc: false,
          test: 0
      
      }
  },

  computed:{
      ...mapGetters([
          "userinfo",
      ])    
  },

  created(){
      this.init();
  },
  methods:{
      init(){
          this.list = [];
          this.tagsList.forEach(element => {
              this.list.push({
                  ...element,
                  checkUp: 0, // 0 未选中, 1 选中 
                  checkDown: 0,  // 0 未选中, 1 选中 
              })
          });
      },
      changeFocus(e){
        this.test = e.target.tagName
        let UA = window.navigator.userAgent.toLowerCase();
        if (UA.indexOf('iphone') > -1) {
            // 如果focus，则移除上一个输入框的timer
            if (e && e.target && e.target.tagName && e.target.tagName.toLowerCase() === 'input') { 
              this.test = 1 
              clearTimeout(this.timer);  
            } 
        }
      },
      changeBlur(e){
        let UA = window.navigator.userAgent.toLowerCase();
          if (UA.indexOf('iphone') > -1) {
            if (e && e.target && e.target.tagName && e.target.tagName.toLowerCase() === 'input') {  
            // 输入框失去焦点，要把IOS键盘推出页面的滚动部分还原。即将页面滚动到视窗顶部对齐  
              console.log('设置timer')  
              this.blurTimer = setTimeout(() => {  
                  this.test = 2
                  console.log('timer触发')  
                  window.scrollTo(0,0);  
              }, 0)  
          }  
          }
      },
      changTgasCheckUp(i){
          if( this.list[i].up ){
              this.$set(this.list[i], "up", false)
          }else{
              this.$set(this.list[i], "down", false)
              this.$set(this.list[i], "up", true)
          }
      },
      changTgasCheckDown(i){
          if( this.list[i].down ){
              this.$set(this.list[i], "down", false)
          }else{
              this.$set(this.list[i], "up", false)
              this.$set(this.list[i], "down", true)
          }
      },
      //  * @downIds  点赞tags
      //  * @upIds    点踩tags
      //  * @userId   用户id
      submitVote(){
        console.log('submit')
          let obj = {
              downIds:[],
              upIds:[],
              userId: this.userinfo.accessId,
          };
          this.list.forEach( ele => {
              if( ele.up ){
                  obj.upIds.push(String(ele.id))
              }
              if( ele.down ){
                  obj.downIds.push(String(ele.id))
              }
          });
          if( obj.downIds.length == 0 && obj.upIds.length == 0 ){
              return;
          };
          console.log("标签投票参数：", obj)
          videoApi.requestVideoTagOperation(JSON.stringify(obj)).then( res => {
              if( res.code == 100 ){
                  this.$toast(this.$t('str_suggest_suc'));
                  this.$emit('refresh')
                  // this.init();
              }
          })
      },

      // 关键字联想


      Suggest: debounce(function (e) {
          if( this.onClick || !this.content){
              return 
          }
          this.onClick = true;
          if( this.shouldHandleInput ){
              this.$videoApi.requestVideoTagSearch(JSON.stringify({
                  tag: this.content
              })).then(res => {
                  if( res.code == 100 ){
                      this.sugList = res.body.records
                  }
              }).finally( () => {
                  this.onClick = false;
              })
          }
          this.shouldHandleInput = true;
      }, 666),

      addSuggest(){
          if(this.content.match(/^[ ]*$/) || this.suc){
              return
          }
          this.addSug.push(this.content);
          this.addSug =  [...new Set(this.addSug)];
          this.content = "";
      },

      chooseSuggest(name){
          this.content = name;
          this.addSuggest();
          this.sugList = []
          // this.$refs.inputRef.focus()
      },

      submitSuggest(){
          if( this.onClick1 && this.addSug.length == 1 ){
              return 
          }
          this.onClick1 = true;
          console.log( "建议标签：", JSON.stringify({
              tags: this.addSug
          }) )
          this.$videoApi.requestVideoTagSuggest(JSON.stringify({
              tags: this.addSug,
              vodId: this.$route.params.id
          })).then(res => {
              if( res.code == 100 ){
                  this.content = "";
                  this.addSug = [];
                  this.sugList = [];
                  this.$toast(this.$t('str_suggest_suc'));
                  this.suc = true;
              }
          }).finally( () => {
              this.onClick1 = false;
          })
          
      },


  }
}
</script>
<style lang="less" scoped>

.tags-vote{
  padding: 0 12px;
}
.vote-btn{
  display: flex;
  align-items: center;
  justify-content: space-between;
  &.vote-suggest{
      margin-top: 16px;
  }
  .title{
      color: var(--text-color1, #FFFFFF);
      font-size: 16px;
  }
  .btn{
      color: var(--text-color2,  rgba(255, 255, 255, 0.70));
      font-size: 14px;
  }
}
.vote-list{
  display: flex;
  align-items: center;
  margin-top: 8px;
}
.vote-up, .vote-down{
  width: 24px;
  height: 24px;
  .icon{
      width: 100%;
      height: 100%;
  }
}

.name{
  color: var(--text-color2,  rgba(255, 255, 255, 0.70));
  font-size: 14px;
  margin-left: 8px;
}

.suggest-input{

  width: 100%;
  height: 40px;
  border: 1px solid var(--border-line, rgba(245, 245, 247, 0.06));
  background: var(--bg-color2, rgba(255, 255, 255, 0.06));

  border-radius: 8px;
  background: var(--bg-color2, rgba(255, 255, 255, 0.06));
  margin-top: 8px;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 9;
  .input{
      flex: 1;
      background: transparent;
      border: none;
      font-size: 14px;
      &::placeholder{
          color: var(--text-color4, rgba(255, 255, 255, 0.20));
          font-size: 14px;
          font-style: normal;
          line-height: normal;
      }
  }
  .btn{
      padding: 3px 12px;

      flex-shrink: 0;
      border-radius: 4px;
      border: 1px solid var(--bg-primary, #FFE500);
  
      background: rgba(255, 85, 2, 0.10);
      color: var(--ff-5502, #FFE500);
      text-align: center;

      font-size: 12px;

  }

  .sugList-list{
      position: absolute;
      width: 100%;
      top: 39px;
      left: 0;
      border-radius: 8px;
      overflow: hidden;
      background-color: var(--bg-color1, #0E0E0F);
      .item{
          display: block;
          width: 100%;
          height: 40px;
          padding: 0 12px;
          line-height: 40px;
          background-color: var(--bg-color2, rgba(255, 255, 255, 0.06));
      }
  }
}
.suggest-btn{
  width: 164px;
  height: 40px;
  border-radius: 40px;
  margin: 16px auto;
  text-align: center;
  line-height: 40px;
  background-color: var(--bg-primary, #FFE500);
  color: #FFF;
  font-size: 16px;

  display: flex;
  align-content: center;
  justify-content: center;

  /deep/.van-loading__spinner{
      width: 12px;
      height: 12px;
      margin-left: 4px;
  }
}
.vote-err{
  color: var(--bg-primary, #FFE500);
  margin-top: 8px;
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.vote-suc{
  color: #36AB57;
  margin-top: 8px;
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.suggest-list{
  display: flex;
  align-items:center;
  flex-wrap: wrap;
  margin-top: 8px;
  margin-right: 4px;
  .item{
      border-radius: 4px;
      background: rgba(255, 255, 255, 0.10);
      padding: 4px 8px;
      font-size: 12px;
      color: var(--text-color2,  rgba(255, 255, 255, 0.70));
      margin-right: 4px;
  }
}
.opacity-6{
  opacity: 0.6;
}

</style>