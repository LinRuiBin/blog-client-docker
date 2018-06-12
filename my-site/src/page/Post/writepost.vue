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
            <el-button class="submit-btn" type="primary" @click="submitForm('ruleForm')">发表文章</el-button>
          </el-form-item>

          </el-form>
        </div>
      <!-- 富文本编辑器 -->
        <!-- <div class="editor">
          <quill-editor
            v-model="art_desc"
            ref="myQuillEditor"
            class="editor"
            :options="myQuillEditor"
            @focus="onEditorFocus">
          </quill-editor>
        </div> -->

        <div class="editor">
          <mavon-editor v-model="art_desc"></mavon-editor>
        </div>

       <!-- 上传图片弹出框 -->
       <!-- image upload dialog -->
        <el-dialog
          title="图片上传"
          :visible.sync="dialogUploadImage"
          @close="dialogUploadImage = false"
          width="30%">
          <el-upload
            :auto-upload="false"
            ref="upload"
            :action="uploadURL"
            :headers="headers"
            :file-list="fileList"
            :before-upload="beforeUpload"
            :on-success="handleUploadSuccess"
            :on-error="handleUploadError"
            name="image"
            style="margin-top:30px;">
            <el-button size="medium" slot="trigger">选取文件</el-button>
          </el-upload>
          <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="cancleUpload">取 消</el-button>
            <el-button size="small" type="primary" @click="confirmUpload">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// import mavonEditor from 'mavon-editor'
// import 'mavon-editor/dist/css/index.css'
import { createArticle, getAllLabels } from '../../api/blog.js'

export default {
  data () {
    return {
      content: '',
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
      myQuillEditor: {
        modules: {
          toolbar: {
            container: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{ 'header': 1 }, { 'header': 2 }],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              [{ 'script': 'sub' }, { 'script': 'super' }],
              [{ 'indent': '-1' }, { 'indent': '+1' }],
              [{ 'direction': 'rtl' }],
              [{ 'size': ['small', false, 'large', 'huge'] }],
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'align': [] }],
              ['clean'],
              ['image']
            ],
            handlers: {
              'image': this.showUploadDialog
            }
          }
        },
        placeholder: '分享你的点点滴滴...'
      },
      // 上传图片
      dialogUploadImage: false,
      uploadURL: '',
      headers: {
        Authorization: ''
      },
      fileList: []
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
    onEditorFocus (val) {
      console.log(val)
      let range = val.getSelection()
      if (range) {
        if (range.length === 0) {
          console.log('User cursor is at index', range.index)
          this.length = range.index
        } else {
          var text = val.getText(range.index, range.length)
          console.log('User has highlighted: ', text)
          this.length = range.index
        }
      } else {
        this.length = val.getText().length
      }
      console.log(this.length)
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
      createArticle(parmas).then(res => {
        // DEBUG:
        console.log('发表文章: ' + res)
        if (res.id > 0) {
          this.$router.push({path: '/postDetail/', query: {postid: res.id}})
        }
      })
    },

    /**
     * 弹出上传图片框
     */
    showUploadDialog () {
      this.dialogUploadImage = true
    },
    /**
     * 上传前
     */
    beforeUpload () {
      console.log('上传 开始')
      this.headers.Authorization = '' // value of token
    },
    /**
     * 上传成功
     */
    handleUploadSuccess (res, file, fileList) {
      console.log('上传 成功')
      let quill = this.$refs.myQuillEditor.quill
      // if success
      if (res.code === 200 && res.url !== null) {
        // insert image into editor
        quill.insertEmbed(this.length, 'image', res.url)
        // adjust the cursor into last position
        quill.setSelection(this.length + 1)
        // clear the filelist
        this.$refs.upload.clearFiles()
      } else {
        this.$message.error(res.message)
      }
    },
    /**
     * 上传失败
     */
    handleUploadError (err) {
      console.log('上传 失败')
      this.$message.error(err)
    },
    /**
     * 确定上传
     */
    confirmUpload () {
      // element-ui upload methods
      // DEBUG:
      console.log('上传 确定')
      this.$refs.upload.submit()
      this.dialogUploadImage = false
    },
    cancleUpload () {
      // DEBUG:
      console.log('上传 取消')
      this.dialogUploadImage = false
    }

  },
  computed: {
  },
  components: {
    'quill-editor': quillEditor
    // 'mavon-editor': mavonEditor
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
    font-weight: bold;
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
