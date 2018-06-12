<template>
  <div class="">
    <y-header></y-header>
    <keep-alive>
    <router-view class="main" v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view class="main" v-if="!$route.meta.keepAlive"></router-view>
    <y-footer class="clearfix"></y-footer>
  </div>
</template>

<script>
import YHeader from '../common/header'
import YFooter from '../common/footer'
// import { mapState, mapMutations } from 'vuex'
export default {
  name: 'index',
  data () {
    return {
      msg: '这是老二的网站'
    }
  },
  computed: {

  },
  methods: {

  },
  components: {
    YHeader,
    YFooter
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
@import "../assets/style/theme";
@import "../assets/style/mixin";
@import "../assets/style/common";
@import "../assets/style/index";
.layout-bg {
  position: fixed;
  left: 0;
  top: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  background: url("../images/background-code2.png") no-repeat fixed top;
  background-size: cover;
  opacity: 0.1;
  filter: blur(2px);
}

.main {
  min-height: 500px;
}

</style>
