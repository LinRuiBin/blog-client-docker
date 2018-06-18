<template>

  <el-row>
    <span class="back"  @click="backtohome" style="cursor: pointer;">{{backtitle}}</span>
    <el-col xs={span:20,offset:2} :sm={span:12,offset:6}  :md={span:10,offset:7}  :lg={span:10,offset:7}  :xl={span:10,offset:7} >
      <div class="login">
        <h1>注册</h1>
        <div class="form">

          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="login-ruleForm">

            <el-form-item label="手机号" prop="username">
               <el-input v-model="ruleForm.username"></el-input>
             </el-form-item>

             <el-form-item label="验证码" prop="code" class="codeform">
                <el-input class="codeinput" v-model="ruleForm.code">
                </el-input>
                <span v-show="show" @click="_getCode">获取验证码</span>
                <span v-show="!show" class="count">{{count}} s</span>
              </el-form-item>

             <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="ruleForm.password"></el-input>
              </el-form-item>

              <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button class="loginBtn"  type="primary" :loading="loading" @click="submitForm('ruleForm')">注册</el-button>
              </el-form-item>

          </el-form>

        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { register, getMessage } from '/api/accountapi.js'
import { setStore } from '../../utils/storage'
import { mapActions } from 'vuex'
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      backtitle: '<< 回去登录',
      show: true,
      loading: false,
      count: '',
      timer: null,
      ruleForm: {
        username: '',
        password: '',
        checkPass: '',
        code: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 11, max: 11, message: '长度为11个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 4, max: 6, message: '请输入认证码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapActions(['setInfo']),

    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.register()
        } else {

        }
      })
    },

    register () {
      var parmas = {
        username: this.ruleForm.username,
        password: this.ruleForm.password,
        code: this.ruleForm.code
      }
      var that = this
      this.loading = true
      register(parmas).then(res => {
        that.loading = false
        if (res.status === 200) {
          this.$message({
            message: '注册成功',
            type: 'success'
          })
        }
        // 本地存储用户信息
        setStore('name', res.data.username)
        setStore('token', res.data.token)
        // 存储在store
        // 更新store数据
        this.$store.dispatch('setInfo')
        // this.$store.commit('SET_INFO')
        // 跳转到首页页面
        this.$router.push({path: '/home'})
        console.log('注册结果: ' + res)
      }).catch(error => {
        that.loading = false
        if ('code' in error) {
          alert(error.code[0])
        }
        if ('username' in error) {
          alert(error.username[0])
        }
        if ('password' in error) {
          alert(error.password[0])
        }
        console.log('注册失败' + error)
      })
    },

    backtohome () {
      this.$router.push({path: '/login/'})
    },

    _getCode () {
      this.getCode()
      const TIME_COUNT = 60
      if (!this.timer) {
        this.count = TIME_COUNT
        this.show = false
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--
          } else {
            this.show = true
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
    },

    getCode () {
      var params = {
        mobile: this.ruleForm.username
      }

      getMessage(params).then(res => {
        console.log('获取验证码')
      }).catch(error => {
        console.log('获取验证码失败' + error)
      })
    }

  },
  computed: {
  },
  components: {

  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.back {
  position: absolute;
  float: left;
  color: #666;
  font-weight: bold;
  left: 10px;
  top: 10px;
  &:hover {
    color: #3489EE;
  }
}
.login {
  // background-color: gray;
  margin-top: 10vh;
  margin-left: 20px;
  margin-right: 20px;
  h1 {
    font-size: 30px;
    font-weight: bold;
    color: #666;
    text-align: center;
  }

  .form {
    margin: 30px 20px;
    color: #666;
    font-weight: bold;

    .codeform {
      .codeinput {
        float: left;
        width: 40%;
      }
      span {
        display: block;
        float: left;
        margin-left: 10px;
        background-color: #3489EE;
        border-radius: 5px;
        color: white;
        padding-left: 10px;
        padding-right: 10px;
      }
      .count {
        background-color: gray;
      }
    }

    .el-form-item {
      display: block;
    }
    .loginBtn {
      width: 200px;
    }
  }

}

</style>
