<template>
  <div id="app">
    <!-- <Header /> -->
    <!-- <LoginPage /> -->
    <router-view></router-view>
  </div>
</template>

<script>
// import Header from "./components/Header.vue";
// import LoginPage from "./views/LoginPage.vue";

export default {
  name: "app",
  components: {
    // Header,
    // LoginPage
  },
  data(){
    return {
    }
  },
};
</script>

<style lang="scss">
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    // text-align: center;
    color: #2c3e50;
  }
</style>
