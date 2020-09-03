<template>
  <div class="index">
      <div class="header">
          <div class="logo">
              <span class="iconfont iconnew"></span>
          </div>
          <div class="search">
              <span class="iconfont iconsearch"></span>
              <span>搜索新闻</span>
          </div>
          <div class="person">
              <span class="iconfont iconwode"></span>
          </div>
      </div>
<van-tabs v-model="active" sticky animated swipeable  @click="onClick">
  <van-tab :title="item.name" v-for='item in list' :key='item.id'>
       <index :post='item1' v-for='item1 in newlist' :key='item1.id'></index>
  </van-tab>

</van-tabs>
  </div>
</template>

<script>
export default {

  data () {
    return {
      active: 0,
      list: [],
      pageIndex: 1,
      pageSize: 20,
      newlist: []
    }
  },
  methods: {
    async add () {
      const res = await this.$axios.get('/category')
      //   console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
        this.getlist(data[0].id)
        // console.log(this.list)
      }
    },
    async getlist (id) {
      const res = await this.$axios.get('/post', {
        params: {
          category: id,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      //   console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.newlist = data
        // console.log(this.newlist)
      }
    },
    onClick (name, title) {
      this.getlist(name)
    }
  },
  created () {
    this.add()
  }
}
</script>

<style lang='less' scped>
.header {
    width: 100%;
    height: 50px;
    background-color: red;
    display: flex;
    align-items: center;
    .logo {
        width: 80px;
        text-align: center;
       span {
        color: white;
        font-size: 50px;
      }
    }
    .search {
        height: 34px;
        flex: 1;
        text-align: center;
        background-color: rgba(255, 255, 255, .6);
        border-radius: 18px;
        font-size: 16px;
        line-height: 34px;
        color: white;
        .iconsearch {
            margin-right: 10px;
            font-size: 18px;
        }
    }
    .person {
        width: 80px;
        text-align: center;
        span {
             color: white;
             font-size: 30px;
        }
    }
}
</style>
