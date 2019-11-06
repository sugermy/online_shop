<template>
  <div class="mine-detail">
    <van-cell-group class="list">
      <van-field v-model="person.password" readonly label="头像" input-align="right">
        <van-image slot="input" width="60" height="60" fit="cover" round :src="require('../../../assets/head_photo.png')" />
      </van-field>
      <van-field v-model="person.UserName" readonly label="姓名" input-align="right" />
      <van-field v-model="person.Gender" readonly label="性别" input-align="right" />
      <van-field v-model="person.Province" readonly label="省份" input-align="right" />
      <van-field v-model="person.Cicy" readonly label="城市" input-align="right" />
      <van-field v-model="person.UserPhone" readonly label="手机号" input-align="right" />
      <van-field v-model="person.UserIdCard" readonly label="身份证" input-align="right" />
      <!-- <van-field v-model="person.CardNo" readonly label="学生证" input-align="right" /> -->
      <van-field v-model="person.MerchantName" readonly label="签发景区" input-align="right" />
      <van-field v-model="person.CardID" readonly label="旅游护照号" input-align="right" />
      <van-field v-model="person.CreateTime" readonly label="创建日期" input-align="right" />
    </van-cell-group>
  </div>
</template>
<script>
export default {
	data() {
		return {
			person: {}
		}
	},
	created() {
		this.getInfo()
	},
	methods: {
		getInfo() {
			this.$ajax.get('Home/Passport_GetDetail', { KeyCode: this.$route.query.keycode }).then(res => {
				this.person = res.Data
				this.person.Gender = '*'
				this.person.Province = '*'
				this.person.Cicy = '*'
				// this.person.UserPhone = this.$encryptCard('phone', this.person.UserPhone) //密文显示
				// this.person.UserIdCard = this.$encryptCard('idcard', this.person.UserIdCard)
			})
		}
	}
}
</script>
<style lang="less" scoped src="@/style/mine/detail.less">
</style>