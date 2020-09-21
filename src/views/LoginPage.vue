<template>
  <div class="content">
    <div class="banner">
      <div class="tree">
      </div>
      <div class="desc">
        <p>欢迎登录</p>
        <p>团队博客后台管理系统</p>
      </div>
    </div>
    <div class="box">
      <div class="left"></div>
      <div class="right">
        <div class="title">Login</div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              v-model="ruleForm.password" placeholder="请输入密码"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  // import configObj from '@/config.js'
  import axios from '@/axios.js'
  
  export default {
    name: "LoginPage",
    components: {
    } ,
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入密码"));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          name: "",
          password: "",
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
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 访问后台、数据库
            axios.userLogin(this.ruleForm)
              .then( ({data}) => {
                console.log(data);
                // 登录成功就把token存到 sessionStorage
                // 这是后端返回的token
                window.sessionStorage.setItem('token', data.token)
                this.$message({
                  type: 'info',
                  message: '登录成功！',
                  duration: 1000,
                  showClose: true,
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
    }
  };
</script>

<style lang="scss">
  body {
    margin: 0;
    padding: 0;
  }
  .content {
    background-image: url("../assets/bgpic.png");
    width: 100vw;
    height: 100vh;
    position: relative;
    padding-top: 12vh;
    box-sizing: border-box;
    .banner{
      width: 650px;
      height: 81px;
      margin: 0 auto;
      padding-bottom: 20px;
      display: flex;
      justify-content: space-between;
      .tree{
        background-image: url("../assets/tree.png");
        width: 143px;
        height: 81px;
      }
      .desc{
        padding-top: 20px;
        text-align: right;
        font-size: 24px;
        font-family: 'FZCuHeiSong';
        color: #fff;
        line-height: 31px;
        p{
          margin: 0;
        }
      }
    }
    .box{
      margin: 0 auto;
      width: 650px;
      height: 330px;
      background-color: #fff;
      border-radius: 13px;
      .left{
        background-image: url("../assets/dsbg.png");
        width: 330px;
        height: 330px;
        float: left;
        border-radius: 13px;
      }
      .right{
        float: left;
        .title{
          font-size: 36px;
          color: #4D81F9;
          margin: 40px 40px 20px;
        }
      }
    }
  }
  .el-form{
    .el-form-item__content{
      margin-left: 40px !important;
      .el-input__inner{
        width: 240px;
        height: 40px;
        background: #FFFFFF;
        border-radius: 19px;
      }
    }
    .el-button{
      width: 240px;
      background: #3868F9;
      border-radius: 19px;
      font-size: 18px;
      font-family: 'FZCuHeiSong';
      color: #FFFFFF;
    }
  }

  .el-checkbox__label {
  }
  .el-checkbox {
    margin: 10px 0;
    .el-checkbox__label{
      font-size: 16px;
    }
  }
  .select-all {
    font-size: 18px;
    line-height: 20px;
    font-weight: 500;
  }
</style>
