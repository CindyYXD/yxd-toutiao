<template>
  <div class="container">
    <el-card class="my-card">
      <img src="../../assets/imgages/logo_index.png" alt />
      <el-form ref="loginForm" :model="loginform" :rules="loginRules" status-icon>
        <el-form-item prop="mobile">
          <el-input v-model="loginform.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            v-model="loginform.code"
            prop="code"
            placeholder="请输入验证码"
            style="width:235px; margin-right:10px;"
          ></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button @click="login" type="primary" style="width:360px;">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    // 定义一个校验函数
    const checkMobile = (rule, value, callback) => {
      if (!/^1[3-9]\d{9}$/.test(value)) {
        return callback(new Error('手机号不合法'))
      }
      callback()
    }
    return {
      loginform: {
        mobile: '',
        code: ''
      },
      loginRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'change' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '验证码为六位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      // 调用 validate 对整体表进行校验
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          // 校验成功  调用登录接口
          this.$http.post('http://ttapi.research.itcast.cn/mp/v1_0/authorizations', this.loginform)
            .then((res) => {
              // 成功 跳转
              // 注意 登录 不够完善
              this.$router.push('/')
            })
            .catch((e) => {
              // 失败 提示
              this.$message.error('手机号或验证码错误')
            })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  background: url("../../assets/imgages/login_bg.jpg") no-repeat center / cover;
  position: absolute;
  left: 0;
  top: 0;
  .my-card {
    width: 400px;
    height: 350px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    img {
      width: 200px;
      display: block;
      margin: 0 auto 20px;
    }
  }
}
</style>
