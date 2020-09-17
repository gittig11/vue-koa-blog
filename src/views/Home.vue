<template>
  <div class="home">
    <el-row>
      <el-button type="primary" round @click="handleClick">同步文章</el-button>
      <el-button type="primary" round @click="doPersistence">文章持久化</el-button>
      <el-button type="primary" round @click="doNotPersistence">取消持久化</el-button>
    </el-row>
    
    <el-checkbox v-if="list.length>0" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">
      <span class="select-all">全选</span>
    </el-checkbox>

    <el-checkbox-group v-model="checkedLabels" @change="handleCheckedLabelsChange">
      <li v-for="item in list" :key="item.id">
        <el-checkbox :label="item.id">
          <router-link target="_blank" :to="'/articles/'+item.id">
            {{item.title}}
          </router-link>
        </el-checkbox>
      </li>
    </el-checkbox-group>
  </div>
</template>

<script>
  import configObj from '@/config.js'
  import axios from '@/axios.js'
  
  export default {
    name: "Home",
    components: {
      // HelloWorld,
    } ,
    data() {
      return {
        blogs: [],
        list: [],
        labels: [],
        checkAll: false,
        isIndeterminate: false,  //部分选择的状态
        checkedLabels: [],  //已选择的复选框
        checkedBlogs: [],  //已选择的复选框
      }
    },
    methods: {
      doNotPersistence(){
        if(this.checkedLabels.length === 0){
          this.$message({
            showClose: true,
            message: '请选择想要取消持久化的文章~',
            type: 'warning'
          })
          return false;
        }
        console.log("doNotPersistence");
        let checkBlogs = this.blogs.filter(blog => this.checkedLabels.includes(blog.id))
        console.log(checkBlogs);
        for(let i=0; i<this.checkedLabels.length; i++){
          axios.removeAnArticle(this.checkedLabels[i])
            .then(()=>{
              // console.log(response);
              this.$message({
                showClose: true,
                message: `文章 ${checkBlogs[i].title} 取消持久化完成~`,
                type: 'success',
                duration: 1500
              })
            })
            .catch((err)=>{
              // console.log(err)
              if(err.status === 404){
                this.$message({
                  showClose: true,
                  message: `文章 ${checkBlogs[i].title} 已经取消持久化~`,
                  type: 'warning',
                  duration: 1500
                })
              }
            })
        }  // endfor
      },
      doPersistence(){
        // 持久化之前需要选择某些文章
        if(this.checkedLabels.length === 0){
          this.$message({
            showClose: true,
            message: '请选择想要持久化的文章~',
            type: 'warning'
          })
          return false;
        }
        console.log("doPersistence");
        // console.log(this.blogs);

        // 复选框选中的文章
        let checkBlogs = this.blogs.filter(blog => this.checkedLabels.includes(blog.id))
        console.log(checkBlogs);
        // 
        // 文章存入数据库后，前端读取数据库并展示
        for(let i=0; i<checkBlogs.length; i++){
          axios.postAnArticle(checkBlogs[i])
          // this.axios.post('http://localhost:3000/articles', checkBlogs[i])
            .then(()=>{
              // console.log(response);
              this.$message({
                showClose: true,
                message: `文章 ${checkBlogs[i].title} 持久化完成~`,
                type: 'success',
                duration: 1000
              })
            })
            .catch((err)=>{
              if(err.status === 409){
                this.$message({
                  showClose: true,
                  message: `文章 ${checkBlogs[i].title} 已经持久化~`,
                  type: 'warning',
                  duration: 1000
                })
              }
            })
        }  // endfor
        // console.log(this.checkedLabels)
      },
      handleCheckAllChange(val){
        //@change="handleCheckAllChange"-->选中状态val为true，未选中为false
        // console.log(val)
        this.checkedLabels = val ? this.labels : [];
        this.isIndeterminate = false;
      },
      handleCheckedLabelsChange(value){
        // console.log(value);  //已勾选的复选框的label组成的数组
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.labels.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.labels.length;
      },
      handleClick(){
        // console.log("handleClick");
        this.$message({
          showClose: true,
          message: `同步文章中~`,
          type: 'success',
          duration: 1000
        })
        // 获取id、title等数据
        this.axios.get(`${configObj.docsUrl}`,{
          headers: {
            'X-Auth-Token': configObj.yuqueToken
          }
        }).then((response)=>{
          // console.log(response.data.data);
          this.list = response.data.data
          this.labels = this.list.map((item) => item.id)
          // console.log(this.labels)
        })
        .then(()=>{
          // 统一文档格式
          for(let i=0; i<this.list.length; i++){
            let blog = {}
            blog.id = this.list[i].id
            blog.title = this.list[i].title
            this.axios.get(`${configObj.docsUrl}${blog.id}`,{
              headers: {
                'X-Auth-Token': configObj.yuqueToken
              },
              params: {
                raw: 1,  // Markdown格式
              }
            })
            .then((response)=>{
              let resData = response.data.data
              blog.body_markdown = resData.body
              blog.body_html = resData.body_html
              this.blogs.push(blog)
            })
          }
        })
        .catch((response)=>{
          console.log(response);
        })
      }
    }
  };
</script>

<style lang="scss">
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
