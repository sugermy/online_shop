<template>
  <div class="mine">
    <div v-if="tourist.length==0" class="no-data">
      <img src="../../../assets/box.png">
      <p class="no-data-info">您还没有创建旅游护照哦~</p>
      <p class="to-tourist">
        <i class="tourist-icon"></i>
        <span class="tourist-txt">创建旅游护照</span>
      </p>
      <p class="no-data-info">注：可创建多个护照~</p>
    </div>
    <div v-if="tourist.length>0" class="has-data">
      <van-swipe-cell v-for="(item,index) in tourist" :key="index" :ref="`swipeCell${index}`">
        <div class="tourist-item" @click="enterDetail">
          <img class="tourist-img" src="../../../assets/head_photo.png">
          <div class="tourist-info">
            <p class="tourist-info-name">姓名：张满意</p>
            <p>身份证号：412382199506047516</p>
            <p>学生证：S147258963</p>
          </div>
          <img @click.stop="delItem(index)" class="del-img" src="../../../assets/del.png">
        </div>
        <template slot="right">
          <van-button square color="#FE354A" stop-propagation @click="delData" text="删除" />
        </template>
      </van-swipe-cell>
      <div class="to-tourist" @click="creatAction">
        <i class="tourist-icon"></i>
        <span class="tourist-txt">创建旅游护照</span>
      </div>
      <p class="to-tourist-remark">注：可创建多个护照</p>
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
	mounted() {},
	methods: {
		enterDetail() {
			this.$router.push({
				path: './detail',
				query: {
					id: 111
				}
			})
		},
		creatAction() {
			this.$router.push({
				path: './create',
				query: {
					id: 111
				}
			})
		},
		//点击按钮删除
		delItem(idx) {
			//操作打开当前滑动cell行
			this.$refs[`swipeCell${idx}`][0].open({ position: 'right' })
		},
		//滑动删除
		delData() {
			console.log('delete')
		}
	}
}
</script>
<style lang="less" scoped src="@/style/mine/view.less">
</style>