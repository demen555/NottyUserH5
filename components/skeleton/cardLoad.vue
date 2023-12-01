<template>
<div class="content-loader">
  <ContentLoader     
    height="285" 
    width="375" 
    viewBox="0 0 375 278"
    :speed="2"
    primaryColor="var(--bg-color2)"
    secondaryColor="var(--bg-color3)">
    <rect x="0" y="0" width="100%" height="210" />
    <rect x="8" y="218" width="351" height="34" />
    <rect x="8" y="260" width="150" height="18" />
  </ContentLoader>

  <ContentLoader     
    height="285" 
    width="375" 
    viewBox="0 0 375 278"
    :speed="2"
    primaryColor="var(--bg-color2)"
    secondaryColor="var(--bg-color3)">
    <rect x="0" y="0" width="100%" height="210" />
    <rect x="8" y="218" width="351" height="34" />
    <rect x="8" y="260" width="150" height="18" />
  </ContentLoader>

  <ContentLoader     
    height="285" 
    width="375" 
    viewBox="0 0 375 278"
    :speed="2"
    primaryColor="var(--bg-color2)"
    secondaryColor="var(--bg-color3)">
    <rect x="0" y="0" width="100%" height="210" />
    <rect x="8" y="218" width="351" height="34" />
    <rect x="8" y="260" width="150" height="18" />
  </ContentLoader>

  <ContentLoader     
    height="285" 
    width="375" 
    viewBox="0 0 375 278"
    :speed="2"
    primaryColor="var(--bg-color2)"
    secondaryColor="var(--bg-color3)">
    <rect x="0" y="0" width="100%" height="210" />
    <rect x="8" y="218" width="351" height="34" />
    <rect x="8" y="260" width="150" height="18" />
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
  overflow: hidden;
}
</style>