import { mapGetters } from "vuex"
import cardLoad from "@/components/skeleton/cardLoad.vue"
// import HeaderTop from '@/components/header/top.vue'
export default{
  data() {
    return {
      
    }
  },
  components: {
    cardLoad,
    // HeaderTop
  },  
  computed: {
    ...mapGetters(['theme']),
    themeChecked(){
      return this.theme === 'dark'
    }
  }
}