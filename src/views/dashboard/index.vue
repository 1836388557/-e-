<template>
  <div class="dashboard-container">
    <div class="dashboard-text">欢迎
      <span style="color:#007aff;">{{ name }}</span>
      来到管理后台
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {

  name: 'Index',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    background:url(../../assets/images/indexMbg.jpg);
    background-size:100% 100%;
    width:100%;
    height:100vh;
    box-sizing: border-box;
    padding:10px;
    @media screen and (min-width: 1200PX) {
      background:url(../../assets/images/indexBg.jpg);
      font-size: 30PX;
      line-height: 64PX;
    }
  }
  &-text {
    color:white;
    line-height: 46px;
    text-align:center;
    margin-top:200px;
  }
}

</style>
