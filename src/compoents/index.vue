<template>
<div class="index">
 <div class="single-post-img" v-if='post.cover.length < 3'>
    <div class="left">
        <div class="title">{{post.title}}</div>
        <div class="name">
             <span style=' margin-right: 10px'>{{post.user.nickname}}</span>
             <span>{{post.comment_length}}跟帖</span>
         </div>
    </div>
    <div class="photo">
         <img :src="$url(post.cover[0].url)" alt="">
    </div>
</div>
   <div class="more-post-img" v-else>
          <div class="title">{{post.title}}</div>
          <div class="imgs">
              <img :src="$url(post.cover[0].url)" alt="">
               <img :src="$url(post.cover[1].url)" alt="">
                <img :src="$url(post.cover[2].url)" alt="">
          </div>
            <div class="name">
             <span style=' margin-right: 10px'>{{post.user.nickname}}</span>
             <span>{{post.comment_length}}跟帖</span>
         </div>
      </div>
</div>
</template>

<script>
export default {
  props: {
    post: Object
  }
//   created () {
//     console.log(this.post)
//   }
}
</script>

<style lang='less' scoped>
.single-post-img {
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
           width: 112px;
           height: 72px;
            object-fit: cover;
        }
    }
}
.more-post-img {
    font-size: 16px;
    border-bottom: 1px solid #ccc;
    padding: 15px;
    .imgs {
        margin-top: 10px;
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
     img {
        width: 112px;
        height: 72px;
        object-fit: cover;
     }
    }
     .name {
         font-size: 14px;

     }
}
</style>
