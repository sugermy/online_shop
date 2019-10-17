<template>
  <ul class="tab-bar">
    <router-link tag="li" v-for="(item,index) in menulist" :key="index" :to="{path:item.menuPath}">
      <img class="tab-icon" :src="$route.meta.parent==item.parent?require(`../assets/${item.activeIcon}.png`):require(`../assets/${item.normalIcon}.png`)" />
      <p class="tab-name">{{item.menuName}}</p>
    </router-link>
  </ul>
</template>
<script>
export default {
	props: {
		menulist: Array
	}
}
</script>
<style lang="less" scoped>
.tab-bar {
	width: 100%;
	height: 49px;
	position: fixed;
	bottom: 0;
	background: #ffffff;
	display: flex;
	justify-content: space-between;
	align-items: center;
	li {
		cursor: pointer;
		width: 33%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.tab-icon {
			height: 20px;
		}
		.tab-name {
			font-size: 12px;
			color: rgba(190, 190, 190, 1);
			margin-top: 4px;
		}
	}
}
</style>