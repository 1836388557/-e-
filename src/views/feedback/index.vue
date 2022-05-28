<template>
  <div class="identity-container">
    <XHeader title="用户反馈" />

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      @row-click="getDetail"
    >
      <el-table-column label="反馈内容" align="center">
        <template slot-scope="scope">
          {{ scope.row.fbContent }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="反馈时间" width="500px;">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.fbTime }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column
        class-name="status-col"
        label="状态"
        width="120"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.arStatus | statusFilter">{{
            scope.row.arStatus == 0
              ? "待审核"
              : scope.row.arStatus == 1
                ? "未通过"
                : "已通过"
          }}</el-tag>
        </template>
      </el-table-column> -->
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
      title="反馈图片"
      :visible.sync="dialogFormVisible"
      style="dialog"
    >
      <div class="detail">
        <el-carousel height="80vh" :autoplay="false">
          <el-carousel-item v-for="(item, index) in detail.arPic" :key="index">
            <div
              style="
                width: auto;
                height: 100%;
                display: flex;
                justify-content: center;
              "
            >
              <el-image
                ref="preview"
                :src="item"
                :preview-src-list="detail.arPic"
                style="height: 100%"
                @click.stop="handleClickItem"
              />
            </div>
          </el-carousel-item>
        </el-carousel>

        <div class="btn-box">
          <el-button
            size="mini"
            type="success"
            style="width: 70px"
            :disabled="detail.arStatus !== 0 ? true : false"
            @click.stop="auditCross(detail)"
          >
            通过
          </el-button>
          <el-button
            size="mini"
            type="danger"
            style="width: 70px"
            :disabled="detail.arStatus !== 0 ? true : false"
            @click.stop="auditNCross(detail)"
          >
            不通过
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import XHeader from '@/components/Header'
import Pagination from '@/components/Pagination'
// import { getGoodList } from '@/api/test/auditT'
// import { identityCheck, getIdentity } from '@/api/audit/identity'
// import { getCampus } from '@/api/campus'
// import { getType } from '@/api/commodityType'
export default {
  name: 'Identity',
  components: { XHeader, Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: 'warning',
        1: 'danger',
        2: 'success'
      }
      return statusMap[status]
    },
    statusFilterText(status) {
      const statusMap = {
        0: '待审核',
        1: '未通过',
        2: '已通过'
      }
      return statusMap[status]
    },
    titleFilter(val) {
      return val.slice(0, 10)
    },
    contentFilter(val) {
      return val.slice(0, 30)
    }
  },
  data() {
    return {
      list: null,
      total: 2,
      listLoading: true,
      listQuery: { page: 1, pageSize: 20, param: '', status: '' },
      status: [0, 1, 2],
      // school: [],
      // type: ['衣服', '生活用品', '数码'],
      dialogFormVisible: false,
      detail: {}
    }
  },
  watch: {},
  created() {
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
    // // 获取校区
    // getCampusList() {
    //   getCampus().then(res => {
    //     this.school = res.data.data
    //   })
    // },
    // // 获取商品类型
    // getTypeList() {
    //   getType().then(res => {
    //     this.type = res.data.data
    //   })
    // },
    fetchData() {
      this.listLoading = false
      this.list = [
        {
          fbContent: '我觉得这个非常棒，希望可以继续优化',
          fbTime: '2022-05-07 20:51:31'
        },
        {
          fbContent: '第一次用，感觉还不错',
          fbTime: '2022-05-12 08:50:10'
        }
      ]
      // getIdentity(this.listQuery).then((res) => {
      //   if (res.data.code === 204) {
      //     this.list = res.data.data
      //     this.total = 0
      //   } else {
      //     const lists = res.data.data.list
      //     console.log(lists)
      //     this.list = lists.map((i, idx) => {
      //       i.arUserIcon = this.$baseUrl + i.arUserIcon
      //       return i
      //     })
      //     console.log(this.list)
      //     this.total = res.data.data.total
      //   }
      //   this.listLoading = false
      // })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.fetchData()
    },
    sortSelected(a, value) {
      // console.log(a, value)
      if (a === 1) {
        this.listQuery.status = Number(value)
      }
      this.handleFilter()
      // else if (a === 2) {
      //   this.listQuery.school = value
      // } else {
      //   this.listQuery.type = value
      // }
    },
    getDetail(row) {
      // console.log('row', row)
      Object.assign(this.detail, row)
      const imglist = row.arPic.split(',').map((i, idx) => {
        i = this.$baseUrl + i
        return i
      })
      // console.log(this.detail)
      this.detail.arPic = imglist
      // console.log(this.detail.arPic)
      this.dialogFormVisible = true
    },
    auditCross(detail) {
      // identityCheck({ flag: 2, arId: detail.arId, identId: detail.arIdenId, userId: detail.arUserId }).then(res => {
      //   this.fetchData()
      //   this.$message({
      //     message: '审核通过',
      //     type: 'success'
      //   })
      //   this.dialogFormVisible = false
      //   this.detail = {}
      // })
    },
    auditNCross(detail) {
      // identityCheck({ flag: 2, arId: detail.arId, identId: detail.arIdenId, userId: detail.arUserId }).then(res => {
      //   this.fetchData()
      //   this.$message({
      //     message: '审核不通过',
      //     type: 'success'
      //   })
      //   this.dialogFormVisible = false
      //   this.detail = {}
      // })
    }
  }
}
</script>

<style lang="scss" scoped>
.identity {
  &-container {
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
  }
  &-search {
    display: inline-block;
    margin-bottom: 10px;
    &-item {
      margin: 4px 4px;
    }
    &-btn {
      border-radius: 100px;
    }
    ::v-deep .el-input__inner {
      border-radius: 100px;
    }
  }
}

.btn-box {
  padding-top: 10px;
  display: flex;
  justify-content: flex-end;
}

.page-total {
  margin-top: 30px;
  text-align: center;
  font-size: 14px;
  span {
    line-height: 40px;
  }
}

::v-deep .el-dialog {
  margin-bottom: 15vh;
  .detail {
    &-head {
      color: #606266;
      line-height: 40px;
      margin: 4px 0;

      font-weight: 900;
    }
    &-info {
      background: #eef1f6;
      padding: 10px 20px;
    }
    &-tag {
      margin: 0 4px;
    }
  }
  @media screen and (min-width: 300px) {
    width: 280px;
    .detail {
      &-head {
        font-size: 15px;
      }
      &-info {
        font-size: 13px;
      }
    }
  }
  @media screen and (min-width: 800px) {
    width: 500px;
    .detail {
      &-head {
        font-size: 17px;
      }
      &-info {
        font-size: 14px;
      }
    }
  }
  @media screen and (min-width: 1200px) {
    width: 800px;
    .detail {
      &-head {
        font-size: 18px;
      }
      &-info {
        font-size: 15px;
      }
    }
  }
}
</style>

