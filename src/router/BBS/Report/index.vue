<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      style="width: 100%"
      element-loading-text="加载中"
      border
      highlight-current-row>
      <el-table-column prop="reporter.nickname" width="95" label="举报者" align="center"/>
      <el-table-column prop="reason" width="300" label="举报原因"/>
      <el-table-column prop="target.content" label="被举报内容" align="center"/>
      <el-table-column prop="createDate" width="200" label="举报时间" align="center"/>
      <el-table-column
        label="操作"
        align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="freezeUser(scope.row)">
            冻结发布者
          </el-button>
          <el-button size="small" @click="deleteData(scope.row)">忽略</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :page-size="pageSize"
      :total="total"
      :current-page.sync="currentPage"
      style="text-align:center; margin: 10px 0;"
      layout="total, prev, pager, next, jumper"
    />
  </div>
</template>

<script>
import api from '@/api'

export default {
  data() {
    return {
      list: [],
      listLoading: true,
      total: 0,
      currentPage: 1,
      pageSize: 10
    }
  },
  watch: {
    currentPage() {
      this.fetchData()
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    freezeUser(item) {
      this.$msgbox({
        title: '请输入冻结原因',
        showInput: true,
        inputType: 'textarea',
        inputValue: '因违反相关规定,您的账号已被冻结',
        showCancelButton: true,
        confirmButtonText: '狠心冻结',
        cancelButtonText: '留条活路'
      }).then(({ value }) => {
        api
          .freezeUser({ id: item.target.author.id, reason: value })
          .allOk(() => {
            api.deleteReport({ id: item.id, resourceType: item.resourceType }).allOk(() => {
              this.list.splice(this.list.findIndex(v => v.id === item.id), 1)
              this.$message({
                message: '冻结成功',
                type: 'success'
              })
              if (!this.list.length) this.fetchData()
            })
          })
          .catch(() => {
            this.$message({
              message: '冻结失败,请检查网络连接是否断开',
              type: 'error'
            })
          })
      })
    },
    deleteData(item) {
      api
        .deleteReport({ id: item.id, resourceType: item.resourceType })
        .allOk(() => {
          this.list.splice(this.list.findIndex(v => v.id === item.id), 1)
          this.$message({
            message: '已忽略',
            type: 'success'
          })
          if (!this.list.length) this.fetchData()
        })
        .clientError(() => {
          this.$message({
            message: '删除失败',
            type: 'error'
          })
        })
    },
    fetchData() {
      const map = {
        1: 'Post',
        2: 'Comment',
        3: 'Reply',
        4: 'Teasing'
      }
      this.listLoading = true
      api
        .getReports({
          offset: (this.currentPage - 1) * this.pageSize,
          limit: (this.currentPage - 1) * this.pageSize + this.pageSize
        })
        .ok(({ data, total }) => {
          const len = data.length
          let completeNum = 0
          data.forEach(item => {
            item.createDate = new Date(item.createDate).toLocaleString()
            api['get' + map[item.resourceType]]({
              id: item.resourceId
            })
              .ok(data => {
                item.target = data
              })
              .complete(() => {
                if (++completeNum === len) {
                  this.list = data
                  this.listLoading = false
                }
              })
          })
          this.total = total
        })
    }
  }
}
</script>
