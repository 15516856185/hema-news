<template>
  <div class="mycomment">
      <MyHeader>我的跟帖</MyHeader>
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  :immediate-check="false"
  @load="onLoad"
><div class="list" v-for='item in list' :key = 'item.id'>
         <div class="item">
            <div class="time">{{item.create_date|time('YYYY-MM-DD hh:mm')}}</div>
            <div class="comment" v-if='item.parent'>
                <div class="name">回复：{{item.parent.user.nickname}}</div>
                <div class="comment-conent">{{item.parent.content}}</div>
            </div>
            <div class="content">{{item.content}}</div>
            <div class="original">
              <span class="one-txt-cut">原文：{{item.post.title}}</span>
              <span class="iconfont iconjiantou1"></span>
          </div>
         </div>
      </div>
      </van-list>
      </van-pull-refresh>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      pageIndex: 1,
      pageSize: 6,
      refreshing: false
    }
  },
  methods: {
    async add () {
      const res = await this.$axios.get('/user_comments', {
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      // console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = [...this.list, ...data]
        // console.log(this.list)
        // console.log(data)
        this.loading = false
        if (data.length < this.pageSize) {
          this.finished = true
        }
        this.refreshing = false
      }
    },
    onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      this.pageIndex++
      setTimeout(() => {
        this.add()
      }, 1000)
    },
    onRefresh () {
      setTimeout(() => {
        this.list = []
        this.pageIndex = 1
        this.loading = true
        this.finished = false
        this.add()
      }, 1000)
    }
  },
  created () {
    this.add()
  }

}
</script>

<style lang='less' scoped>
.mycomment {
    width: 100%;
    height: 100%;
}
.list {
    padding:20px;
    border-bottom: 1px solid #666;
    font-size: 16px;
    .time {
        color: #ccc;
        margin: 20px 0;
    }
    .comment {
        background-color: #ccc;
        padding: 20px 10px;
        .name {
            margin-bottom: 10px;
            font-size: 14px;
        }
    }
    .content {
        margin: 20px 0;
    }
    .original {
        display: flex;
        justify-content: space-between;
    }
}
</style>
