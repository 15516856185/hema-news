<template>
  <div class="user">
    <div class="header" @click="$router.push('/edit')">
      <div class="avatar">
        <img :src="base + user.head_img" alt="">
      </div>
      <div class="info">
        <div class="name">
          <span v-if='user.grnder === 1' class="iconfont iconxingbienan"></span>
          <span v-else class="iconfont iconxingbienv"></span>
          <span>{{user.nickname}}</span>
        </div>
        <div class="time">
          {{user.create_date|time}}
        </div>
      </div>
      <div class="arrow">
        <span class="iconfont iconjiantou1"></span>
      </div>
    </div>
    <navitem to='/myfloow'>
        <template >我的关注</template>
        <template #conten>关注的用户</template>
    </navitem>
    <navitem>
         <template>我的跟帖</template>
        <template #conten>跟帖/回复</template>
    </navitem>
    <navitem>
        <template>我的收藏</template>
        <template #conten>收藏视频</template>
    </navitem>
    <navitem to='/edit'>
        <template >设置</template>
    </navitem>
   <div class="butt">
      <van-button type="primary" block @click='clickfn'>退出</van-button>
   </div>
  </div>

</template>

<script>
export default {
  computed: {
    base () {
      return this.$axios.defaults.baseURL
    }
  },
  data () {
    return {
      user: ''
    }
  },
  async created () {
    const id = localStorage.getItem('id')
    // console.log(id)
    // const token = localStorage.getItem('token')
    // console.log(token)
    const res = await this.$axios.get(`/user/${id}`)
    // console.log(res)
    const { statusCode, data } = res.data
    if (statusCode === 200) {
      this.user = data
    //   console.log(this.user)
    }
  },
  methods: {
    async clickfn () {
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '您确定要取消吗'
        })
        // this.$toast.success('退出成功')
        localStorage.removeItem('token')
        localStorage.removeItem('id')
        this.$router.push('/login')
      } catch {
        // this.$toast('取消退出')
      }
    }
  }
}
</script>

<style lang='less' scoped>
.user {
  .header {
    display: flex;
    align-items: center;
    padding: 20px;
    border-bottom: 3px solid #ddd;
    .avatar {
      width: 70px;
      height: 70px;
      img {
        border-radius: 50%;
        width: 100%;
        height: 100%;
      }
    }
    .info {
      flex: 1;
      padding-left: 10px;
      font-size: 14px;
      .time {
        margin-top: 10px;
        color: #666;
      }
      .iconxingbienan {
        color: #7bbcec;
      }
      .iconxingbienv {
          color: pink;
      }
    }
  }
  .butt {
    margin: 20px;
 }
}
</style>
