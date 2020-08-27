<template>
  <div>用户页面
  <span class='iconfont iconweixin'>{{age}}</span>
  <myheader></myheader>
  </div>
</template>
<script>
import myheader from '../components/NyHeader'
export default {
  data () {
    return {
      age: 18
    }
  },
  components: {
    myheader
  }
}
</script>
<style lang="">
</style>
