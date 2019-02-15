<template>
  <div class="app-container">
    <div style="margin-bottom: 10px;">
      <el-select
        v-model="sort"
        placeholder="请选择"
      >
        <el-option
          v-for="item in sortOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      style="width: 100%"
      element-loading-text="加载中"
      border
      highlight-current-row>
      <el-table-column prop="id" width="80" label="ID" align="center" />
      <el-table-column prop="author.nickname" width="95" label="发布者" align="center" />
      <el-table-column prop="content" label="内容" align="center"/>
      <el-table-column prop="createDate" width="200" label="时间" align="center"/>
      <el-table-column prop="agreeNum" width="80" label="点赞数" align="center"/>
      <el-table-column
        label="操作"
        width="150"
        align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="small">置顶</el-button>
          <el-button type="danger" icon="el-icon-delete" size="small" @click="deleteData(scope.row)"/>
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
      sort: 'date',
      list: [],
      listLoading: true,
      total: 0,
      currentPage: 1,
      pageSize: 10,
      sortOptions: [
        {
          label: '最新发布',
          value: 'date'
        },
        {
          label: '点赞最多',
          value: 'hot'
        }
      ]
    }
  },
  watch: {
    currentPage() {
      this.fetchData()
    },
    sort() {
      this.fetchData()
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    deleteData(item) {
      api
        .deleteTeasing({ id: item.id })
        .allOk(() => {
          this.list.splice(this.list.findIndex(v => v.id === item.id), 1)
          this.$message({
            message: '删除成功',
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
      this.listLoading = true
      api
        .getTeasings({
          offset: (this.currentPage - 1) * this.pageSize,
          limit: this.pageSize,
          sort: this.sort
        })
        .ok(({ data, total }) => {
          this.list = data.map(item => {
            item.createDate = new Date(item.createDate).toLocaleString()
            return item
          })
          this.total = total
        })
        .complete(() => {
          this.listLoading = false
        })
    }
  }
}
</script>
