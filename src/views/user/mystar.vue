<template>
  <div class="mystar">
 <MyHeader>我的收藏</MyHeader>
 <div class="item" v-for='item in list' :key='item.id'>
     <div class="left">
         <div class="title">{{item.title}}</div>
         <div class="name">
             <span style=' margin-right: 10px'>{{item.user.nickname}}</span>
             <span>{{item.comments.length}}跟帖</span>
         </div>
     </div>
     <div class="photo">
         <img :src="$url(item.cover[0].url)" alt="">
     </div>
 </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: ''
    }
  },
  created () {
    this.add()
  },
  methods: {
    async add () {
      const res = await this.$axios.get('/user_star')
      //   console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
        console.log(this.list)
      }
    }
  }
}
</script>

<style lang='less' scoped>
.item {
    display: flex;
    border-bottom: 1px solid #ccc;
    padding: 20px;
    justify-content: space-between;
    .left{
     font-size: 16px;
     display: flex;
     flex-direction: column;
     justify-content: space-between;
     .name {
         font-size: 14px;

     }
    }
    .photo {
        img {
           width: 126px;
           height: 74px;
            object-fit: cover;
        }
    }
}
</style>
