<template>
  <div class="login">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="登录" name="first">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              v-model="ruleForm.password"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="注册" name="second">
        <!-- <register></register> -->
      </el-tab-pane>
    </el-tabs>
    <!-- <el-button type="primary" round @click="getUsers()">getUsers</el-button> -->
    <!-- <el-button type="primary" round>
      <a style="text-decoration:none; color:#fff;" target="_blank" href="https://www.yuque.com/oauth2/authorize?client_id=9AtwBuu5QZ79cGQALAqs&response_type=code">OAuth登录语雀</a>
    </el-button> -->
  </div>
</template>

<script>
// import register from '@/components/register'
// import HelloWorld from '@/components/HelloWorld'
import axios from '@/axios.js'
export default {
  name: "Login",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        // if (this.ruleForm.checkPass !== "") {
        //   this.$refs.ruleForm.validateField("checkPass");
        // }
        callback();
      }
    };
    return {
      activeName: "first",
      ruleForm: {
        name: "",
        password: "",
        // checkPass: ""  //???
      },
      rules: {
        name: [
          { required: true, message: "请输入您的名称", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, validator: validatePass, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //选项卡切换
    handleClick() {},
    //重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //提交表单
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 访问后台、数据库
          axios.userLogin(this.ruleForm)
            .then( ({data}) => {
              console.log(data);
              // 登录成功就把token存到localStorage
              // 这是后端返回的token
              window.localStorage.setItem('token', data.token)
              this.$message({
                type: 'info',
                message: '登录成功！'
              });
              this.$router.push({path: "/"})
                .catch(()=>{});

              //拿到返回的token和username，并存到store
              // let token = data.token;
              // let username = data.username;
              // this.$store.dispatch('UserLogin', token);
              // this.$store.dispatch('UserName', username);
              //跳到目标页
              // this.$router.push({path: "/home"});
              // 
              // dispatch action
              // 隐藏
              // this.$store.dispatch('changeLoginStatus', false)
              //   .then(()=>{
              //     //跳到目标页
              //     this.$router.push({path: "/"})
              //       .catch(()=>{});  //捕捉并隐藏报错
              //   })
            })
            .catch(() => {
              console.log('userLogin err');
              this.$message({
                type: 'error',
                message: '账户或密码错误！'
              });
            })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  components: {
    // register
  }
};
</script>

<style lang="scss" scoped>
.login {
  width: 400px;
  margin: 0 auto;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.el-tabs__item {
  text-align: center;
  width: 60px;
}
</style>
