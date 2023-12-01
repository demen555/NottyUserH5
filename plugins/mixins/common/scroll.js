export default{
  data() {
    return {
      navOffsetTop: 0
    }
  },
  mounted () {
    // 监听滚动事件
    window.addEventListener('scroll', this.fiexdNav)
    this.initOffsetTop()
  },
  destroyed () {
    // 必须移除监听器，不然当该vue组件被销毁了，监听器还在就会出错
    window.removeEventListener('scroll', this.fiexdNav)
  },
  methods: {
    /** 设置导航条nav到达页面顶部时固定 **/
    // 1.获取导航条nav的offsetTop值，存储在data中（注：之所以不放在滚动事件中，是为了以防添加固定样式后offsetTop值为零,导致页面需要滚动到最上面才可以回到原位）
    initOffsetTop () {
      this.navOffsetTop = document.querySelector('#search').offsetTop
    },
    fiexdNav () {
      // 2.获取当前页面的卷曲高度
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      const nav = document.querySelector('#search')
      // 3.判断卷曲高度是否大于等于导航条的offsetTop值
      if (scrollTop > this.navOffsetTop) {
        //   3.1若满足，则给nav导航添加固定样式
        nav.classList.add('fixedNav')
      } else {
        //   3.2若不满足，则删除nav导航的固定样式
        nav.classList.remove('fixedNav')
      }

      /** 当滚动到一定区域时给导航项添加选中样式 **/
      //  1.获取所有锚点元素
      const contents = document.querySelectorAll('.about-content>div')
      // 2.获取锚点元素的offsetTop值，并收集在一个数组
      const contentsOffsetTop = []
      contents.forEach(item => {
        contentsOffsetTop.push(item.offsetTop)
      })
      // 3.获取页面高度
      const pageHeight = window.innerHeight
      // 4.获取nav的子元素
      const navChildren = document.querySelectorAll('.nav li')
      // 5.遍历锚点元素的offsetTop值
      for (let i = 0; i < contentsOffsetTop.length; i++) {
        // 5.1 设置第一项导航默认为选中状态
        if (i === 0) {
          navChildren[0].classList.add('active')
        } else if (scrollTop > contentsOffsetTop[i - 1] + pageHeight / 3) {
          // 排他思想
          for (let j = 0; j < contentsOffsetTop.length; j++) {
            navChildren[j].classList.remove('active')
            navChildren[i].classList.add('active')
          }
        } else {
          navChildren[i].classList.remove('active')
        }
      }
    },
    /**
     *设置点击导航跳转到指定选择器对应的锚点元素
     * @param {*} selector
     **/
    skipTo (selector) {
      const navHeight = document.querySelector('#search').offsetHeight
      // scrollIntoView() js原生方法，实现锚点滚动过渡
      const target = document.querySelector(selector)
      target.scrollIntoView({ behavior: 'smooth' })
      // scrollTo() 把内容滚动到指定的坐标。减去导航高度的目的：导航用定位固定在顶部，如果不减去，导航栏会遮挡一部分内容
      window.scrollTo(0, target.offsetTop - navHeight)
    }
  }
}