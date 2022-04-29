<template>
  <div class="swiper-container">
    <XHeader title="上传轮播" />

    <Upload v-model="image_uri" />
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >

      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column
        prop="img"
        label="轮播图"
      >
        <template slot-scope="scope">
          <!--图片 高度固定 宽度适应 -->
          <img :src="scope.row.img" alt="" style="height:60px;width:60px;">
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
import Upload from '@/components/Upload/SingleImage'
import { getList } from '@/api/table'
export default {
  name: 'SwiperUpload',
  components: { Upload, XHeader },
  filters: {

  },
  data() {
    return {
      image_uri: '',
      list: null,
      listLoading: true
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
    }
  }
}
</script>

<style lang="scss" scoped>
.swiper {
  &-container {
    width:100%;
    box-sizing: border-box;
    padding:10px;
  }
}
</style>
