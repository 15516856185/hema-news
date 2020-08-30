<template>
  <div class="edit">
<MyHeader>编辑资料</MyHeader>
<div class="img">
    <img :src="$axios.defaults.baseURL+edit.head_img" alt="">
</div>
<navitem @amend='nickname'>
    <template>昵称</template>
    <template #conten> {{edit.nickname}}</template>
</navitem>
<navitem @amend='two'>
     <template>密码</template>
    <template #conten> ******</template>
</navitem>
<navitem>
     <template>性别</template>
    <template #conten>
        {{edit.gender === 1?'男':'女'}}
    </template>
</navitem>
  <van-dialog v-model="isshow" title="修改昵称" show-cancel-button @confirm='revamp'>
   <van-field v-model="value" placeholder="请输入用户名" />
   </van-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      edit: '',
      isshow: false,
      value: ''
    }
  },
  created () {
    this.addfn()
  },
  methods: {
    async addfn () {
      const id = localStorage.getItem('id')
      const res = await this.$axios.get(`/user/${id}`)
      const { statusCode, data } = res.data
      //   console.log(res)
      //   console.log(data)
      //   console.log(statusCode)
      if (statusCode === 200) {
        this.edit = data
        // console.log(this.edit)
      }
    },
    nickname () {
      this.isshow = true
      this.value = this.edit.nickname
    },
    async revamp () {
      const res = await this.$axios.post(`/user_update/${this.edit.id}`, {
        nickname: this.value
      })
      //   console.log(res)
      if (res.data.statusCode === 200) {
        this.addfn()
      }
    },
    two () {
      console.log(222)
    }
  }

}
</script>

<style lang='less' scoped>
.img {

    // overflow: hidden;
    text-align: center;
    // margin: 40px;
    padding: 40px 0;
    // margin: 0 auto;
    img {
        // width: 100%;
        // height: 100%;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    }
}
/deep/ .van-dialog__content {
    padding: 15px;
    .van-field {
  border: 1px solid #ccc;
}
}

</style>
