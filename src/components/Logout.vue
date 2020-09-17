<template>
  <div>
    <!-- <p @click="fff()">请重新登录...</p> -->
  </div>
</template>

<script>
export default {
  name: 'Logout',
  data () {
    return {
    }
  },
  methods:{
    // fff(){
    //   this.$store.dispatch('changeLoginStatus', true)
    //   console.log(this.$store.state.loginStatus)
    // }
  },
  mounted() {
    // 退出登录时清除token，同时路由跳转到/login
    window.localStorage.removeItem("token");
    // this.$store.dispatch('changeLoginStatus', true)
    // this.$store.commit('LOGINSTATUS', true)
    this.$router.push('/login')
  }
}
</script>

<style lang="scss" scoped>

</style>