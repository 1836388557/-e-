<template>
  <div class="admin-container">
    <XHeader title="管理员管理" />
    <div class="admin-search">
      <!-- <el-input
        v-model="listQuery.username"
        placeholder="输入用户名"
        style="flex: 1; margin-right: 4px; margin-bottom: 10px"
        @keyup.enter.native="handleFilter"
      /> -->
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
      <el-table-column label="头像" width="100" class="head" align="center">
        <template>
          <!--图片 高度固定 宽度适应 -->
          <img :src="img" alt="" style="height: 60px; width: 60px">
        </template>
      </el-table-column>

      <el-table-column prop="adUsername" label="用户名" align="center">
        <template slot-scope="scope">
          {{ scope.row.adUsername }}
        </template>
      </el-table-column>
      <el-table-column prop="adPassword" label="密码" align="center">
        <template slot-scope="scope">
          {{ scope.row.adPassword }}
        </template>
      </el-table-column>
      <el-table-column prop="adEmail" label="邮箱" align="center">
        <template slot-scope="scope">
          {{ scope.row.adEmail }}
        </template>
      </el-table-column>
      <el-table-column
        class-name="status-col"
        label="状态"
        width="120"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.adRole | statusFilter">{{
            scope.row.adRole == "admin" ? "管理员" : "超级管理员"
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="adId" label="密码" align="center">
        <template slot-scope="{ row, $index }">
          <div class="btn-box">
            <el-button
              size="mini"
              type="primary"
              @click="handleModify(row, $index)"
            >
              编辑
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
      :limit.sync="listQuery.pageSize"
      @pagination="fetchData"
    />
    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      width="80%"
    >
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="max-width: 100%"
      >
        <!-- <el-form-item label="头像" prop="headImage">
          <Upload v-model="temp.headImage" />
        </el-form-item> -->
        <el-form-item v-if="temp.adId" label="ID" prop="adId">
          <el-input v-model="temp.adId" type="email" />
        </el-form-item>
        <el-form-item label="用户名" prop="adUsername">
          <el-input v-model="temp.adUsername" type="username" />
        </el-form-item>
        <el-form-item label="密码" prop="adPassword">
          <el-input v-model="temp.adPassword" type="password" />
        </el-form-item>
        <el-form-item label="邮箱" prop="adEmail">
          <el-input v-model="temp.adEmail" type="email" />
        </el-form-item>
        <el-form-item label="是否为超级管理管理员">
          <el-switch v-model="isAdmin" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false"> 取消 </el-button>
        <el-button
          type="primary"
          @click="dialogStatus === 'create' ? createData() : modifyData()"
        >
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import XHeader from '@/components/Header'
// import { getList, createAdmin } from '@/api/test/adminT'
import Pagination from '@/components/Pagination'
// import Upload from '@/components/Upload/SingleImage'
import {
  getManager,
  modifyManager,
  addManager,
  deleteManager
} from '@/api/adminCtrl'
export default {
  name: 'Admin',
  components: { XHeader, Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        root: '',
        admin: 'info'
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
      listQuery: { page: 1, pageSize: 20 },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '创建'
      },
      isAdmin: false,
      temp: { adEmail: '', adPassword: '', adRole: 'admin', adUsername: '' },
      rules: {
        username: [
          { required: true, message: '请填写用户名', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请填写密码', trigger: 'change' }
        ],
        email: [{ required: true, message: '请填写密码', trigger: 'change' }],
        status: [{ required: true, message: '请填写状态', trigger: 'blur' }]
      }
    }
  },
  watch: {
    isAdmin(val) {
      if (val) {
        this.temp.adRole = 'root'
      } else {
        this.temp.adRole = 'admin'
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getManager(this.listQuery).then((res) => {
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
    resetTemp() {
      if (this.dialogStatus === 'create') {
        this.temp = {
          adEmail: '',
          adPassword: '',
          adRole: 'admin',
          adUsername: ''
        }
      } else {
        this.temp = {
          adId: '',
          adEmail: '',
          adPassword: '',
          adRole: 'admin',
          adUsername: ''
        }
      }
    },
    handleModify(row, index) {
      this.dialogStatus = 'update'
      this.resetTemp()
      this.temp.adId = row.adId
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleCreate() {
      this.dialogStatus = 'create'
      this.resetTemp()
      console.log(this.temp)
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          addManager(this.temp).then(() => {
            this.fetchData()
            this.dialogFormVisible = false
            this.$message({
              message: '创建成功',
              type: 'success'
            })
          })
        }
      })
    },
    modifyData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          modifyManager(this.temp).then((res) => {
            this.fetchData()
            this.dialogFormVisible = false
            this.$message({
              message: '修改成功',
              type: 'success'
            })
          })
        }
      })
    },
    handleDelete(row, idx) {
      deleteManager({ adId: row.adId }).then((res) => {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.fetchData()
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
::v-deep .el-form-item__label {
  width: fit-content !important;
}
</style>
