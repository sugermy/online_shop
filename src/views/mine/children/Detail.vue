<template>
  <div class="mine-detail">
    <van-cell-group class="list">
      <van-field v-model="person.password" readonly label="头像" input-align="right">
        <van-image slot="input" width="80" height="80" fit="cover" round :src="require('../../../assets/head_photo.png')" />
      </van-field>
      <van-field v-model="person.password" readonly label="姓名" input-align="right" />
      <van-field v-model="person.password" readonly label="性别" input-align="right" />
      <van-field v-model="person.password" readonly label="省份" input-align="right" />
      <van-field v-model="person.password" readonly label="城市" input-align="right" />
      <van-field v-model="person.password" readonly label="手机号" input-align="right" />
      <van-field v-model="person.password" readonly label="身份证" input-align="right" />
      <van-field v-model="person.password" readonly label="学生证" input-align="right" />
      <van-field v-model="person.password" readonly label="签发景区" input-align="right" />
      <van-field v-model="person.password" readonly label="旅游护照号" input-align="right" />
      <van-field v-model="person.password" readonly label="创建日期" input-align="right" />
    </van-cell-group>
  </div>
</template>
<script>
export default {
	data() {
		return {
			person: {
				password: '小笼包'
			}
		}
	}
}
</script>
<style lang="less" scoped>
@import url('../../../style/mine/detail.less');
</style>