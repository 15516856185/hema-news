<template>
   <div class="photo">
        <MyHeader >图片上传</MyHeader>
    <div class="demo">
        <van-button type="primary" @click='fn'>确定</van-button>
        <VueCropper
        ref='cropper'
        autoCrop
        fixed
        canMove='false'
        img='https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1593106255,4245861836&fm=26&gp=0.jpg'></VueCropper>
    </div>
   </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
export default {
  components: {
    VueCropper
  },
  // 获取截图的base64 数据
  methods: {
    fn () {
      this.$refs.cropper.getCropData((data) => {
      // do something
        console.log(2, data)
      })
      // 获取截图的blob数据
      this.$refs.cropper.getCropBlob((data) => {
        // do something
        console.log(1, data)
      })
    }
  }
}
</script>

<style lang ='less' scoped>
.demo {
    width: 100%;
    height: 100%;
   position: fixed;
    z-index: 12;

}
</style>
