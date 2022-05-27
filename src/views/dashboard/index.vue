<template>
  <div class="dashboard-container">
    <div class="dashboard-editor-container">
      <el-row
        style="background: #fff; padding: 16px 16px 0; margin-bottom: 32px"
      >
        <div class="title">每日商品成交量</div>
        <line-chart :chart-data="lineChartData1" />
      </el-row>

      <el-row :gutter="32">
        <el-col :xs="24" :sm="24" :lg="8">
          <div class="chart-wrapper">
            <div class="title">商品发布</div>
            <pie-chart :chart-data="pieData.good" />
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="8">
          <div class="chart-wrapper">
            <div class="title">需求发布</div>
            <pie-chart :chart-data="pieData.demand" />
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="8">
          <div class="chart-wrapper">
            <div class="title">拼车发布</div>
            <pie-chart :chart-data="pieData.carpool" />
          </div>
        </el-col>
      </el-row>
      <el-row
        style="background: #fff; padding: 16px 16px 0; margin-bottom: 32px"
      >
        <div class="title">用户反馈数量</div>
        <line-chart :chart-data="lineChartData2" />
      </el-row>
      <el-row :gutter="32">
        <el-col :xs="24" :sm="24" :lg="8">
          <div class="chart-wrapper">
            <div class="title">活动发布</div>
            <pie-chart :chart-data="pieData.activity" />
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="8">
          <div class="chart-wrapper">
            <div class="title">兼职发布</div>
            <pie-chart :chart-data="pieData.parttime" />
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="8">
          <div class="chart-wrapper">
            <div class="title">认证发布</div>
            <pie-chart :chart-data="pieData.identity" />
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import LineChart from './components/LineChart'
import PieChart from './components/PieChart'

const Turnover = [12, 8, 9, 14, 12, 10, 15]
const FeedBack = [1, 4, 2, 3, 1, 5, 4]

const nowTurnover = []
const nowFeedBack = []
const date = new Date()
const week = date.getDay()
for (var i = 0; i < week; i++) {
  nowTurnover.push(Turnover[i])
  nowFeedBack.push(FeedBack[i])
}
console.log(nowTurnover)

const Pie = {
  good: [
    { value: 82, name: '通过' },
    { value: 15, name: '待审核' },
    { value: 5, name: '未通过' }
  ],
  demand: [
    { value: 64, name: '通过' },
    { value: 11, name: '待审核' },
    { value: 3, name: '未通过' }
  ],
  carpool: [
    { value: 32, name: '通过' },
    { value: 14, name: '待审核' },
    { value: 2, name: '未通过' }
  ], activity: [
    { value: 19, name: '通过' },
    { value: 5, name: '待审核' },
    { value: 1, name: '未通过' }
  ], parttime: [
    { value: 8, name: '通过' },
    { value: 2, name: '待审核' },
    { value: 1, name: '未通过' }
  ], identity: [
    { value: 11, name: '通过' },
    { value: 3, name: '待审核' },
    { value: 1, name: '未通过' }
  ]
}
export default {
  name: 'Dashboard',
  components: {
    LineChart,
    PieChart
  },
  data() {
    return {
      lineChartData1: nowTurnover,
      lineChartData2: nowFeedBack,
      pieData: Pie
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    background: white;
    background-size: 100% 100%;
    width: 100%;
    height: 100vh;
    box-sizing: border-box;
    padding: 10px;
  }
}

.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
.title {
  padding: 10px 0;
  text-align: center;
  color: #3888fa;
}
</style>
