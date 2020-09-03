<template>
 <div class="div">
   <div class="box"></div>
    <div class='header'>
        <span class='iconfont iconjiantou2' @click='back'></span>
        <div class='login'><slot></slot></div>
        <i></i>
  </div>
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
.box {
  width: 100%;
  height: 50px;
}
.header{
  position: fixed;
  width: 100%;
  top: 0;
  background-color: #fff;
  z-index: 999;
  display: flex;
  line-height: 50px;
  border-bottom: 2px solid #ccc;
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
