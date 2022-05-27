
<template>
  <div class="container">
    <helloWorld />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'Earth',
  components: {
    HelloWorld
  },
  data() {
    return {}
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
.container {
  background: white;
  background-size: 100% 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
}
</style>
