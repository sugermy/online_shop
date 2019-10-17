<template>
  <div id="app">
    <router-view class="main-wrap" />
    <TabBar v-show="showTab" :menulist="menulist" />
  </div>
</template>
<script>
import TabBar from '@/components/TabBar.vue'

export default {
	components: {
		TabBar
	},
	data() {
		return {
			menulist: [],
			showTab: true
		}
	},
	created() {
		// 获取数据赋值barlist
		this.menulist = [
			{ menuName: '首页', menuPath: '/home', parent: 'home', activeIcon: 'home_active', normalIcon: 'home_normal' },
			{ menuName: '订单', menuPath: '/order', parent: 'order', activeIcon: 'order_active', normalIcon: 'order_normal' },
			{ menuName: '我的', menuPath: '/mine', parent: 'mine', activeIcon: 'mine_active', normalIcon: 'mine_normal' }
		]
	},
	watch: {
		$route(v) {
			let name = v.name
			if (name == 'homeView' || name == 'orderView' || name == 'mineView') {
				this.showTab = true
			} else {
				this.showTab = false
			}
		}
	}
}
</script>
<style lang="less">
#app {
	font-family: 'PingFangSC-Regular', 'PingFangSC', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #666;
	.main-wrap {
		height: calc(100vh - 49px);
		background: #ecf2f6;
		overflow-y: auto;
		overflow-x: hidden;
		padding: 0 14px;
		box-sizing: border-box;
	}
}
</style>
