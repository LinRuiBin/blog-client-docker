<template>
  <el-row>
    <el-col xs={span:20,offset:2} :sm={span:12,offset:6}  :md={span:12,offset:6}  :lg={span:12,offset:6}  :xl={span:12,offset:6} >
      <div class="about">
        {{msg}}
      </div>
    </el-col>
  </el-row>
</template>

<script>

export default {
  data () {
    return {
      msg: '关于'
    }
  },
  methods: {

  },
  computed: {
  },
  components: {

  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

</style>
