<template>
  <div class="dashboard-container">
    <div class="dashboard-editor-container">
      <el-row
        style="background: #fff; margin-bottom: 32px"
      >
        <!-- <div class="title">每日商品成交量</div> -->
        <line-chart :chart-data="lineChartData1" />
      </el-row>

      <el-row :gutter="32">
        <el-col :xs="24" :sm="24" :lg="8">
          <div class="chart-wrapper">

            <pie-chart :chart-data="pieData.good" />
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="8">
          <div class="chart-wrapper">

            <pie-chart :chart-data="pieData.demand" />
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="8">
          <div class="chart-wrapper">

            <pie-chart :chart-data="pieData.carpool" />
          </div>
        </el-col>
      </el-row>
      <el-row
        style="background: #fff; margin-bottom: 32px"
      >
        <!-- <div class="title">用户反馈数量</div> -->
        <line-chart :chart-data="lineChartData2" />
      </el-row>
      <el-row :gutter="32">
        <el-col :xs="24" :sm="24" :lg="8">
          <div class="chart-wrapper">

            <pie-chart :chart-data="pieData.activity" />
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="8">
          <div class="chart-wrapper">

            <pie-chart :chart-data="pieData.parttime" />
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="8">
          <div class="chart-wrapper">

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

const nowTurnover = {
  name: '每日商品成交量',
  data: []
}
const nowFeedBack = {
  name: '用户反馈数量',
  data: []
}
const date = new Date()
const week = date.getDay()
console.log(week)
for (var i = 0; i < week; i++) {
  nowTurnover.data.push(Turnover[i])
  nowFeedBack.data.push(FeedBack[i])
}
if (week === 0) {
  nowTurnover.data = Turnover
  nowFeedBack.data = FeedBack
}

console.log(nowTurnover)

const Pie = {
  good:
  {
    name: '商品发布',
    total: 102,
    data: [
      { value: 82, name: '通过' },
      { value: 15, name: '待审核' },
      { value: 5, name: '未通过' }
    ]
  },
  demand: {
    name: '需求发布',
    total: 78,
    data: [
      { value: 64, name: '通过' },
      { value: 11, name: '待审核' },
      { value: 3, name: '未通过' }
    ]
  },
  carpool: {
    name: '拼车发布',
    total: 48,
    data: [
      { value: 32, name: '通过' },
      { value: 14, name: '待审核' },
      { value: 2, name: '未通过' }
    ]
  }, activity: {
    name: '活动发布',
    total: 25,
    data: [
      { value: 19, name: '通过' },
      { value: 5, name: '待审核' },
      { value: 1, name: '未通过' }
    ]
  }, parttime: {
    name: '兼职发布',
    total: 11,
    data: [
      { value: 8, name: '通过' },
      { value: 2, name: '待审核' },
      { value: 1, name: '未通过' }
    ]
  }, identity: {
    name: '认证发布',
    total: 15,
    data: [
      { value: 11, name: '通过' },
      { value: 3, name: '待审核' },
      { value: 1, name: '未通过' }
    ]
  }
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
  // background-color:rgba(0,136,212,0.1);
   background-color:rgba(0,0,0,0.9);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    // background: #fff;
    // padding: 16px 16px 16px;
    margin-bottom: 32px;
    // box-shadow:0 0 40px 0 #3888fa;
  }
}

@media (max-width: 1024px) {
  // .chart-wrapper {
  //   padding: 8px;
  // }
}
.title {
  padding: 10px 0;
  text-align: center;
  color: #3888fa;
}
</style>
