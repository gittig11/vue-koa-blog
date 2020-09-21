<template>
  <div class="container">
    <p>读取数据库：</p>
    <div v-for="item in list" :key="item.id">
      <p class="title">{{item.title}}</p>
      <div v-html="item.body_html"></div>
    </div>
  </div>
</template>

<script>
  import axios from '@/axios.js'
  // this.axios是原生axios，而axios是封装后的

  export default {
    name: 'Display',
    data () {
      return {
        list: []
      }
    },
    mounted(){
      axios.getArticles()
      // this.axios.get('http://localhost:3000/articles')
        .then((response)=>{
          console.log(response.data);
          this.$message({
            showClose: true,
            message: `读取MongoDB数据库成功~`,
            type: 'success',
            duration: 1000
          })
          this.list = response.data
          // console.log(response.data)
        })
        .catch(()=>{
        })
    }
  }
</script>

<style lang="scss" scoped>
  .title{
    color: red;
    font-size: 24px;
  }
</style>
