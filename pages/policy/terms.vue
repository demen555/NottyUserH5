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
      <div class="police-title">Enforcement</div>
      <div class="police-text-content">We have strict policies, operational mechanisms, and technologies in place to tackle and take swift action against CSAM. We also cooperate with law-enforcement investigations and promptly respond to valid legal requests received to assist in combating the dissemination of CSAM on our platform.
Our team of human moderators work around the clock to review all content uploaded to prevent any content which may be in violation of our CSAM or other policies, from appearing on our platform. Additionally, when we are alerted to an actual or potential instance of CSAM appearing on the platform, we remove and investigate the content and report any material identified as CSAM. As part of our ongoing efforts, we regularly audit our websites to update and expand our list of banned search words, titles, and tags, to ensure our community remains safe, inclusive, diverse, and free from abusive and illegal content.
In conjunction with our team of human moderators and regular audits of our platform, we also rely on innovative industry-standard technical tools to assist in identifying, reporting, and removing CSAM and other types of illegal content from our platform. We use automated detection technologies as added layers of protection to keep CSAM off our platform.
These technologies include:
Youtube’s CSAI Match, a tool that assists in identifying known child sex abuse videos;
Microsoft’s PhotoDNA, a tool that aids in detecting and removing known images of child sexual abuse;
Google's Content Safety API, a cutting-edge artificial intelligence (AI) tool that scores and prioritizes content based on the likelihood of illegal imagery to assist reviewers in detecting unknown CSAM.
Safer, Thorn's comprehensive CSAM detection tool utilized to keep platforms free of abusive material
MediaWise® service from Vobile ®, a state-of-the-art fingerprinting software and database, which scans all new user uploads to help prevent previously identified offending content from being re-uploaded.
Safeguard –our proprietary image fingerprinting and recognition technology designed with the purpose of combatting both child sexual abuse imagery and the distribution of non-consensual intimate images, and to help prevent the re-uploading of that content to our platform.
We also utilize age estimation capabilities to analyze content uploaded to our platform using a combination of internal proprietary software and Microsoft Azure Face API in an effort to strengthen the varying methods we use to prevent the upload and publication of potential or actual CSAM.
Together, these tools play a fundamental role in our shared fight against the dissemination of CSAM on our platform, as well as our mission to assist in collective industry efforts to eradicate the horrendous global crime that is online child sexual exploitation and abuse.
      </div>
      <div class="police-title">How can you help us?</div>
      <div class="police-text-content">If you believe you have come across CSAM, or any other content that otherwise violates our Terms of Service, we strongly encourage you to immediately alert us by flagging the content for our review.
If you are the victim or have first-hand knowledge that content violates our CSAM policy, please report the content to us by completing and submitting our Content Removal Request Form. Please include all relevant URL links to the content in question and we will address your request confidentially and remove the content expeditiously.
Anyone can report violations of this policy using our Content Removal Request Form, whether they have an account on our platform or not.</div>
      <div class="police-title">Consequences for violating this policy</div>
      <div class="police-text-content">We have a zero-tolerance policy towards any content that involves a child or constitutes child sexual abuse material. All child sexual abuse material that we identify or are made aware of results in the immediate removal of the content in question and the banning of its uploader. We report all cases of apparent CSAM to the National Center for Missing and Exploited Children.
Additional Resources and Support
If you believe a child is in imminent danger, you should reach out to your local law enforcement agency to report the situation immediately.
You may also choose to reach out to and report cases of child sexual exploitation or abuse material to any of the following resource organizations dedicated to eliminating and preventing child sexual exploitation. Reports can be made anonymously and are an integral part in protecting the safety of children.
International Association of Internet Hotlines
Canadian Centre for Child Protection
Internet Watch Foundation
We partner with multiple organizations whose work is dedicated to fighting child sexual exploitation around the world.</div>
      <div class="police-text-content">[1]The Five Country Ministerial is made up of the Homeland Security, Public Safety and Immigration Ministers of Australia, Canada, New Zealand, the United Kingdom, and the United States, who gather annually to collaborate on meeting common security challenges.</div>
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