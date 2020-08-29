<template>
  <div>
    <MyHeader>注册</MyHeader>
     <Mylogo></Mylogo>
       <van-form @submit="register">
  <van-field
    v-model="username"
    label="用户名"
    placeholder="用户名/手机号码"
    :rules="rules.username"
    />
  <van-field
    v-model="nickname"
    label="昵称"
    placeholder="昵称"
    :rules="rules.nickname"
    />
    <van-field
    v-model="password"
    type="password"
    label="密码"
    placeholder="密码"
    :rules="rules.password"
    />
  <div style="margin: 16px;">
    <van-button round block type="danger" native-type="submit">
      注册
    </van-button>
  </div>
  <p class="p">已有账号，点击<router-link to='/login' class="regi">登录</router-link></p>
</van-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      username: '',
      password: '',
      nickname: '',
      rules: {
        username: [
          { required: true, message: '请输入注册用户名', trigger: 'onChange' },
          { pattern: /^\d{5,11}$/, message: '用户名长度为5-11位数字', trigger: 'onChange' }
        ],
        password: [
          { required: true, message: '请输入注册密码', trigger: 'onChange' },
          { pattern: /^\d{3,9}$/, message: '用户名长度为5-11位数字', trigger: 'onChange' }
        ],
        nickname: [
          { required: true, message: '请输入注册昵称', trigger: 'onChange' },
          { pattern: /^[\u4e00-\u9fa5]{2,6}$/, message: '昵称长度为2-6位中文', trigger: 'onChange' }
        ]
      }
    }
  },
  methods: {
    async register () {
      const res = await this.$axios.post('/register', {
        username: this.username,
        password: this.password,
        nickname: this.nickname
      })
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        console.log(this.$router)
        // this.$router.push(`/login?username=${this.username}&password=${this.password}`)
        this.$router.push({
          name: 'login',
          params: {
            username: this.username,
            password: this.password
          }
        })
      } else {
        this.$toast.fail(message)
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .p {
    margin: 20px;
    float: right;
    font-size: 14px;
    .regi {
      color: blue;
    }
  }
</style>
