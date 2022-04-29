<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <!-- 菜单子项 -->
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss' // 菜单样式

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      // console.log('this.$router.options.routes', this.$router.options.routes)
      return this.$router.options.routes
    },
    // 默认选中路径高亮
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // 如果存在路径，侧边栏选中路径设置高亮
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    // 是否展示logo
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    // 菜单样式
    variables() {
      return variables
    },
    // 侧边栏是否打开
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
