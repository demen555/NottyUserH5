import { mapGetters } from "vuex"
import cardLoad from "~/components/skeleton/cardLoad.vue"
import fBottom from '~/components/footer/bottom.vue'
import vPagination from '~/components/pagination/index.vue'
// import HeaderTop from '~/components/header/top.vue'
export default{
  data() {
    return {
      lastScrollTop: 0,
      isStickyVisible: true,
      isDetailStickyVisible: false
    }
  },
  mounted() {
    if(process.client){
      window.addEventListener('scroll', this.handleScrollShow);
    }
  },
  destroyed () {
    // 必须移除监听器，不然当该vue组件被销毁了，监听器还在就会出错
    if(process.client){
      window.removeEventListener('scroll', this.handleScrollShow);
    }
  },
  methods: {
    handleScrollShow() {
      // 获取滚动条滚动的距离
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      // console.log(scrollTop, '666')
      // console.log(scrollTop, 'scrollTop')
      var scroll = scrollTop - this.lastScrollTop;
      
      // 判断是否需要隐藏 sticky
      if(scroll < 0){
          // console.log(scroll,this.lastScrollTop, scrollTop,'up')
          //添加你想要的事件
        if (Math.abs(scroll) >= 20) {
          this.isStickyVisible = true;
          this.isDetailStickyVisible = false
        }
        if (Math.abs(scroll) >= 300) {
          this.isDetailStickyVisible = false
        }
      }else{
        // console.log(scroll, scrollTop, 'down')
        //添加你想要的事件
        if (scrollTop >= 150) {
          this.isStickyVisible = false;
        }
        if (scrollTop >= 2100) {
          this.isDetailStickyVisible = true;
        }
      }
      this.lastScrollTop = scrollTop;
      // if (scrollTop >= 150) {
      //   console.log('111')
      //   this.isStickyVisible = false;
      // } else {
      //   console.log('222')
      //   this.isStickyVisible = true;
      // }
      // this.lastScrollTop = scrollTop;
    },
    handleScroll() {
      window.scrollTo(0, 0)
    },
    handlePage(val){
      // this.pageInfo.page = val
      // if(this.getList){
      //   this.getList()
      // }
      // this.handleScroll()
      console.log(val, 'page')
    }, 
  },
  watch: {
    ['pageInfo.page'](val){
      console.log(val, 'watch')
      this.pageInfo.page = val
      // this.getList();
      this.handleScroll()
    }
  },
  components: {
    cardLoad,
    fBottom,
    vPagination
    // HeaderTop
  },  
  computed: {
    ...mapGetters(['theme']),
    themeChecked(){
      return this.theme === 'dark'
    }
  }
}