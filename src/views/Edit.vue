<template>
  <div class="edit">
    <MyHeader>编辑资料</MyHeader>
    <div class="img">
      <img :src="$axios.defaults.baseURL+edit.head_img" alt />
      <van-uploader :after-read="afterRead" />
    </div>
    <navitem @amend="nickname">
      <template>昵称</template>
      <template #conten>{{edit.nickname}}</template>
    </navitem>
    <navitem @amend="updatapassword">
      <template>密码</template>
      <template #conten>******</template>
    </navitem>
    <navitem @amend="gender">
      <template>性别</template>
      <template #conten>{{edit.gender === 1?'男':'女'}}</template>
    </navitem>
    <van-dialog v-model="isshow" title="修改昵称" show-cancel-button @confirm="revamp">
      <van-field v-model="value" placeholder="请输入新昵称" ref="nickname"/>
    </van-dialog>
    <van-dialog v-model="isshowpassword" title="修改密码" show-cancel-button @confirm="uppassword">
      <van-field v-model="valuepassword" placeholder="请输入新密码" type="number" ref="password"/>
    </van-dialog>
    <van-dialog v-model="isshowgender" title="修改性别" show-cancel-button @confirm="upgender">
      <van-radio-group v-model="radio">
        <van-radio :name="1">男</van-radio>
        <van-radio :name="0">女</van-radio>
      </van-radio-group>
    </van-dialog>
     <div class="mask" v-show='maskshow'>
       <van-button type="primary" class="corp" @click='corp'>确定</van-button>
       <van-button type="info" class="info" @click="info">取消</van-button>
    <vue-cropper
    ref= "aa"
    :img="img"
    autoCrop
    autoCropWidth="150px"
    autoCropHeight="150px"
    fixed
    ></vue-cropper>
  </div>
  </div>

</template>

<script>
import { VueCropper } from 'vue-cropper'
export default {
  components: {
    VueCropper
  },
  data () {
    return {
      edit: '',
      isshow: false,
      value: '',
      isshowpassword: false,
      valuepassword: '',
      isshowgender: false,
      radio: 1,
      maskshow: false,
      img: ''
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
    async nickname () {
      this.isshow = true
      this.value = this.edit.nickname
      await this.$nextTick()
      this.$refs.nickname.focus()
    },
    revamp () {
      if (/^[\u4e00-\u9fa5]{2,6}$/.test(this.value)) {
        this.fengzhuang({ nickname: this.value })
      } else {
        this.$toast('昵称长度为2-6位中文,请按照规定修改')
      }
    },
    async updatapassword () {
      this.isshowpassword = true
      this.valuepassword = this.edit.password
      await this.$nextTick()
      this.$refs.password.focus()
    },
    uppassword () {
      if (/^\d{3,9}$/.test(this.valuepassword)) {
        this.fengzhuang({ password: this.valuepassword })
      } else {
        this.$toast('密码长度为5-11位数字,请按照规定修改')
      }
    },
    gender () {
      this.isshowgender = true
      // console.log(this.edit)
      this.radio = this.edit.gender
    },
    upgender () {
      this.fengzhuang({ gender: this.radio })
    },
    info () {
      this.maskshow = false
    },
    name (img) {
      if (img.endsWith('.png') || img.endsWith('.jpg') || img.endsWith('..gif')) {
        return true
      } else {
        return false
      }
    },
    async afterRead (file) {
      // 此时可以自行将文件上传至服务器
      // console.log(file)
      if (!this.name(file.file.name)) {
        // return true
        return this.$toast('请按照要求上传图片')
      }
      if (file.file.size >= 20 * 1024) {
        return this.$toast('您上传的图片太大')
      }
      this.maskshow = true
      this.img = file.content
      // this.$refs.aa.getCropBlob((data) => {
      //   // do something
      //   console.log(data)
      // })
      // } else {
      //   console.log(this.$toast('请按照要求上传图片'))
      // }
      // const Data = new FormData()
      // Data.append('file', file.file)
      // const res = await this.$axios.post('/upload', Data)
      // // console.log(res)
      // const { statusCode, data } = res.data
      // if (statusCode === 200) {
      //   // console.log(data.url)
      //   this.fengzhuang({ head_img: data.url })
      // }
    },
    corp () {
      // 获取截图的blob数据
      this.$refs.aa.getCropBlob(async (info) => {
        // do something
        // console.log(info)
        const Data = new FormData()
        Data.append('file', info)
        const res = await this.$axios.post('/upload', Data)
        // console.log(res)
        const { statusCode, data } = res.data
        if (statusCode === 200) {
        // console.log(data.url)
          this.fengzhuang({ head_img: data.url })
          this.maskshow = false
        }
      })
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
.van-uploader {
  position: absolute;
  width: 100px;
  height: 100px;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
}
.mask {
  width: 100%;
  height: 100%;
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  .corp,
  .info {
    position: fixed;
    z-index: 1;
    top: 0;
 }
  .info {
    right: 0;
  }
}
</style>
