<template>
    <div class="content-loader">
          <ContentLoader     
            height="138" 
            width="375" 
            viewBox="0 0 375 278"
            :speed="2"
            primaryColor="var(--bg-color2, rgba(255, 255, 255, 0.06))"
            secondaryColor="var(--bg-color3, rgba(255, 255, 255, 0.10))">
            <rect x="8" y="0" width="353" height="32" />
            <rect x="8" y="36" width="120" height="32" />
            <rect x="8" y="78"  width="50" height="50" />
            <rect x="98" y="78"  width="50" height="50" />
            <rect x="188" y="78"  width="50" height="50" />
            <rect x="278" y="78" width="50" height="50" />
        </ContentLoader>
    </div>
</template>
<script>
import { ContentLoader } from 'vue-content-loader'

export default {
  components: {
    ContentLoader,
  },
}
</script>
<style scoped>
.content-loader{
  width: 100%;
  height: 100%;
}
</style>