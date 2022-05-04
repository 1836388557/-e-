<template>
  <div class="upload-container">
    <div class="image-preview">
      <div v-show="imageUrl!==''" class="image-preview-wrapper">
        <img :src="imageUrl">
        <!-- <div class="image-preview-wrapper">
        <img :src="img"> -->
        <div class="image-preview-action">
          <i class="el-icon-delete" @click="rmImage" />
        </div>
      </div>
    </div>
    <!-- action -->
    <el-upload
      :data="dataObj"
      :multiple="false"
      :show-file-list="false"
      :on-success="handleImageSuccess"
      class="image-uploader"
      action="string"
      :http-request="uploadHttp"
      drag
    >
      <i class="el-icon-upload" />
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </el-upload>
  </div>
</template>
<script>
// import { getToken } from '@/api/token'
import { uploadImage } from '@/api/swiper'
import { scaleimg } from '@/utils/base64/handlerImg.js'
export default {
  name: 'SingleImageUpload',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      tempUrl: '',
      dataObj: { token: '', key: '' }
      // img: require('@/assets/images/indexBg.jpg')
    }
  },
  computed: {
    imageUrl() {
      return this.value
    }
  },
  methods: {
    rmImage() {
      this.emitInput('')
    },
    emitInput(val) {
      this.$emit('input', val)
    },
    handleImageSuccess() {
      console.log(this.tempUrl)
    },
    uploadHttp(File) {
      const username = JSON.parse(localStorage.getItem('userInfo')).username
      const file = File.file
      const data = new FileReader()
      const img = new Image()
      let formatdata = ''
      if (file) {
        data.readAsDataURL(file)
      }
      data.onload = (e) => {
        img.src = e.target.result
        img.onload = (s) => {
          formatdata = scaleimg(s)
          uploadImage({
            imgBase64: formatdata,
            type: 'slideshow',
            username: username
          })
            .then((res) => {
              // console.log(res.data.data)
              this.tempUrl = res.data.data.picUrl
              console.log(this.tempUrl)
              this.emitInput(this.tempUrl)
            })
            .catch((err) => {
              console.log(err)
            })
        }
      }
    },
    upload() {}
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.upload-container {
  width: 100%;
  position: relative;
  // @include clearfix;
  .image-uploader {
    width: 100%;
    margin-top: 10px;
  }
  .image-preview {
    width: 100%;
    // height: 200px;
    position: relative;
    margin-top: 10px;
    .image-preview-wrapper {
      position: relative;
      width: 100%;
      height: 100%;

      img {
        width: 100%;
        height: 100%;
      }
    }
    .image-preview-action {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      cursor: default;
      text-align: center;
      color: #fff;
      opacity: 0;
      font-size: 20px;
      background-color: rgba(0, 0, 0, 0.5);
      transition: opacity 0.3s;
      cursor: pointer;
      text-align: center;
      line-height: 200px;
      .el-icon-delete {
        font-size: 36px;
      }
    }
    &:hover {
      .image-preview-action {
        opacity: 1;
      }
    }
  }
}
</style>
