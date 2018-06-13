<template>
  <el-row>
    <el-col xs={span:20,offset:2} :sm={span:18,offset:3}  :md={span:18,offset:3}  :lg={span:18,offset:3}  :xl={span:18,offset:3} >
      <div class="post">
        <div class="top">
          <h1 class="title">{{detailpost.title}}</h1>
          <p class="createTime">{{detailpost.add_time | timeFormat}}</p>
        </div>

        <div class="article" v-html="compiledMarkdown">
        </div>
        <!-- {{detailpost.art_desc}} -->
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getArticle } from '../../api/blog.js'
import moment from 'moment'
import marked from 'marked'
export default {
  data () {
    return {
      msg: '具体文章',
      postid: '',
      detailpost: {}
    }
  },
  methods: {
    _getArticleInfo () {
      // DEBUG:
      console.log('获取文章信息 id: ' + this.postid)
      getArticle(this.postid).then(res => {
        console.log('获取文章结果: ' + res)
        this.detailpost = res
      })
    }
  },
  computed: {
    compiledMarkdown () {
      return marked(this.detailpost.art_desc, { sanitize: true })
    }
  },
  components: {
    marked
  },
  created () {
    var params = this.$route.query
    console.log('获取文章参数 id: ' + params)
    this.postid = this.$route.query.postid
    this._getArticleInfo()
  },
  filters: {
    timeFormat: function (time) {
      if (!time) return ' '
      return moment(time).format('DD,MMMM,YYYY')
    }
  }

}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.post {

  margin: 20px 20px;
  .top{
   // background: red;
    margin: 20px auto;
    .title {
      // text-align: center;
      color: #666;
      font-size: 26px;
      font-weight: bold;
      p {
        color: gray;
      }
    }
  }

  .article {

  }
}
</style>
