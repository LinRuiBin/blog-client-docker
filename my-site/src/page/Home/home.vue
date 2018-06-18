<template>
  <el-row>
    <el-col xs={span:20,offset:2} :sm={span:12,offset:6}  :md={span:12,offset:6}  :lg={span:12,offset:6}  :xl={span:12,offset:6} >
      <div class="home-page">
        <cl-line title="编程"></cl-line>
        <ul class="posts-list">
            <li v-for="post in codings" :key="post.id">
               <router-link class="title" :to="{path:'/postDetail',query:{postid:post.id}}">{{post.title}}</router-link>
                <span class="createTime">{{post.add_time | timeFormat}}</span>
                <el-tag class="arttag" size="mini" type="warning" v-for="label in post.label" :key="label.id">{{label.name}}</el-tag>
            </li>
        </ul>

        <cl-line title="生活"></cl-line>
        <ul class="posts-list">
            <li v-for="post in sharings" :key="post.id">
                <router-link class="title" :to="{path:'/postDetail',query:{postid:post.id}}">{{post.title}}</router-link>
                <span class="createTime">{{post.add_time | timeFormat}}</span>
                <el-tag class="arttag" size="mini" type="warning" v-for="label in post.label" :key="label.id">{{label.name}}</el-tag>
            </li>
        </ul>

        <!-- 联系我 -->
        <cl-line title="链接"></cl-line>
        <ul class="links">
            <li>
                <span>源码在这 Github：</span><a href="https://github.com/LinRuiBin" target="_blank">LinRuiBin</a>
            </li>
            <li>
                <span>一起玩微博：</span><a href="https://weibo.com/hopelife" target="">@林林林瑞彬</a>
            </li>
            <li>
                <span>call我尬聊：</span><a target="_blank">18675079557</a>
            </li>
            <li>
                <span>给我发邮件：</span><a href="mailto:18675079557@163.com">18675079557@163.com</a>
            </li>
        </ul>
    </div>
    </el-col>
  </el-row>
</template>

<script>
import moment from 'moment'
import clLine from '/components/line.vue'
import pinyin from 'pinyin'
import { getHomeArticles } from '../../api/blog.js'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      msg: '首页',
      codings: [
      ],
      sharings: [
      ]
    }
  },
  methods: {
    ...mapActions(['setInfo']),
    _getAllArticles () {
      // DEBUG:
      console.log('获取所有文章')
      getHomeArticles().then(res => {
        var allData = res.data[0]
        var codes = allData['codes']
        var shares = allData['shares']
        this.codings = codes
        this.sharings = shares
      })
    }
  },
  computed: {
  },
  components: {
    clLine,
    pinyin,
    moment
  },
  filters: {
    timeFormat: function (time) {
      if (!time) return ''
      return `（${moment(time).format('MMMM YYYY')}）`
    }
  },
  mounted () {
    // this.$store.dispatch('setInfo')
    this.$store.commit('SET_INFO')
    this._getAllArticles()
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/style/theme";
@import "../../assets/style/mixin";
@import "../../assets/style/common";

.home-page {
  margin: 20px 20px;
  .posts-list {
    margin-top: 30px;
    margin-bottom: 20px;
    list-style: none;
    li {
        font-size: 14px;
        // display: inline-block;
        margin-bottom: 15px;
        font-weight: bold;
        line-height: 22px;

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

  .links {
    color: #65737E;
    li {
      margin-bottom: 5px;
      font-size: 14px;
      a {
        color: #ABCBAA;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
