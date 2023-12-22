<template>
  <div class="tag">
    <HeaderTop @refresh="onRefresh"></HeaderTop>
    <Nav title="CSAM Policy" text></Nav>
    <div class="police">
      <div class="police-title">Child Sexual Abuse Material Policy</div>
      <div class="police-title-text">August 2022</div>
      <div class="police-text-content">We have a zero-tolerance policy towards any material that sexualizes, sexually exploits, or endangers children on our platform. If we find or are made aware of it, we will report it.
Nottyhub is deeply committed to fighting the spread of child sexual abuse material (CSAM). This includes media, text, illustrated, or computer-generated images. We view it as our responsibility to ensure our platform is not used for sharing or consuming CSAM, and to deter users from searching for it.
Any content featuring or depicting a child (real, fictional, or animated) or promoting child sexual exploitation is strictly forbidden on our platform and is a severe violation of our Terms of Service. Written content (including, but not limited to, comments, content titles, content descriptions, messages, usernames, or profile descriptions) that promotes, references, or alludes to the sexual exploitation or abuse of a child is also strictly prohibited.
Additionally, at Nottyhub we endorse and stand behind the objectives of the Voluntary Principles to Counter Online Child Sexual Exploitation and Abuse; a collaborative initiative launched by the Five Country Ministerial (5 Eyes)[1] and backed by industry-leading tech companies to combat online child sexual exploitation and abuse. While some bad actors seek to exploit advances in technology and the digital world, we believe robust, efficient, and flexible policies, as well as participating in and supporting global cross-sector collaboration, can effectively eradicate the spread of online abuse.
If you encounter child sexual abuse material on Nottyhub, please report it to us via our Content Removal Request Form. For information on how to report Child Sexual Abuse Material please refer to the Additional Resources and Support section below.
Anyone can report potential violations of this policy.
For more information on how to report content, see the section titled “How Can you help us”.
All complaints and reports to Nottyhub are kept confidential and are reviewed by human moderators who work swiftly to handle the content appropriately. If you believe a child is in imminent danger, please also alert your local law enforcement authorities immediately.
      </div>
      <div class="police-title">Guidelines</div>
      <div class="police-text-content">DO NOT post material (whether visual, audio or written content) that*:
Features, involves, or depicts a child.
Sexualizes a child. This includes content that features, involves, or depicts a child (including any illustrated, computer-generated, or other forms of realistic depictions of a human child) engaged in sexually explicit conduct or engaged in sexually suggestive acts.</div>
      <div class="police-text-content">* This serves as an indicative list and does not constitute an exhaustive list. For a more detailed description, please review our Terms of Service, under the section entitled, “Prohibited Uses”. Nottyhub reserves the right at all times to determine whether content is appropriate and in compliance with our Terms of Service, and may, without prior notice and in its sole discretion, remove content at any time.</div>
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