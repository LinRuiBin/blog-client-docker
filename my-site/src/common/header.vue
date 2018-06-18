<template>
  <header>
    <el-row>
      <el-col xs={span:20,offset:2} :sm={span:12,offset:6}  :md={span:12,offset:6}  :lg={span:12,offset:6}  :xl={span:12,offset:6} >
        <div class="middle">
          <img class="avatar" src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=336895329,3318752633&fm=27&gp=0.jpg" alt="avatar">
          <p class="name">I am lrb</p>
          <p class="description">枯藤老树昏鸦，小桥流水人家。
         </p>
          <ul class="navigations">
            <router-link to="/home">
                <i class="iconfont icon-homepage" title="首页"></i>
            </router-link>
            <router-link to="/posts">
                <i class="iconfont icon-document" title="全部文章"></i>
            </router-link>
            <router-link to="writepost">
                <i class="iconfont icon-brush" title="写文章"></i>
            </router-link>
            <router-link to="/about">
                <i class="iconfont icon-people" title="关于我"></i>
            </router-link>

          </ul>
       </div>
      </el-col>
    </el-row>
    <!-- 登录用户名 -->
      <span class="loginName" v-if="$store.state.userInfo.token">
          <!-- <img :src="$store.state.userInfo.avatar" alt="头像"> -->
          <!-- <i  class="iconfont icon-sina" style="color: rgb(225, 39, 39)"></i> -->
          <span>{{$store.state.userInfo.name}}</span>
          <span class="logout" @click="logout"> [ 退出 ]</span>
      </span>
      <span class="loginName" v-else @click="login" style="cursor: pointer;">登录</span>
  </header>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'header',
  data () {
    return {
      msg: '头部'
    }
  },
  methods: {
    login () {
      this.$router.push({path: '/login/'})
    },
    logout () {
      this.$router.push({path: '/login/'})
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  mounted () {

  },
  components: {

  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../assets/style/theme";
  @import "../assets/style/mixin";
  @import "../assets/style/common";

header {
  position: relative;
  width: 100%;
  height: 350px;
  padding: 40px 0 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  .avatar {
      margin: 0 auto;
      width: 128px;
      height: 128px;
      border-radius: 50%;
      opacity: 0.8;
  }
  .name {
      margin: 20px 0;
      font-weight: bold;
      font-size: 20px;
      font-weight: bold;
  }
  .description {
    display: block;
    padding: 0 20px;
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
    -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
    -webkit-line-clamp: 3; /** 显示的行数 **/
    overflow: hidden;  /** 隐藏超出的内容 **/
    color: #65737E;
    opacity: 0.7;
    text-align: center;
  }
  .navigations {
      margin-top: 30px;
      display: flex;
      justify-content: center;
      list-style: none;
      align-items: center;
      a {
        color: #666;
        margin-left: 40px;
        &:hover {
           transform: scale(1.3);
        }
      }
      a:nth-child(1){
        // width: 5vw;
        margin-left: 0px;
      }

  }
}

.loginName {
    position: absolute;
    left: 10px;
    top: 10px;
    display: inline-flex;
    align-items: center;
    color: #666;
    font-weight: bold;
    &:hover{
      color: #3489EE;
    }
    .logout{
      margin-left: 10px;
      color: #3489EE;
      &:hover{
        color: blue;
      }
    }

    > img {
        border-radius: 50%;
        @include wh(20px);
        margin-right: 6px;
     }
}

.fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}

</style>

<style lang="css" rel="stylesheet/css" scoped>
 @import "../assets/style/icon/iconfont.css";
.navigations i{
  font-size: 28px;
}
</style>
