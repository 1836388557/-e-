<template>
  <div id="main" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import * as echarts from 'echarts'
import 'echarts-gl'

import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '90vh'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      // console.log(this.$el)
      var chartDom = document.getElementById('main')
      this.chart = echarts.init(chartDom)
      this.setOptions()
    },
    setOptions() {
      this.chart.setOption({
        backgroundColor: '#000',
        globe: {
          baseTexture: '/images/world.topo.bathy.200401.jpg',
          heightTexture: '/images/world.topo.bathy.200401.jpg',
          displacementScale: 0.04,
          shading: 'realistic',
          environment: '/images/starfield.jpg',
          realisticMaterial: {
            roughness: 0.9
          },
          postEffect: {
            enable: true
          },
          light: {
            main: {
              intensity: 5,
              shadow: true
            },
            ambientCubemap: {
              texture: '/images/pisa.hdr',
              diffuseIntensity: 3
            }
          }
        }
      })
    }
  }
}
</script>
