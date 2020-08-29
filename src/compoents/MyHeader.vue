<template>
  <div class='header'>
        <span class='iconfont iconjiantou2' @click='back'></span>
        <div class='login'><slot></slot></div>
        <i></i>
  </div>
</template>
<script>
export default {
  methods: {
    back () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
.header{
  display: flex;
  line-height: 50px;
    span {
    width: 50px;
    height: 50px;
    padding-left: 20px;
    font-size: 20px;
  }
  .login {
    flex: 1;
    text-align: center;
    font-size: 22px;
    font-weight: 600;
  }
  i {
    width: 50px;
    height: 50px;
  }
}
</style>
