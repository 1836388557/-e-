<template>
  <div class="admin-container">
    <XHeader title="管理员管理" />
    <div class="admin-search">
      <el-input
        v-model="listQuery.username"
        placeholder="输入用户名"
        style="flex: 1; margin-right: 4px;margin-bottom:10px;"
        @keyup.enter.native="handleFilter"
      />
      <el-button
        class="admin-search-btn"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >
        搜索
      </el-button>
      <el-button
        class="admin-search-btn"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >
        添加
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
      <el-table-column label="头像" width="80" class="head" align="center">
        <template>
          <!--图片 高度固定 宽度适应 -->
          <img
            :src="img"
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
        class-name="status-col"
        label="状态"
        width="120"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{
            scope.row.status == 0 ? "管理员" : "超级管理员"
          }}</el-tag>
        </template>
      </el-table-column>
      <!-- <el-table-column
        label="操作"
        align="center"
        width="120"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row, $index }">
          <div v-if="row.status === 0" class="btn-box">
            <el-button
              size="mini"
              type="primary"
              @click="handleDelete(row, $index)"
            >
              分配
            </el-button>
          </div>

          <div v-else class="btn-box">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(row, $index)"
            >
              解除
            </el-button>
          </div>
        </template> -->
      <!-- </el-table-column> -->
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
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="80%">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="max-width:100%;">
        <!-- <el-form-item label="头像" prop="headImage">
          <Upload v-model="temp.headImage" />
        </el-form-item> -->
        <el-form-item label="用户名" prop="username">
          <el-input v-model="temp.username" type="username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="temp.password" type="password" />
        </el-form-item>
        <el-form-item label="是否为超级管理管理员">
          <el-switch v-model="isAdmin" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():null">
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import XHeader from '@/components/Header'
import { getList, createAdmin } from '@/api/adminT'
import Pagination from '@/components/Pagination'
// import Upload from '@/components/Upload/SingleImage'
export default {
  name: 'Admin',
  components: { XHeader, Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: 'info',
        1: ''
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
        limit: 20,
        username: undefined
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '创建'
      },
      isAdmin: false,
      temp: {
        headImage: '',
        username: '',
        password: '',
        status: 0
      },
      rules: {
        username: [{ required: true, message: '请填写用户名', trigger: 'change' }],
        password: [{ required: true, message: '请填写密码', trigger: 'change' }],
        status: [{ required: true, message: '请填写状态', trigger: 'blur' }]
      }
    }
  },
  watch: {
    isAdmin(val) {
      if (val) {
        this.temp.status = 1
      } else {
        this.temp.status = 0
      }
    }

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
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          createAdmin(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.admin {
  &-container {
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
  }
  &-search {
    // display: flex;
    // justify-content: space-between;
    display: inline-block;
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
::v-deep .el-form-item__label{
  width:fit-content !important;
}
</style>
