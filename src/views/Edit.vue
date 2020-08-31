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
<navitem @amend='updatapassword'>
     <template>密码</template>
    <template #conten> ******</template>
</navitem>
<navitem  @amend='gender'>
     <template>性别</template>
    <template #conten>
        {{edit.gender === 1?'男':'女'}}
    </template>
</navitem>
  <van-dialog v-model="isshow" title="修改昵称" show-cancel-button @confirm='revamp'>
   <van-field v-model="value" placeholder="请输入新用户名" :rules="rules.username"/>
   </van-dialog>
   <van-dialog v-model="isshowpassword" title="修改密码" show-cancel-button @confirm='uppassword'>
   <van-field v-model="valuepassword" placeholder="请输入新密码" type=number :rules="rules.password"/>
</van-dialog>
<van-dialog v-model="isshowgender" title="修改性别" show-cancel-button @confirm='upgender'>
<van-radio-group v-model="radio">
  <van-radio :name="1">男</van-radio>
  <van-radio :name="0">女</van-radio>
</van-radio-group>
</van-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      edit: '',
      isshow: false,
      value: '',
      isshowpassword: false,
      valuepassword: '',
      isshowgender: false,
      radio: 1,
      rules: {
        username: [
          { required: true, message: '请填写用户名', trigger: 'onChange' },
          { pattern: /^\d{5,11}$/, message: '用户名长度为5-11位数字', trigger: 'onChange' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'onChange' },
          { pattern: /^\d{3,9}$/, message: '密码长度为3-9位数字', trigger: 'onChange' }
        ]
      }

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
      // console.log(res)
      //   console.log(data)
      //   console.log(statusCode)
      if (statusCode === 200) {
        this.edit = data
        // console.log(this.edit)
      }
    },
    async fengzhuang (data) {
      const res = await this.$axios.post(`/user_update/${this.edit.id}`, data)
      //   console.log(res)
      if (res.data.statusCode === 200) {
        this.addfn()
        this.$toast.success('修改成功')
      }
    },
    nickname () {
      this.isshow = true
      this.value = this.edit.nickname
    },
    revamp () {
      this.fengzhuang({ nickname: this.value })
    },
    updatapassword () {
      this.isshowpassword = true
      this.valuepassword = this.edit.password
    },
    uppassword () {
      this.fengzhuang({ password: this.valuepassword })
    },
    gender () {
      this.isshowgender = true
      // console.log(this.edit)
      this.radio = this.edit.gender
    },
    upgender () {
      this.fengzhuang({ gender: this.radio })
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
