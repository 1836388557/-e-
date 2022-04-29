<template>
  <div class="user-container">
    <XHeader title="用户管理" />
    <div class="user-search">
      <el-input
        v-model="listQuery.username"
        placeholder="输入用户名"
        style="flex: 1; margin-right: 4px"
        @keyup.enter.native="handleFilter"
      />
      <el-button
        class="user-search-btn"
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
    >
      <el-table-column prop="headImage" label="头像" width="80" class="head">
        <template slot-scope="scope">
          <!--图片 高度固定 宽度适应 -->
          <img
            :src="scope.row.headImage"
            alt=""
            style="height: 60px; width: 60px"
          >
        </template>
      </el-table-column>
      <el-table-column prop="username" label="用户名" align="center">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column prop="password" label="密码" align="center">
        <template slot-scope="scope">
          {{ scope.row.password }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="createDate"
        label="注册日期"
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
            scope.row.status == 0 ? "正常" : "冻结中"
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="120"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row, $index }">
          <div class="btn-box">
            <el-button
              v-if="row.status === 0"
              size="mini"
              type="warning"
              @click="handleFreeze(row, $index,select=1)"
            >
              冻结
            </el-button>
            <el-button
              v-else
              size="mini"
              type="success"
              @click="handleFreeze(row, $index,select=2)"
            >
              解封
            </el-button>
          </div>
          <div class="btn-box">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(row, $index)"
            >
              删除
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
  </div>
</template>

<script>
import XHeader from '@/components/Header'
import Pagination from '@/components/Pagination'
import { getList } from '@/api/userT'
export default {
  name: 'User',
  components: { XHeader, Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: 'success',
        1: 'danger'
      }
      return statusMap[status]
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
        username: undefined
      }
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
      getList(this.listQuery).then((response) => {
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
    handleFreeze(row, index, select) {
      if (select === 1) {
        this.list[index].status = 1
      } else {
        this.list[index].status = 0
      }
    },
    handleDelete(row, index) {
      this.list.splice(index, 1)
      this.$message({
        message: '删除成功',
        type: 'success'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.user {
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
::v-deep .cell {
  text-overflow: unset !important;
}
</style>
