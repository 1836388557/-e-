<template>
  <div class="good-container">
    <XHeader title="商品审核" />

    <div class="good-search">
      <el-input
        v-model="listQuery.title"
        placeholder="输入商品标题名"
        style="flex: 1; margin-right: 4px"
        @keyup.enter.native="handleFilter"
      />
      <el-button
        class="good-search-btn"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >
        搜索
      </el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      @row-click="getDetail"
    >
      <el-table-column prop="title" label="标题" align="center">
        <template slot-scope="scope">
          {{ scope.row.title | titleFilter }}
        </template>
      </el-table-column>
      <el-table-column prop="content" label="内容" align="center">
        <template slot-scope="scope">
          {{ scope.row.content | contentFilter }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="createDate"
        label="提交日期"
        width="200"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.createDate }}</span>
        </template>
      </el-table-column>
      <el-table-column
        class-name="status-col"
        label="状态"
        width="120"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{
            scope.row.status == 0 ? "待审核" : scope.row.status == 1?"已通过":"未通过"
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="审核"
        align="center"
        width="120"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row, $index }">
          <div class="btn-box">
            <el-button
              size="mini"
              type="success"
              @click.stop="auditCross(row, $index)"
            >
              通过
            </el-button>
          </div>
          <div class="btn-box">
            <el-button
              size="mini"
              type="danger"
              @click.stop="auditNCross(row, $index)"
            >
              不通过
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="page-total">
      共
      <span style="padding: 0 4px; color: #409eff">{{ total }}</span>
      条数据
    </div>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      layout="prev,next,sizes,jumper"
      :limit.sync="listQuery.limit"
      @pagination="fetchData"
    />
    <el-dialog title="商品详情" :visible.sync="dialogFormVisible" width="80%">
      <div class="detail">
        <el-carousel height="30vw" :autoplay="false">
          <el-carousel-item v-for="(item,index) in detail.images" :key="index">
            <img :src="item" style="width:100%;height: auto;">
          </el-carousel-item>
        </el-carousel>
        <div>
          <div class="detail-head">标题</div>
          <div class="detail-info">{{ detail.title }}</div>
        </div>
        <div>
          <div class="detail-head">内容</div>
          <div class="detail-info">{{ detail.content }}</div>
        </div>
        <div>
          <div class="detail-head">提交日期</div>
          <div class="detail-info">{{ detail.createDate }}</div>
        </div>
        <div>
          <div class="detail-head">状态</div>
          <div class="detail-info">
            <el-tag :type="detail.status | statusFilter">
              {{ detail.status == 0 ? "待审核" : detail.status == 1?"已通过":"未通过" }}
            </el-tag>
          </div>
        </div>
      </div>

    </el-dialog>
  </div>
</template>

<script>
import XHeader from '@/components/Header'
import Pagination from '@/components/Pagination'
import { getGoodList } from '@/api/auditT'
export default {
  name: 'Good',
  components: { XHeader, Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: 'warning',
        1: 'success',
        2: 'danger'
      }
      return statusMap[status]
    },
    titleFilter(val) {
      return val.slice(0, 10)
    },
    contentFilter(val) {
      return val.slice(0, 30)
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        title: undefined
      },
      dialogFormVisible: false,
      detail: {}
    }
  },
  watch: {

  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getGoodList(this.listQuery).then((response) => {
        console.log('response', response)
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.fetchData()
    },
    getDetail(row) {
      // console.log(row)
      this.detail = row
      this.dialogFormVisible = true
    },
    auditCross() {
      this.$notify({
        title: '完成',
        type: 'success'
      })
    },
    auditNCross() {
      this.$notify({
        title: '完成',
        type: 'success'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.good {
  &-container {
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
  }
  &-search {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    &-btn {
      border-radius: 100px;
    }
    ::v-deep .el-input__inner {
      border-radius: 100px;
    }
  }
}

.btn-box {
  margin: 4px 0;
}

.page-total {
  margin-top: 30px;
  text-align: center;
  font-size: 14px;
  span {
    line-height: 40px;
  }
}

.detail{
  padding:10px;
  font-size: 12px;
  &-head{

    color: #606266;
    line-height:30px;
    margin:4px 0;
    font-weight:900;
  }
  &-info{
    background: #eef1f6;
    padding: 10px 20px;
  }
}

// .item {
//       border-bottom: 1PX #8d8d8d dashed;
//       font-size: 12PX;
//       line-height: 16PX;
//       @media screen and (min-width: 576PX) {
//         font-size: 14PX;
//         line-height: 18PX;
//       }
// 	  @media screen and (min-width: 768PX) {
//         font-size: 16PX;
//         line-height: 28PX;
//       }
//       @media screen and (min-width: 992PX) {
//         font-size: 16PX;
//         line-height: 32PX;
//       }
//       @media screen and (min-width: 1200PX) {
//         font-size: 18PX;
//         line-height: 64PX;
//       }
// }

</style>

