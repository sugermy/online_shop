<template>
  <div class="box">
    <div class="header-step">
      <div class="step-item" v-for="(item,index) in steps" :key="index">
        <p class="step-num" :class="stepLink==index?'step-txt-link':''">{{index}}</p>
        <p class="step-name">{{item.name}}</p>
        <span v-if="index<3" class="step-line" :class="stepLink==index?'step-line-link':''"></span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
	data() {
		return {
			stepLink: 0,
			steps: [{ name: '我要报案' }, { name: '领款账号' }, { name: '材料上传' }]
		}
	}
}
</script>
<style lang="less" scoped>
.header-step {
	height: 60px;
	display: flex;
	justify-content: space-around;
	align-items: center;
	.step-item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
		.step-txt-link {
			background: red;
		}
		.step-line-link {
			border-color: red;
		}
		.step-num {
			width: 30px;
			height: 30px;
			border-radius: 50%;
			background: #ccc;
			color: #fff;
		}
		.step-line {
			position: absolute;
			width: 20%;
			height: 1px;
			background: transparent;
			border-bottom: 1px dashed #ccc;
		}
	}
}
</style>