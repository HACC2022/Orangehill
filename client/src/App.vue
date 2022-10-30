<template>
  <URLCompressor/>
</template>

<script>
import URLCompressor from './components/Compressor.vue'

export default {
  name: 'main_app',
  components: {
    URLCompressor
  }
}
</script>

<style>
#app {
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000000;
}
body {
  margin: 0;
}
</style>
