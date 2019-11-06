<template>
  <div class="mine">
    <div v-if="tourist.length==0" class="no-data">
      <img src="../../../assets/box.png">
      <p class="no-data-info">您还没有创建旅游护照哦~</p>
      <p class="to-tourist" @click="creatAction">
        <i class="tourist-icon"></i>
        <span class="tourist-txt">创建旅游护照</span>
      </p>
      <!-- <p class="no-data-info">注：可创建多个护照~</p> -->
    </div>
    <div v-if="tourist.length>0" class="has-data">
      <van-swipe-cell v-for="(item,index) in tourist" :key="index" :ref="`swipeCell${index}`">
        <div class="tourist-item" @click="enterDetail(item.CardID)">
          <img class="tourist-img" src="../../../assets/head_photo.jpg">
          <div class="tourist-info">
            <p class="tourist-info-name">{{item.UserName}}</p>
            <p>身份证号：{{item.UserIdCard}}</p>
            <p v-show="item.CardNo!=''">学生证：{{item.CardNo}}</p>
          </div>
          <img @click.stop="delItem(index)" class="del-img" src="../../../assets/del.png">
        </div>
        <template slot="right">
          <van-button square color="#FE354A" stop-propagation @click="delData(item.ID)" text="删除" />
        </template>
      </van-swipe-cell>
      <div class="to-tourist" @click="creatAction">
        <i class="tourist-icon"></i>
        <span class="tourist-txt">创建旅游护照</span>
      </div>
      <p class="to-tourist-remark">注：可创建多个旅游护照</p>
    </div>
  </div>
</template>
<script>
export default {
	data() {
		return {
			tourist: []
		}
	},
	mounted() {},
	created() {
		this.getList()
	},
	methods: {
		getList() {
			this.$ajax.get('Home/Passport_GetList', {}).then(res => {
				this.tourist = res.Data
			})
		},
		enterDetail(key) {
			this.$router.push({
				path: './detail',
				query: {
					keycode: key,
					MerchantCode: this.$getQuery('MerchantCode')
				}
			})
		},
		creatAction() {
			this.$router.push({
				path: './create',
				query: {
					MerchantCode: this.$getQuery('MerchantCode')
				}
			})
		},
		//点击按钮删除
		delItem(idx) {
			//操作打开当前滑动cell行
			this.$refs[`swipeCell${idx}`][0].open({ position: 'right' })
		},
		//滑动删除
		delData(id) {
			this.$dialog
				.confirm({
					title: '温馨提示',
					message: '确认删除该旅游护照吗？'
				})
				.then(() => {
					this.$ajax.get('Home/Passport_Delete', { ID: id }).then(res => {
						this.getList()
					})
				})
				.catch(() => {
					// on cancel
				})
		}
	}
}
</script>
<style lang="less" scoped src="@/style/mine/view.less">
</style>