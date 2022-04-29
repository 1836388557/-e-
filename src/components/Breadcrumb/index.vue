<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <!-- 没有重定向就不点击跳转 或者是仪表盘（首页，最后一项-->
        <span
          v-if="item.redirect === 'noRedirect' || index == levelList.length - 1"
          class="no-redirect"
        >{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
// 面包屑 显示路由
import pathToRegexp from 'path-to-regexp'

export default {
  data() {
    return {
      levelList: null // 数组第一个是仪表盘
    }
  },
  watch: {
    // 监听路由变化
    $route() {
      this.getBreadcrumb()
    }
  },
  created() {
    // 创建便获取面包屑信息
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      // 仅展示路由标题
      let matched = this.$route.matched.filter(
        (item) => item.meta && item.meta.title
      )

      // console.log('matched:', matched)

      const first = matched[0]

      //  如果不是 首页（仪表盘）
      if (!this.isDashboard(first)) {
        // 加上首页的路由信息
        matched = [{ path: '/dashboard', meta: { title: '首页' }}].concat(
          matched
        )
      }

      this.levelList = matched.filter((item) => item.meta && item.meta.title && item.meta.breadcrumb !== false)
      // console.log('levelList:', this.levelList)
    },
    // 判断是不是首页（仪表盘）
    isDashboard(route) {
      // console.log('route:', route)
      const name = route && route.name
      if (!name) {
        return false
      }
      return (
        name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
      )
    },
    pathCompile(path) {
      // console.log('this.$route:', this.$route)
      const { params } = this.$route
      var toPath = pathToRegexp.compile(path)
      return toPath(params)
    },
    // 处理路由点击
    handleLink(item) {
      const { redirect, path } = item
      // 如果存在重定向 直接重定向
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      // 不存在重定向的处理 嵌套
      this.$router.push(this.pathCompile(path))
    }
  }
}
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
