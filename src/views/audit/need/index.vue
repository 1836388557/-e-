<template>
  <div class="need-container">
    <XHeader title="需求审核" />

    <div class="need-search">
      <el-input
        v-model="listQuery.param"
        placeholder="输入需求标题名"
        style="width: 300px"
        class="need-search-item"
        @keyup.enter.native="handleFilter"
      />
      <el-select
        v-model="listQuery.status"
        placeholder="审核状态"
        clearable
        style="width: 110px"
        class="need-search-item"
      >
        <el-option
          v-for="item in status"
          :key="item"
          :label="item | statusFilterText"
          :value="item"
          @click.native="sortSelected(a=1,item)"
        />
      </el-select>
      <!-- <el-select
        v-model="listQuery.school"
        placeholder="校区"
        clearable
        style="width: 110px"
        class="need-search-item"
      >
        <el-option
          v-for="item in school"
          :key="item"
          :label="item | statusFilterText"
          :value="item"
          @click.native="sortSelected(a=2,item)"
        />
      </el-select>
      <el-select
        v-model="listQuery.type"
        placeholder="类型"
        clearable
        style="width: 110px"
        class="good-search-item"
      >
        <el-option
          v-for="item in type"
          :key="item"
          :label="item"
          :value="item"
          @click.native="sortSelected(a=3,item)"
        />
      </el-select> -->
      <el-button
        class="need-search-btn need-search-item"
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
          {{ scope.row.pdDemName | titleFilter }}
        </template>
      </el-table-column>
      <el-table-column prop="content" label="内容" align="center">
        <template slot-scope="scope">
          {{ scope.row.pdDemContent | contentFilter }}
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
          <span>{{ scope.row.pdDemCreateTime }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="nick" label="发布者昵称" align="center">
        <template slot-scope="scope">
          {{ scope.row.pdDemPublisherNick }}
        </template>
      </el-table-column>
      <el-table-column
        class-name="status-col"
        label="状态"
        width="120"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.pdDemStatus | statusFilter">{{
            scope.row.pdDemStatus == 0
              ? "待审核"
              : scope.row.pdDemStatus == 1
                ? "未通过"
                : "已通过"
          }}</el-tag>
        </template>
      </el-table-column>
      <!-- <el-table-column
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
              style="width:70px;"
              @click.stop="auditCross(row, $index)"
            >
              通过
            </el-button>
          </div>
          <div class="btn-box">
            <el-button
              size="mini"
              type="danger"
              style="width:70px;"
              @click.stop="auditNCross(row, $index)"
            >
              不通过
            </el-button>
          </div>
        </template>
      </el-table-column> -->
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
      :limit.sync="listQuery.pageSize"
      @pagination="fetchData"
    />
    <el-dialog title="需求详情" :visible.sync="dialogFormVisible" width="80%">
      <div class="detail">
        <div>
          <div class="detail-head">标题</div>
          <div class="detail-info">{{ detail.pdDemName }}</div>
        </div>
        <div>
          <div class="detail-head">内容</div>
          <div class="detail-info">{{ detail.pdDemContent }}</div>
        </div>
        <div>
          <div class="detail-head">提交日期</div>
          <div class="detail-info">{{ detail.pdDemCreateTime }}</div>
        </div>
        <div>
          <div class="detail-head">价格范围</div>
          <div class="detail-info">
            <div style="padding:10px 0;">最低价：<span style="color:red;">{{ detail.pdDemMinP }}</span></div>
            <div style="padding:10px 0;">最高价：<span style="color:red;">{{ detail.pdDemMaxP }}</span></div>
          </div>
        </div>
        <div>
          <div class="detail-head">分类</div>
          <div class="detail-info">
            <el-tag type="primary" class="detail-tag">
              {{ detail.pdDemCategory }}
            </el-tag>
          </div>
        </div>
        <div>
          <div class="detail-head">状态</div>
          <div class="detail-info">
            <el-tag :type="detail.pdDemStatus | statusFilter">
              {{
                detail.pdDemStatus == 0
                  ? "待审核"
                  : detail.pdDemStatus == 1
                    ? "未通过"
                    : "已通过"
              }}
            </el-tag>
          </div>
        </div>
        <div class="btn-box">
          <el-button
            size="mini"
            type="success"
            style="width: 70px"
            :disabled="detail.pdDemStatus !== 0 ? true : false"
            @click.stop="auditCross(detail.pdDemId)"
          >
            通过
          </el-button>
          <el-button
            size="mini"
            type="danger"
            style="width: 70px"
            :disabled="detail.pdDemStatus !== 0 ? true : false"
            @click.stop="auditNCross(detail.pdDemId)"
          >
            不通过
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import XHeader from '@/components/Header'
import Pagination from '@/components/Pagination'
import { demandCheck, getDemand } from '@/api/audit/demand'
export default {
  name: 'Need',
  components: { XHeader, Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: 'warning',
        1: 'danger',
        2: 'success'
      }
      return statusMap[status]
    },
    statusFilterText(status) {
      const statusMap = {
        0: '待审核',
        1: '未通过',
        2: '已通过'
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
      listQuery: { page: 1, pageSize: 20, param: '', status: '' },
      status: [0, 1, 2],
      // school: ['章贡校区', '黄金校区'],
      // type: ['衣服', '生活用品', '数码'],
      dialogFormVisible: false,
      detail: {}
    }
  },
  watch: {},
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      console.log('this.listQuery', this.listQuery)
      getDemand(this.listQuery).then((res) => {
        if (res.data.code === 204) {
          this.list = res.data.data
          this.total = 0
        } else {
          this.list = res.data.data.list
          this.total = res.data.data.total
        }
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.fetchData()
    },
    sortSelected(a, value) {
      console.log(a, value)
      if (a === 1) {
        this.listQuery.status = value
      }
      this.handleFilter()
      // else if (a === 2) {
      //   this.listQuery.school = value
      // } else {
      //   this.listQuery.type = value
      // }
    },
    getDetail(row) {
      // console.log(row)
      this.detail = row
      // console.log(this.detail.pdDemStatus)
      this.dialogFormVisible = true
    },
    auditCross(id) {
      demandCheck({ flag: 2, id: Number(id) }).then(res => {
        this.fetchData()
        this.$message({
          message: '审核通过',
          type: 'success'
        })
        this.dialogFormVisible = false
        this.detail = {}
      })
    },
    auditNCross(id) {
      demandCheck({ flag: 1, id: Number(id) }).then(res => {
        this.fetchData()
        this.$message({
          message: '审核不通过',
          type: 'success'
        })
        this.dialogFormVisible = false
        this.detail = {}
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.need {
  &-container {
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
  }
  &-search {
    display: inline-block;
    margin-bottom: 10px;
    &-item {
      margin: 4px 4px;
    }
    &-btn {
      border-radius: 100px;
    }
    ::v-deep .el-input__inner {
      border-radius: 100px;
    }
  }
}

.btn-box {
  padding-top: 10px;
  display: flex;
  justify-content: flex-end;
}

.page-total {
  margin-top: 30px;
  text-align: center;
  font-size: 14px;
  span {
    line-height: 40px;
  }
}

.detail {
  padding: 10px;
  font-size: 12px;
  &-head {
    color: #606266;
    line-height: 30px;
    margin: 4px 0;
    font-weight: 900;
  }
  &-info {
    background: #eef1f6;
    padding: 10px 20px;
  }
  &-tag {
    margin: 0 4px;
  }
}

::v-deep .el-dialog {
  margin-bottom: 15vh;
  .detail {
    &-head {
      color: #606266;
      line-height: 40px;
      margin: 4px 0;

      font-weight: 900;
    }
    &-info {
      background: #eef1f6;
      padding: 10px 20px;
    }
  }
  @media screen and (min-width: 300px) {
    width: 280px;
    .detail {
      &-head {
        font-size: 15px;
      }
      &-info {
        font-size: 13px;
      }
    }
  }
  @media screen and (min-width: 800px) {
    width: 500px;
    .detail {
      &-head {
        font-size: 17px;
      }
      &-info {
        font-size: 14px;
      }
    }
  }
  @media screen and (min-width: 1200px) {
    width: 800px;
    .detail {
      &-head {
        font-size: 18px;
      }
      &-info {
        font-size: 15px;
      }
    }
  }
}
</style>

