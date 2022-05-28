<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
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
      default: '300px'
    },
    chartData: {
      type: Object,
      required: true
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
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    },
    setOptions(data) {
      this.chart.setOption({
        backgroundColor: '#394056',
        title: {
          top: 20,
          text: data.name,
          textStyle: {
            fontWeight: 'normal',
            fontSize: 16,
            color: '#F1F1F3'
          },
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        color: [' #1890ff', '#ffba00', ' #ff4949'],
        legend: {
          left: 'center',
          bottom: '10',
          data: ['通过', '待审核', '未通过'],
          textStyle: {
            color: '#fff'
          }
        },
        series: [
          {
            name: '总发布',
            type: 'pie',
            radius: '50%',
            data: data.data,
            animationEasing: 'cubicInOut',
            animationDuration: 2600,
            emphasis: {
              itemStyle: {
                shadowBlur: 40,
                shadowOffsetX: 0,
                shadowColor: 'rgba(24,144,255, 0.8)'
              }
            },
            itemStyle: {
              normal: {
                // 饼状图阴影，值越⼤阴影亮度越⾼
                shadowBlur: 60,
                shadowColor: 'rgba(24,144,255, 0.8)'
              }
            }
          }
        ]
      })
    }
  }
}
</script>
