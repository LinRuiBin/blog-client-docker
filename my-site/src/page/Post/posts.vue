<template>
  <el-row>
    <el-col xs={span:20,offset:2} :sm={span:12,offset:6}  :md={span:12,offset:6}  :lg={span:12,offset:6}  :xl={span:12,offset:6} >
      <div class="labellist">
        <el-button class="labelbtn" v-for="label in labels" @click='clickLabel(label.id)' type="success" plain size="small" :key='label.id'>{{label.name}}</el-button>
      </div>
      <div class="posts">
        <ul class="posts-list">
            <li v-for="post in articles" :key="post.id">
               <router-link class="title" :to="{path:'/postDetail',query:{postid:post.id}}">{{post.title}}</router-link>
                <span class="createTime">{{post.add_time | timeFormat}}</span>
                <el-tag class="arttag" size="mini" type="warning" v-for="label in post.label" :key="label.id">{{label.name}}</el-tag>
            </li>
        </ul>
      </div>

      <div class="pagefooter" v-if="totalCount>10">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="totalCount"
          :page-size="10"
          @current-change="handleCurrentChange"
          >
        </el-pagination>
      </div>

    </el-col>
  </el-row>
</template>

<script>
import { getAllArticles, getAllLabels, getArticlesForLabel, getArticleByPage, getArticlesForLabelByPage } from '../../api/blog.js'
import moment from 'moment'
export default {
  data () {
    return {
      msg: '所有文章',
      totalCount: 0,
      labels: [],
      articles: [],
      currentlabelId: 0
    }
  },
  methods: {
    _getAllLabels () {
      getAllLabels().then(res => {
        var allLabel = {
          'id': 0,
          'name': '全部'
        }
        var results = res.results
        results.splice(0, 0, allLabel)
        this.labels = results
      })
    },
    _getAllArticles () {
      getAllArticles().then(res => {
        console.log('获取文章')
        this.totalCount = res.count
        this.articles = res.results
      })
    },
    clickLabel (labelid) {
      this.currentlabelId = labelid
      console.log('点击标签 id:' + labelid)
      if (labelid === 0) {
        console.log('获取全部文章')
        getAllArticles().then(res => {
          this.totalCount = res.count
          this.articles = res.results
        })
      } else {
        console.log('获取指定id文章: ' + labelid)
        getArticlesForLabel(labelid).then(res => {
          this.totalCount = res.count
          this.articles = res.articles
        })
      }
    },
    handleCurrentChange (val) {
      console.log('点击了第几页: ' + val)
      if (this.currentlabelId === 0) {
        getArticleByPage(val).then(res => {
          this.totalCount = res.count
          this.articles = res.results
        })
      } else {
        getArticlesForLabelByPage(this.currentlabelId, val).then(res => {
          this.totalCount = res.count
          this.articles = res.articles
        })
      }
    }
  },
  computed: {
    totalArts: function () {
      var count = this.articles.length
      console.log('当前所有文章数' + count)
      return this.articles.count
    }
  },
  components: {
    moment
  },
  created () {
    console.log('全部文章界面')
    this._getAllLabels()
    this._getAllArticles()
  },
  filters: {
    timeFormat: function (time) {
      if (!time) return ''
      return `（${moment(time).format('MMMM YYYY')}）`
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .labellist {
    margin: 10px 20px;
    // height: 100px;
    // background-color: orange;
    .labelbtn{
      margin-top: 10px;
    }
  }

  .posts {
    margin: 20px 20px;
    .posts-list {
      margin-top: 30px;
      margin-bottom: 20px;
      list-style: none;
      li {
          font-size: 14px;
          line-height: 22px;
          margin-bottom: 15px;
          font-weight: bold;
          .title {
              color: #65737E;
              cursor: pointer;
              text-decoration: inherit;

              &:hover {
                text-decoration: underline;
              }
          }
          .createTime {
              font-size: 12px;
              color: #65737E;
          }

          .arttag {
            margin-left: 10px;
          }
      }
    }
  }
  .pagefooter {
    margin: 30px 20px;
  }
</style>
