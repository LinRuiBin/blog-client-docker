<template>
  <el-row>
    <!--容器 -->
    <el-col xs={span:20,offset:2} :sm={span:18,offset:3}  :md={span:18,offset:3}  :lg={span:18,offset:3}  :xl={span:18,offset:3} >
      <div class="container">
        <!--文章选项-->
        <div class="form">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="article-form" label-position='left'>
            <el-form-item label="文章标题" prop="title">
              <el-input v-model="ruleForm.title"></el-input>
            </el-form-item>

            <el-form-item label="文章标签" prop="label">
            <el-checkbox-group v-model="ruleForm.label">
              <el-checkbox v-for="(slabel, index) in sourceLabels"  :label="slabel.id" :key="index" name="type">{{slabel.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="是否原创" prop="is_origin">
            <el-radio-group v-model="ruleForm.is_origin">
              <el-radio label=true>是</el-radio>
              <el-radio label=false>否</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="文章类别" prop="art_type">
            <el-radio-group v-model="ruleForm.art_type">
              <el-radio label=1>编程</el-radio>
              <el-radio label=2>生活</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item>
            <el-button class="submit-btn" :loading="isloading" type="primary" @click="submitForm('ruleForm')">{{btntitle}}</el-button>
          </el-form-item>

          </el-form>
        </div>

        <div class="editor">
          <mavon-editor ref=md v-model="art_desc" @imgAdd="$imgAdd"></mavon-editor>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { createArticle, getAllLabels } from '../../api/blog.js'
import axios from 'axios'
import lrz from 'lrz'
export default {
  data () {
    return {
      content: '',
      isloading: false,
      btntitle: '发表文章',
      rules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        label: [
          { required: true, type: 'array', message: '选择文章标签', trigger: 'change' }
        ],
        is_origin: [
          { required: true, message: '请选择是否原创', trigger: 'change' }
        ],
        art_type: [
          { required: true, message: '请选择分类', trigger: 'change' }
        ]
      },
      ruleForm: {
        title: '',
        art_desc: '',
        label: [],
        is_origin: '',
        art_type: ''
      },
      sourceLabels: [],
      imgslist: []
    }
  },
  methods: {
    submitForm (formName) {
      console.log('表单验证')
      // DEBUG:
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this._createArticle()
          console.log('验证通过')
        } else {
          console.log('验证不通过')
          return false
        }
      })
    },
    _getAllLabels () {
      getAllLabels().then(res => {
        this.sourceLabels = res.results
        // DEBUG:
        console.log('获取所有结果: ' + res)
      })
    },
    _createArticle () {
      var parmas = {
        title: this.ruleForm.title,
        art_desc: this.art_desc,
        label: this.ruleForm.label,
        is_origin: this.ruleForm.is_origin,
        art_type: this.ruleForm.art_type
      }
      console.log('发表文章参数: ' + parmas)
      this.btntitle = '正在发送...'
      this.isloading = true
      createArticle(parmas).then(res => {
        // DEBUG:
        console.log('发表文章: ' + res)
        if (res.id > 0) {
          this.$router.push({path: '/postDetail/', query: {postid: res.id}})
        }
      })
    },
    $imgAdd (pos, $file) {
      console.log('添加图片')
      // 第一步.将图片上传到服务器.
      var that = this
      lrz($file)
        .then(function (rst) {
          console.log('压缩成功 大小：' + rst.fileLen)
          var formdata = new FormData()
          formdata.append('image', rst.file, rst.origin.name)
          // var formdata = rst.formData
          let config = {
            headers: {'Content-Type': 'multipart/form-data'}
          }
          axios.post('http://127.0.0.1:8000/blogimage/', formdata, config).then(response => {
            console.log('图片上传成功')
            var url = response.data.image
            that.$refs.md.$img2Url(pos, url)
          })
        }).catch(function (error) {
          console.log('压缩失败' + error)
        }).always(function () {

        })

      // axios({
      //   url: '127.0.0.1:8000/blogimage',
      //   method: 'post',
      //   data: formdata,
      //   headers: { 'Content-Type': 'multipart/form-data' }
      // }).then((url) => {
      //   // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
      //   /**
      //   * $vm 指为mavonEditor实例，可以通过如下两种方式获取
      //   * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
      //   * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
      //   */
      //   // $vm.$img2Url(pos, url)
      // })
    },
    testAddImages () { // 测试上传多张图片
      var imgList = this.imgslist
      var formdata = new FormData()
      // var that = this
      for (var i = 0; i < imgList.length; i++) {
        var rst = imgList[i]
        formdata.append('image' + i, rst.file, rst.origin.name)
      }
      formdata.append('title', '测试多张图片上传')
      let config = {
        headers: {'Content-Type': 'multipart/form-data'}
      }
      axios.post('http://127.0.0.1:8000/imgtask/', formdata, config).then(response => {
        console.log('图片上传成功')
        // var url = response.data.image
        // that.$refs.md.$img2Url(pos, url)
      })
    }
  },
  computed: {
  },
  components: {
    axios,
    lrz
  },
  created () {
    this._getAllLabels()
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.container {
  .el-form-item {
    margin-bottom: 10px;
  }

  .form {
    margin: 20px 20px;
  }

  .editor {
    margin: 20px 10px;
    min-height: 300px;
    background-color: red;
  }

  .submit-btn {
    float: right;
    margin: 0px 0px 0px;
  }
}

</style>
