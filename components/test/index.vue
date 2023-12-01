<template>
  <div style="display: flex">
    <van-checkbox :name="item.vodId"></van-checkbox>
  </div>
</template>
<script>
  export default{
    data() {
      return {
        result: []
      }
    },
    props: {
      item: {
        type: Object,
        required: true,
      }
    },
    // created(){
    //   this.obj = { ...this.item }
    // },
    methods: {
      
      handleToggle(item){
        console.log(item.vodCheck)
        const status = !!item.vodCheck ? false : true
        if(item.vodCheck){
          this.$set(item, 'vodCheck', true)
        }else{
          this.$set(item, 'vodCheck', false)
        }
       
      }
    },
    watch: {
      obj: {
        handler(newValue, oldValue) {
          console.log('bbb')
        },
        deep: true,
        immediate: true
      }
    }
  }
</script>