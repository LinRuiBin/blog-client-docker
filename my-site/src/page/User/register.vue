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
                <span v-show="show" @click="getCode">获取验证码</span>
                <span v-show="!show" class="count">{{count}} s</span>
              </el-form-item>

             <el-form-item label="密码" prop="password">
                <el-input v-model="ruleForm.password"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button class="loginBtn"  type="primary" @click="submitForm('ruleForm')">注册</el-button>
              </el-form-item>

          </el-form>

        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>

export default {
  data () {
    return {
      backtitle: '<< 回去登录',
      show: true,
      count: '',
      timer: null,
      ruleForm: {
        username: '',
        password: '',
        code: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 3, max: 15, message: '长度为11个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('通过验证')
        } else {
          alert('验证错误')
        }
      })
    },

    register () {
      this.$router.push({path: '/register/'})
    },

    backtohome () {
      this.$router.push({path: '/login/'})
    },

    getCode () {
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
  left: 30px;
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
        width: 50%;
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
