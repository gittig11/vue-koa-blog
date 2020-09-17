<template>
  <div v-html="body_html"></div>
</template>

<script>
import configObj from '@/config.js'

export default {
  name: 'Articles',
  data () {
    return {
      body_html: '',
      id: this.$route.params.id
    }
  },
  mounted() {
    this.axios.get(`${configObj.docsUrl}${this.id}`,{
      headers: {
        'X-Auth-Token': configObj.yuqueToken
      },
      params: {
        raw: 1,  // Markdown格式
      }
    }).then((response)=>{
      // console.log(response.data.data);
      let {body_html} = response.data.data
      this.body_html = body_html
      // console.log(body_html);
    }).catch((response)=>{
      console.log(response);
    })
  }
}
</script>

<style lang="css" scoped>
</style>