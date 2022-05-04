<template>
  <div class="user-container">
    <XHeader title="用户管理" />
    <div class="user-search">
      <el-input
        v-model="listQuery.param"
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
      <el-table-column prop="useIcon" label="头像" width="80" class="head">
        <template>
          <!--图片 高度固定 宽度适应 -->
          <img
            :src="img"
            alt=""
            style="height: 60px; width: 60px"
          >
        </template>
      </el-table-column>
      <el-table-column prop="userId" label="ID" align="center">
        <template slot-scope="scope">
          {{ scope.row.userId }}
        </template>
      </el-table-column>
      <el-table-column prop="userNick" label="昵称" align="center">
        <template slot-scope="scope">
          {{ scope.row.userNick }}
        </template>
      </el-table-column>
      <el-table-column prop="userUsername" label="用户名" align="center">
        <template slot-scope="scope">
          {{ scope.row.userUsername }}
        </template>
      </el-table-column>
      <el-table-column prop="userPassword" label="密码" align="center">
        <template slot-scope="scope">
          {{ scope.row.userPassword }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="userCreateTime"
        label="注册日期"
        width="200"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.userCreateTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        class-name="status-col"
        label="状态"
        width="120"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.userStatus | statusFilter">{{
            scope.row.userStatus === 1 ? "正常" : "冻结中"
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
              v-if="row.userStatus === 1"
              size="mini"
              type="warning"
              @click="handleFreeze(row, $index,select=1)"
            >
              冻结
            </el-button>
            <el-button
              v-else
              size="mini"
              type="primary"
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

import { getUser, deleteUser, updateUserStatus } from '@/api/userCtrl'
export default {
  name: 'User',
  components: { XHeader, Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: 'warning',
        1: 'primary'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      img: require('@/assets/logo.png'),
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        pageSize: 20,
        param: '',
        status: ''
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
      getUser(this.listQuery).then((res) => {
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
    handleFreeze(row, index, select) {
      if (select === 1) {
        // 冻结
        console.log('冻结')
        updateUserStatus({ status: 0, userId: row.userId }).then(res => {
          this.fetchData()
          this.$message({
            message: '冻结成功',
            type: 'success'
          })
        })
      } else {
        console.log('解封')
        updateUserStatus({ status: 1, userId: row.userId }).then(res => {
          this.fetchData()
          this.$message({
            message: '解封成功',
            type: 'success'
          })
        })
      }
    },
    handleDelete(row, index) {
      deleteUser({ userId: row.userId }).then(res => {
        this.fetchData()
        this.$message({
          message: '删除成功',
          type: 'success'
        })
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
