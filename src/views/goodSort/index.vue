<template>
  <div class="app-container">
    <XHeader title="商品分类" />

    <div class="app-upload">
      <span>创建分类：</span>
      <el-input v-model="sortName" style="margin-right:10px;flex:1;" />
      <el-button type="primary" @click="onSubmit">创建</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="类别">
        <template slot-scope="scope">
          {{ scope.row.pacName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" width="500px;">
        <template slot-scope="scope">
          {{ scope.row.pacCreateTime }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="100" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button size="mini" type="danger" @click="handleDelete(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import XHeader from '@/components/Header'
// import { getList } from '@/api/test/goodSortT'
import { uploadType, deleteType, getType } from '@/api/commodityType'
export default {
  name: 'SwiperUpload',
  components: { XHeader },
  filters: {

  },
  data() {
    return {
      list: null,
      listLoading: true,
      sortName: ''

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
      getType().then(response => {
        console.log('response', response)
        this.list = response.data.data
        this.listLoading = false
      })
    },
    onSubmit() {
      uploadType({ pacName: this.sortName }).then(res => {
        this.$message({
          message: '添加成功',
          type: 'success'
        })
        this.fetchData()
        this.sortName = ''
      })
    },
    handleDelete(row, index) {
      deleteType({ pacId: row.pacId }).then(res => {
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
.app {
  &-container {
    width:100%;
    box-sizing: border-box;
    padding:10px;
  }
  &-upload{
    margin-bottom:20px;
    display: flex;
    align-items:center;
    span{
      font-size:15px;
      color:#000;
      font-weight:900;

    }
  }
}
</style>
