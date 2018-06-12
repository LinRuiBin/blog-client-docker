<template>

  <el-row>
    <span class="back"  @click="backtohome" style="cursor: pointer;">{{backtitle}}</span>
    <el-col xs={span:20,offset:2} :sm={span:12,offset:6}  :md={span:10,offset:7}  :lg={span:10,offset:7}  :xl={span:10,offset:7} >
      <div class="login">
        <h1>登录</h1>
        <div class="form">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="login-ruleForm">
            <el-form-item label="用户名" prop="username">
               <el-input v-model="ruleForm.username"></el-input>
             </el-form-item>
             <el-form-item label="密码" prop="password">
                <el-input v-model="ruleForm.password"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button class="loginBtn"  type="primary" @click="submitForm('ruleForm')">登录</el-button>
                <el-button class="registerBtn"  type="primary" @click="register">去注册 >></el-button>
              </el-form-item>
          </el-form>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { login } from '../../api/accountapi.js'
import { setStore, removeStore } from '../../utils/storage'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      backtitle: '<< 回到首页',
      msg: '登录',
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapActions(['setInfo']),

    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('通过验证')
          this._login()
        } else {
          alert('验证错误')
        }
      })
    },

    register () {
      this.$router.push({path: '/register/'})
    },

    backtohome () {
      this.$router.push({path: '/'})
    },
    _login () {
      var that = this
      var parmas = {
        username: this.ruleForm.username, // 当前页码
        password: this.ruleForm.password
      }
      console.log('登录' + parmas)
      login(parmas).then((response) => {
        console.log(response)
        // 本地存储用户信息
        setStore('name', this.ruleForm.username)
        setStore('token', response.token)
        // 存储在store
        // 更新store数据
        this.$store.dispatch('setInfo')
        // this.$store.commit('SET_INFO')
        // 跳转到首页页面
        this.$router.push({path: '/home'})
      })
        .catch(function (error) {
          if ('non_field_errors' in error) {
            that.error = error.non_field_errors[0]
          }
          if ('username' in error) {
            that.userNameError = error.username[0]
          }
          if ('password' in error) {
            that.parseWordError = error.password[0]
          }
        })
    }

  },
  computed: {
  },
  components: {

  },
  created () {
    removeStore('token')
    removeStore('name')
    this.$store.dispatch('setInfo')
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

    .el-form-item {
      display: block;
    }
    .loginBtn .registerBtn {
      margin: 30px auto;
    }
  }

}

</style>
