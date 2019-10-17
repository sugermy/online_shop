<template>
  <div class="mine">
    <div v-if="tourist.length==0" class="no-data">
      <img src="../../../assets/box.png">
      <p class="no-data-info">您还没有创建旅游护照哦~</p>
      <p class="to-tourist">
        <i class="tourist-icon"></i>
        <span class="tourist-txt">创建旅游护照</span>
      </p>
    </div>
    <div v-if="tourist.length>0" class="has-data">
      <div class="tourist-item" v-for="(item,index) in tourist" :key="index" @click="enterDetail">
        <img class="tourist-img" src="../../../assets/head_photo.png">
        <div class="tourist-info">
          <p class="tourist-info-name">姓名：张满意</p>
          <p>身份证号：412382199506047516</p>
          <p>学生证：S147258963</p>
        </div>
      </div>
      <div class="to-tourist" @click="creatAction">
        <i class="tourist-icon"></i>
        <span class="tourist-txt">创建旅游护照</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
	data() {
		return {
			tourist: [{}, {}]
		}
	},
	methods: {
		enterDetail() {
			console.log('enterDetail')
		},
		creatAction() {
			console.log('creatAction')
		}
	}
}
</script>
<style lang="less" scoped>
@import url('../../../style/mine/view.less');
</style>