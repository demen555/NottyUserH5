<template>
  <nav>
    <ul class="pagination">
      <div :class="{ 'disabled': current == 1 }"><a href="javascript:;" @click="setCurrent(1)"> <img :src="require('~/static/images/com_zuo_fysy.svg')"> </a></div>
      <div :class="{ 'disabled': current == 1 }">
        <a class="pagination__prev" href="javascript:;" @click="setCurrent(current - 1)"><img :src="require('~/static/images/com_jt_sx_zuo_fy.svg')"></a>
      </div>
      <div v-for="p in grouplist" :class="{ 'active': current == p.val }">
        <a @click="setCurrent(p.val)">{{ p.text }}</a>
      </div>
      <div :class="{ 'disabled': current == page }"><a class="pagination__next" href="javascript:;" @click="setCurrent(current + 1)"><img :src="require('~/static/images/com_jt_sx_you_fy.svg')" alt=""> </a></div>
      <div :class="{ 'disabled': current == page }"><a href="javascript:;" @click="setCurrent(page)">   <img :src="require('~/static/images/com_you_fywy.svg')"> </a></div>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      current: this.currentPage
    }
  },
  props: {
    total: {// 数据总条数
      type: Number,
      default: 0
    },
    display: {// 每页显示条数
      type: Number,
      default: 60
    },
    currentPage: {// 当前页码
      type: Number,
      default: 1
    },
    pagegroup: {// 分页条数
      type: Number,
      default: 5,
      coerce: function (v) {
        v = v > 0 ? v : 5;
        return v % 2 === 1 ? v : v + 1;
      }
    }
  },
  computed: {
    page: function () { // 总页数
      return Math.ceil(this.total / this.display);
    },
    grouplist: function () { // 获取分页页码
      var len = this.page, temp = [], list = [], count = Math.floor(this.pagegroup / 2), center = this.current;
      console.log(len, temp, count, center, this.current > this.page - 4, 'init')
      console.log(this.pagegroup, 'pagegroup')
      if (len <= this.pagegroup) {
        while (len--) {
          temp.push({ text: this.page - len, val: this.page - len });
        }
        ;
        return temp;
      }
      while (len--) {
        temp.push(this.page - len);
      }
      ;
      var idx = temp.indexOf(center);
      (idx < count) && (center = center + count - idx);
      (this.current > this.page - count) && (center = this.page - count);
      temp = temp.splice(center - count - 1, this.pagegroup);
      do {
        var t = temp.shift();
        list.push({
          text: t,
          val: t
        });
      } while (temp.length);
      console.log(this.current, count + 1, this.page - count, '666')
      if (this.page > this.pagegroup) {
        (this.current >= this.page - count) && list.unshift({ text: '...', val: list[0].val - 1 });
        (this.current < this.page - count) && list.push({ text: '...', val: list[list.length - 1].val + 1 });
      }
      console.log(list, 'list')
      return list;
    }
  },
  methods: {
    setCurrent: function (idx) {
      console.log(idx, 'idx')
      if (this.current != idx && idx > 0 && idx < this.page + 1) {
        this.current = idx;
        this.$emit('pagechange', this.current);
      }
    }
  }
}
</script>

<style lang="less">
.pagination {
  // width: 400px;
  overflow: hidden;
  margin: 0 auto;
  width: 100%;
  height: 24px;

  div {
    float: left;
    height: 24px;
    border-radius: 4px;
    margin: 3px;
    color: #666;
    background: var(--bg-color3, rgba(255, 255, 255, 0.10));
    a {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 27px;
      height: 24px;
      color: #fff;
      font-size: 12px;
      border-radius: 4px;
    }
  }

  .active {
    border: 1px solid var(--bg-primary, #F6D658);
    background-color: var(--bg-color1, #0E0E0F);

    a {
      color: #fff;
    }

  }
}
.pagination__next, .pagination__prev{
  background-color: var(--bg-primary, #F6D658);
  color: #181e2a !important;
}
.disabled{
  cursor: default;
  opacity: 0.6;
}
</style>