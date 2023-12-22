<template>
    <div class="content-loader">
        <ContentLoader   
            height="160" 
            width="375"   
            viewBox="0 0 185 160"
            :speed="2"
            primaryColor="var(--bg-color2, rgba(255, 255, 255, 0.06))"
            secondaryColor="var(--bg-color3, rgba(255, 255, 255, 0.10))">
            <rect x="0" y="0" rx="3" ry="3" width="185" height="109" />
            <rect x="0" y="119" rx="3" ry="3" width="185" height="30" />
            <rect x="195" y="0" rx="3" ry="3" width="185" height="109" />
            <rect x="195" y="119" rx="3" ry="3" width="185" height="30" />
        </ContentLoader>
        <ContentLoader   
            height="160" 
            width="375"   
            viewBox="0 0 185 160"
            :speed="2"
            primaryColor="var(--bg-color2, rgba(255, 255, 255, 0.06))"
            secondaryColor="var(--bg-color3, rgba(255, 255, 255, 0.10))">
            <rect x="0" y="0" rx="3" ry="3" width="185" height="109" />
            <rect x="0" y="119" rx="3" ry="3" width="185" height="30" />
            <rect x="195" y="0" rx="3" ry="3" width="185" height="109" />
            <rect x="195" y="119" rx="3" ry="3" width="185" height="30" />
        </ContentLoader>
        <ContentLoader   
            height="160" 
            width="375"   
            viewBox="0 0 185 160"
            :speed="2"
            primaryColor="var(--bg-color2, rgba(255, 255, 255, 0.06))"
            secondaryColor="var(--bg-color3, rgba(255, 255, 255, 0.10))">
            <rect x="0" y="0" rx="3" ry="3" width="185" height="109" />
            <rect x="0" y="119" rx="3" ry="3" width="185" height="30" />
            <rect x="195" y="0" rx="3" ry="3" width="185" height="109" />
            <rect x="195" y="119" rx="3" ry="3" width="185" height="30" />
        </ContentLoader>
        <ContentLoader   
            height="160" 
            width="375"   
            viewBox="0 0 185 160"
            :speed="2"
            primaryColor="var(--bg-color2, rgba(255, 255, 255, 0.06))"
            secondaryColor="var(--bg-color3, rgba(255, 255, 255, 0.10))">
            <rect x="0" y="0" rx="3" ry="3" width="185" height="109" />
            <rect x="0" y="119" rx="3" ry="3" width="185" height="30" />
            <rect x="195" y="0" rx="3" ry="3" width="185" height="109" />
            <rect x="195" y="119" rx="3" ry="3" width="185" height="30" />
        </ContentLoader>
        <ContentLoader   
            height="160" 
            width="375"   
            viewBox="0 0 185 160"
            :speed="2"
            primaryColor="var(--bg-color2, rgba(255, 255, 255, 0.06))"
            secondaryColor="var(--bg-color3, rgba(255, 255, 255, 0.10))">
            <rect x="0" y="0" rx="3" ry="3" width="185" height="109" />
            <rect x="0" y="119" rx="3" ry="3" width="185" height="30" />
            <rect x="195" y="0" rx="3" ry="3" width="185" height="109" />
            <rect x="195" y="119" rx="3" ry="3" width="185" height="30" />
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