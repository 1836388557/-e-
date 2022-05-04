<template>
  <div class="swiper-container">
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
  </div>
</template>

<script>
import XHeader from '@/components/Header'
// import Upload from '@/components/Upload/SingleImage'
import { publishMess } from '@/api/message'
export default {
  name: 'SwiperUpload',
  components: { XHeader },
  filters: {

  },
  data() {
    return {

      list: null,
      listLoading: true,
      form: {
        title: '',
        content: ''
      }
    }
  },
  watch: {

  },
  created() {

  },
  methods: {
    initForm() {
      return {
        title: '',
        content: ''
      }
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
.swiper {
  &-container {
    width:100%;
    box-sizing: border-box;
    padding:10px;

  }
}
</style>
