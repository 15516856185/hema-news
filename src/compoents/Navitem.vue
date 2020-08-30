<template>
  <div class="box" @click='clickFn'>
      <div class="title"><slot></slot></div>
      <div class="conten" ><slot name='conten'></slot></div>
      <div class="icon">
          <span class="iconfont iconjiantou1"></span>
      </div>
  </div>
</template>

<script>
export default {
  methods: {
    clickFn () {
      if (this.to) {
        this.$router.push(this.to)
      }
      this.$emit('amend')
    }
  },
  props: {
    to: String
  }
}
</script>

<style lang='less' scoped>
.box {
    display: flex;
    margin-left: 20px;
    border-bottom: 1px solid #ccc;
    height: 50px;
    align-items: center;
    font-size: 16px;
    .tiele {
       width: 70px;
       color: #333;
    }
    .conten {
        flex: 1;
        text-align: right;
        font-size: 14px;
        color: #ccc;
        padding-right: 10px;
    }
    .icon {
        font-size: 20px;
        padding-right: 10px;
         color: #ccc;
    }
}
</style>
