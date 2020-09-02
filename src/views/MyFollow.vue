<template>
  <div class="myfollow">
      <MyHeader>我的关注</MyHeader>
      <div class="attention" v-for="item in list" :key="item.id">
        <div class="left">
          <img :src="$base+item.head_img" alt="">
        </div>
        <div class="center">
          <p class="new">{{item.nickname}}</p>
          <p class="time">{{item.create_date|time}}</p>
        </div>
        <div class="right">
          <van-button round type="info" size="small" @click='unfollow(item.id)'>取消关注</van-button>
        </div>
      </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    async reuse () {
      const res = await this.$axios.get('/user_follows')
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
        // console.log(this.list)
      }
    },
    async unfollow (id) {
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '您确定要取消关注吗'
        })
        const res = await this.$axios.get(`/user_unfollow/${id}`)
        if (res.data.statusCode === 200) {
          this.$toast.success('取消成功')
          this.reuse()
        }
      } catch {
        this.$toast('取消操作')
      }
    }

  },
  async created () {
    this.reuse()
  }
}
</script>

<style lang='less' scoped>
.attention {
  display: flex;
  align-items: center;
  height: 130px;
  border-bottom: 1px solid #ccc;
  padding: 20px;
  .left {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .center {
    margin-left: 15px;
    font-size: 16px;
    flex: 1;
    .time {
      color: #ccc;
      margin-top: 7px;
    }
  }
}
</style>
