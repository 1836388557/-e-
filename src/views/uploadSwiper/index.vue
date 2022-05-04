<template>
  <div class="swiper-container">
    <XHeader title="上传轮播" />

    <Upload v-model="imgUrl" @input="getImg" />
    <div style="display: flex; justify-content: flex-end; padding: 10px 0">
      <el-button
        v-if="imgUrl !== ''"
        size="mini"
        type="primary"
        @click="upload"
      >
        发布
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
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          {{ scope.row.ssId }}
        </template>
      </el-table-column>
      <el-table-column prop="img" label="轮播图">
        <template slot-scope="scope">
          <!--图片 高度固定 宽度适应 -->
          <el-image
            ref="preview"
            :src="scope.row.ssPic"
            :preview-src-list="imgList"
            style="height: 80px; width: 120px"
            @click.stop="handleClickItem"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="100"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row, $index }">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(row, $index)"
          >
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
// import { getList } from '@/api/test/swiperT'
import { uploadSwiper, deleteSwiper, getSwiper } from '@/api/swiper.js'
export default {
  name: 'SwiperUpload',
  components: { Upload, XHeader },
  filters: {},
  data() {
    return {
      imgUrl: '',
      rootImg: '',
      list: null,
      listLoading: true,
      listQuery: {
        page: 1,
        pageSize: 20
      },
      imgList: [],
      isPreview: false
    }
  },
  watch: {},
  created() {},
  mounted() {
    // console.log(this.$baseUrl)
    this.fetchData()
  },
  methods: {
    handleClickItem() {
      this.$nextTick(() => {
        const domImageMask = document.querySelector('.el-image-viewer__mask')
        // 获取遮罩层dom
        if (!domImageMask) {
          return
        }
        domImageMask.addEventListener('click', () => {
          // 点击遮罩层时调用关闭按钮的 click 事件
          document.querySelector('.el-image-viewer__close').click()
        })
      })
    },
    fetchData() {
      this.imgList = []
      this.listLoading = true
      getSwiper(this.listQuery).then((res) => {
        if (res.data.code === 204) {
          this.list = res.data.data
          this.total = 0
        } else {
          const lists = res.data.data.list
          lists.map((i, idex) => {
            i.ssPic = this.$baseUrl + i.ssPic
            this.imgList.push(i.ssPic)
            return i
          })
          this.list = lists
          this.total = res.data.data.total
        }
        this.listLoading = false
      })
    },
    getImg(value) {
      console.log('img', value)
      if (value !== '') {
        this.imgUrl = this.$baseUrl + value
        this.rootImg = value
      } else {
        this.imgUrl = value
        this.rootImg = value
      }
    },
    upload() {
      uploadSwiper({ ssPic: this.rootImg })
        .then((res) => {
          this.imgUrl = ''
          this.rootImg = ''
          // console.log(res)
          // console.log(this.imgUrl)
          this.fetchData()
        })
        .catch((err) => {
          this.imgUrl = ''
          this.rootImg = ''
          console.log(err)
        })
    },
    handleDelete(row, index) {
      deleteSwiper({ ssId: row.ssId }).then((response) => {
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
.swiper {
  &-container {
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
  }
}
</style>
