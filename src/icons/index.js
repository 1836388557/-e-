import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// 全局注册svg图标
Vue.component('svg-icon', SvgIcon)

// 通过正则匹配引入相应的文件模块(svg目录下)
const req = require.context('./svg', false, /\.svg$/)

const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
