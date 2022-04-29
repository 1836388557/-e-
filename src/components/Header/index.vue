<template>
  <div class="text">
    {{ title }}
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    title: {
      type: String,
      default: '标题'
    }
  }
}
</script>

<style lang="scss" scoped>
.text {
  color:#a0a0e2;
  font-size: 15px;
  line-height: 50px;
  text-align: center;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  margin-bottom:10px;
}
</style>
