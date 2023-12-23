<template>
  <div class="tag">
    <HeaderTop @refresh="onRefresh"></HeaderTop>
    <Nav title="Content Removal" text></Nav>
    <div class="police">
      <div class="police-title">Content Removal Request</div>
      <div class="police-title-title">REPORT ABUSIVE OR ILLEGAL CONTENT</div>
      <div class="police-text-content-prev">
        DO NOT post material (whether visual, audio or written content) that*:
      </div>
      <div class="police-text-content-next">● Features, involves, or depicts a child.</div>
      <div class="police-text-content-next">● nottyhub takes all content removal requests seriously and our dedicated support team works around the clock to quickly process and remove content that violates our Terms of Service.</div>
      <div class="police-text-content-next">● Your report is completely confidential. When you report content, the user who posted the content will not see your name or any information about you.</div>
      <div class="police-text-content-next">● Please contact us nottyhub@support.com below should you be the victim of, or come across content that you have personal knowledge of as constituting:</div>
      <div class="police-text-content-next-next">● Non-consensual production and/or distribution of your image (including but not limited to such things as: revenge porn, blackmail, exploitation);</div>
      <div class="police-text-content-next-next">● Content that reveals personally identifiable information (including but not limited to such things as: name, address, phone number, IP address);</div>
      <div class="police-text-content-next-next">● Content that violates our Child Sexual Abuse Material Policy “CSAM”; OR</div>
      <div class="police-text-content-next-next">● Otherwise abusive and/or illegal content</div>
      <div class="police-text-content">You may not like everything you see on nottyhub. For content that you think is inappropriate or think may violate our Terms of Service.</div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import Nav from '@/components/nav'
import Thumb from '@/components/thumb'
import empty from '@/components/empty'
import tagLoad from "@/components/skeleton/tagLoad.vue"
import commonMinxin from '~/plugins/mixins/common'
import CODES from "~/plugins/enums/codes"


export default{
  name: 'policy-csam',
  mixins: [commonMinxin],
  data() {
    return {
      tagList: [],
      refreshing: false,
      spinnerLoading: false,
      loading: false,
      finished: false,
      pageInfo: {
        page: 1,
        size: 50,
        letter: ''
      },
      total: 0,
      tagIndex: 0,
      tags: [this.$t('str_menu_tag_all'), 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    }
  },
  components: {
    Nav,
    Thumb,
    empty,
    tagLoad
  },
  created(){
    this.initTagList('first')
  },
  methods: {
    ...mapActions(['set_tagid']),
    handleClickTag(item){
      gtag('event', 'gt4_click_tags', {
        id: item.id,
        name: item.name,
      });
      console.log(item)
      this.set_tagid(item.id)
      this.$router.push({
        name: 'type-id-name',
        params:{
          id: item.id,
          name: item.name,
          refresh: true,
        },
      });
    },
    handleClickTagName(item, index){
      this.tagIndex = index
      index != 0 ? (this.pageInfo.letter = item) : delete this.pageInfo.letter
      console.log(this.pageInfo.size, this.pageInfo.page, 'tagName')
      index !== 0 ? this.clickShow = true : this.clickShow = false // 为了防止切换tab时候，当一个有下拉加载时候不在第一页，然后切换tab时候，会同时触发刷新和下拉，当前是阻止只有在所有标签时候触发
      this.onRefresh()
    },
    onLoad(){
      if(this.clickShow) return this.loading = false
      console.log(this.pageInfo, 'onLoad')
      this.pageInfo.page += 1
      this.initTagList(); 
    },
    async initTagList(isRefresh = false){
      try {
        isRefresh === 'first'  && (this.spinnerLoading = true)
        !isRefresh  && (this.loading = true)
        const res = await this.$homeApi.postTagListPage(this.pageInfo)
        if(res.code === CODES.SUCCESS){
          this.total = res.data.meta.pagination.total
          if(isRefresh){
            this.tagList = res.data.data || []
            this.refreshing = false
          } else {
            this.tagList = [ ...this.tagList, ...res.data.data]
            this.loading = false
          }
          if(res.data.data.length === 0){
            this.finished = true
          } else {
            this.finished = false
          }
        }

      } catch (error) {

      } finally {
        this.spinnerLoading = false
        this.loading = false
        this.refreshing = false
      }
    },
    onRefresh() {
      this.pageInfo.page = 1
      this.initTagList(true)
    }
  }
}
</script>
<style lang="less" scoped>
.thumb{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 12px;
}
.tag-box{
  margin: 10px 12px;
  height: 44px;
  border-radius: 4px;
  background-color: var(--bg-color3);
  border: 1px solid var(--bg-color3);
  display: flex;
  flex-wrap: wrap;
  padding: 4px 8px;
  font-size: 12px;
  line-height: 16.8px;
  .tag-name{
    margin: 0 2px;
    line-height: 16.8px;
    text-decoration: underline;
    text-underline-offset: 3px;
  }
  .tag-color{
    color: var(--bg-primary);
  }
  .tag-line{
    text-decoration: none;
  }
}
.tag-item{
  width: 172px;
  height: 32px;
  border-radius: 4px;
  background-color: var(--bg-color2);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  font-size: 12px;
  color: var(--text-color2);
  text-align: center;
}
</style>