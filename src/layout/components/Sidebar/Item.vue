<script>
export default {
  name: 'MenuItem',
  functional: true, // 表示为函数式组件
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render(h, context) {
    const { icon, title } = context.props
    const vnodes = []

    if (icon) {
      if (icon.includes('el-icon')) {
        // 如果icon存在el-icon属性  结点添加i标签
        vnodes.push(<i class={[icon, 'sub-el-icon']} />)
      } else {
        // 否则添加svg标签
        vnodes.push(<svg-icon icon-class={icon}/>)
      }
    }

    // 如果存在标题 结点添加标题标签
    if (title) {
      vnodes.push(<span slot='title'>{(title)}</span>)
    }
    return vnodes
  }
}
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
