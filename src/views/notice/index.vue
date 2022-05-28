<template>
  <div class="notice-container">
    <XHeader title="通告" />
    <el-form ref="form" :model="form" label-width="120px" style="box-shadow: 0 1px 4px rgb(0 21 41 / 8%);padding:10px;">
      <el-form-item label="通告标题">
        <el-input v-model="form.title" />
      </el-form-item>
      <!-- <el-form-item label="通告图片">
        <Upload v-model="form.image_uri" />
      </el-form-item> -->
      <el-form-item label="通告内容">
        <el-input v-model="form.content" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">创建</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
    <div class="notice-search">
      <el-input
        v-model="listQuery.param"
        placeholder="输入通告标题"
        style="flex: 1; margin-right: 4px"
        @keyup.enter.native="handleFilter"
      />
      <el-button
        class="notice-search-btn"
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

      <el-table-column label="通告标题" align="center">
        <!-- <template slot-scope="scope">
          {{ scope.row.adUsername }}
        </template> -->

      </el-table-column>
      <el-table-column label="通告内容" align="center">
        <template slot-scope="scope">
          {{ scope.row.ntContent }}
        </template>
        <!-- 智安E校园是一款面向搞笑的软件，用户可以通过发布内容满足自己的需求 -->
      </el-table-column>
      <el-table-column align="center" label="创建时间" width="500">
        <template slot-scope="scope">
          {{ scope.row.ntTime }}
        </template>

      </el-table-column>
      <el-table-column prop="adId" label="操作" align="center">
        <template slot-scope="{ row, $index }">
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
  </div>
</template>

<script>
import XHeader from '@/components/Header'
// import Upload from '@/components/Upload/SingleImage'
import { publishMess } from '@/api/message'
import Pagination from '@/components/Pagination'
export default {
  name: 'NoticeUpload',
  components: { XHeader, Pagination },
  filters: {

  },
  data() {
    return {

      list: null,
      listLoading: true,
      form: {
        title: '',
        content: ''
      },
      listQuery: { page: 1, pageSize: 20 },
      total: 1
    }
  },
  watch: {

  },
  created() {
    this.fetchData()
  },
  methods: {
    initForm() {
      return {
        title: '',
        content: ''
      }
    },
    fetchData() {
      this.list = [
        {
          ntContent: '欢迎使用智安E校园',
          ntTime: '2022-05-07 20:51:31'
        }
      ]
      this.listLoading = false
      // getManager(this.listQuery).then((res) => {
      //   if (res.data.code === 204) {
      //     this.list = res.data.data
      //     this.total = 0
      //   } else {
      //     this.list = res.data.data.list
      //     this.total = res.data.data.total
      //   }
      //   this.listLoading = false
      // })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.fetchData()
    },
    onSubmit() {
      publishMess().then(res => {
        this.$message({
          message: '发布成功!',
          type: 'success'
        })
        this.form = this.initForm()
      })
    },
    onCancel() {
      this.$message({
        message: '取消!',
        type: 'warning'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.notice {
  &-container {
    width:100%;
    box-sizing: border-box;
    padding:10px;

  }
  &-search {
    display: flex;
    justify-content: space-between;
    // display: inline-block;
    margin: 10px 0;
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
