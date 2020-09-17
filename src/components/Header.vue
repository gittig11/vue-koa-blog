<template>
  <p>
    <router-link to="/home">Home</router-link>
    <router-link to="/about">About</router-link>
    <router-link to="/login" @click.native="hideLogin()">Login</router-link>
    <router-link to="/logout" @click.native="showLogin()">Logout</router-link>
    <router-link to="/display">Display</router-link>
  </p>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
    }
  },
  methods: {
    hideLogin(){
    },
    showLogin(){
      this.$message({
        showClose: true,
        type: 'info',
        message: '退出成功，请重新登录！'
      });
    }
  },
  mounted(){
  },
}
</script>

<style lang="scss" scoped>
  p {
    a {
      padding: 5px 0;
      margin: 10px;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .router-link-active {
    color: red;
  }
</style>
