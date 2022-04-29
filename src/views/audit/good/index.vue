<template>
  <div class="good-container">
    <XHeader title="商品审核" />

    <div class="good-search">
      <el-input
        v-model="listQuery.title"
        placeholder="输入需求标题名"
        style="width: 300px"
        class="good-search-item"
        @keyup.enter.native="handleFilter"
      />
      <el-select
        v-model="listQuery.status"
        placeholder="审核状态"
        clearable
        style="width: 110px"
        class="good-search-item"
      >
        <el-option
          v-for="item in status"
          :key="item"
          :label="item | statusFilterText"
          :value="item"
          @click.native="sortSelected(a=1,item)"
        />
      </el-select>
      <el-select
        v-model="listQuery.school"
        placeholder="校区"
        clearable
        style="width: 110px"
        class="good-search-item"
      >
        <el-option
          v-for="item in school"
          :key="item"
          :label="item"
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
      </el-select>
      <el-button
        class="good-search-btn good-search-item"
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
            scope.row.status == 0
              ? "待审核"
              : scope.row.status == 1
                ? "已通过"
                : "未通过"
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
      :limit.sync="listQuery.limit"
      @pagination="fetchData"
    />
    <el-dialog
      title="商品详情"
      :visible.sync="dialogFormVisible"
      style="dialog"
    >
      <div class="detail">
        <el-carousel height="30vw" :autoplay="false">
          <el-carousel-item v-for="(item, index) in detail.images" :key="index">
            <img :src="item" style="width: 100%; height: auto">
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
          <div class="detail-head">分类</div>
          <div class="detail-info">
            <el-tag type="primary" class="detail-tag">
              {{ detail.school }}
            </el-tag>
            <el-tag type="primary" class="detail-tag">
              {{ detail.type }}
            </el-tag>
          </div>
        </div>
        <div>
          <div class="detail-head">状态</div>
          <div class="detail-info">
            <el-tag :type="detail.status | statusFilter">
              {{
                detail.status == 0
                  ? "待审核"
                  : detail.status == 1
                    ? "已通过"
                    : "未通过"
              }}
            </el-tag>
          </div>
        </div>
        <div class="btn-box">
          <el-button
            size="mini"
            type="success"
            style="width: 70px"
            :disabled="detail.status !== 0 ? true : false"
            @click.stop="auditCross(detail.id)"
          >
            通过
          </el-button>
          <el-button
            size="mini"
            type="danger"
            style="width: 70px"
            :disabled="detail.status !== 0 ? true : false"
            @click.stop="auditNCross(detail.id)"
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
    statusFilterText(status) {
      const statusMap = {
        0: '待审核',
        1: '已通过',
        2: '未通过'
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
        title: undefined,
        status: undefined,
        school: undefined,
        type: undefined
      },
      status: [0, 1, 2],
      school: ['章贡校区', '黄金校区'],
      type: ['衣服', '生活用品', '数码'],
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
      // console.log(this.listQuery)
      getGoodList(this.listQuery).then((response) => {
        // console.log('response', response)
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.fetchData()
    },
    sortSelected(a, value) {
      // console.log(a, value)
      if (a === 1) {
        this.listQuery.status = value
      } else if (a === 2) {
        this.listQuery.school = value
      } else {
        this.listQuery.type = value
      }
    },
    getDetail(row) {
      // console.log(row)
      this.detail = row
      this.dialogFormVisible = true
    },
    auditCross() {
      this.$message({
        message: '完成',
        type: 'success'
      })
      this.dialogFormVisible = false
      this.detail = {}
    },
    auditNCross() {
      this.$message({
        message: '完成',
        type: 'success'
      })
      this.dialogFormVisible = false
      this.detail = {}
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

::v-deep .el-dialog {
  margin-bottom:15vh;
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
    &-tag{
      margin:0 4px;

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

