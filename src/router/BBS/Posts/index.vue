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
      <el-select
        v-model="category"
        placeholder="请选择"
      >
        <el-option
          v-for="item in categoryOptions"
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
      <el-table-column prop="category" width="95" label="分类" align="center" />
      <el-table-column prop="author.nickname" width="100" label="发布者"/>
      <el-table-column prop="content" label="内容" align="center"/>
      <el-table-column prop="createDate" width="200" label="时间" align="center"/>
      <el-table-column prop="agreeNum" width="80" label="点赞数" align="center"/>
      <el-table-column
        label="操作"
        align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="small">置顶</el-button>
          <el-button size="small" @click="$router.push({name: 'BBSComments', params: {id: scope.row.id}})">查看</el-button>
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

function mapCategory(category) {
  // const categoryMap = {
  //   marr1ied: '婚姻',
  //   work: '工作',
  //   money: '金钱',
  //   study: '学习',
  //   family: '家庭',
  //   healthy: '健康',
  //   other: '其他'
  // }

  const categoryMap = {
    1: '婚姻',
    2: '工作',
    3: '金钱',
    4: '学习',
    5: '家庭',
    6: '健康',
    7: '爱情',
    8: '其它'
  }

  let result = categoryMap[category]

  if (!result) {
    Object.keys(categoryMap).forEach(v => {
      if (categoryMap[v] === category) result = v
    })
  }

  return result
}

// 当前页面信息,排序方法,页码等
let info = {
  sort: 'date',
  total: 0,
  currentPage: 1,
  pageSize: 10,
  category: 'all'
}

export default {
  data() {
    return {
      ...info,
      list: [],
      listLoading: true,
      sortOptions: [
        {
          label: '最新发布',
          value: 'date'
        },
        {
          label: '点赞最多',
          value: 'hot'
        }
      ],
      categoryOptions: [
        {
          label: '所有',
          value: 'all'
        },
        {
          label: '婚姻',
          value: 'married'
        },
        {
          label: '工作',
          value: 'work'
        },
        {
          label: '金钱',
          value: 'money'
        },
        {
          label: '学业',
          value: 'study'
        },
        {
          label: '家庭',
          value: 'family'
        },
        {
          label: '健康',
          value: 'healthy'
        },
        {
          label: '其它',
          value: 'ohters'
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
    },
    category() {
      this.fetchData()
    }
  },
  created() {
    this.fetchData()
  },
  beforeDestroy() {
    info = {
      sort: this.sort,
      total: this.total,
      currentPage: this.currentPage,
      pageSize: this.pageSize,
      category: this.category
    }
  },
  methods: {
    deleteData(item) {
      api
        .deletePost({ id: item.id })
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
        .getPosts({
          offset: (this.currentPage - 1) * this.pageSize,
          limit: this.pageSize,
          category: this.category === 'all' ? undefined : this.category,
          sort: this.sort
        })
        .ok(({ data, total }) => {
          this.list = data.map(item => {
            item.category = mapCategory(item.category)
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
