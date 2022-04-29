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
      <el-table-column align="center" label="title">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" width="200px;">
        <template slot-scope="scope">
          {{ scope.row.createTime }}
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
import { getList } from '@/api/goodSortT'
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
      getList().then(response => {
        console.log('response', response)
        this.list = response.data.items
        this.listLoading = false
      })
    },
    onSubmit() {
      this.$message({
        message: '添加成功',
        type: 'success'
      })

      const date = new Date()
      const Y = date.getFullYear()
      const M = date.getMonth() + 1
      const d = date.getDate()
      let h = date.getHours()
      if (h < 10) {
        h = '0' + h
      }
      const m = date.getMinutes()
      const s = date.getSeconds()
      const createTime = Y + '-' + M + '-' + d + ' ' + h + ':' + m + ':' + s
      this.list.unshift({
        createTime: createTime,
        title: this.sortName
      })
      this.sortName = ''
    },
    handleDelete(row, index) {
      this.$message({
        message: '删除成功',
        type: 'success'
      })
      this.list.splice(index, 1)
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
