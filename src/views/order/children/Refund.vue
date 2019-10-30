<template>
  <div class="refund">
    <h3 class="refund-title">请选择退款原因</h3>
    <van-radio-group v-model="radio" class="refund-list">
      <van-cell-group>
        <van-cell v-for="item in refundReason" :key="item.id" :title="item.txt" clickable @click="checkItem(item.id)">
          <van-radio slot="icon" :name="item.id" checked-color="#FF9921" style="margin-right:10px" />
        </van-cell>
      </van-cell-group>
    </van-radio-group>
    <div v-show="radio==4" class="refund-other">
      <van-cell-group class="refund-other-cell">
        <van-field v-model="value" placeholder="请输入退款原因" rows="2" autosize type="textarea" />
      </van-cell-group>
    </div>
    <div class="refund-footer">
      <p class="refund-btn" @click="refundSubmit">确认提交</p>
    </div>
  </div>
</template>
<script>
export default {
	data() {
		return {
			refundReason: [
				{
					txt: '我不想要了',
					id: 1,
					checked: false
				},
				{
					txt: '与实际情况不符',
					id: 2,
					checked: false
				},
				{
					txt: '7天无理由退货',
					id: 3,
					checked: false
				},
				{
					txt: '其他',
					id: 4,
					checked: false
				}
			],
			radio: null,
			value: ''
		}
	},
	methods: {
		checkItem(id) {
			this.radio = id
		},
		refundSubmit() {
			if (this.radio == 4 && this.value == '') {
				this.$toast('请输入退款原因')
				return
			}
			this.$load()
			let Remark = this.radio != 4 ? this.refundReason[this.radio - 1].txt : this.value
			this.$ajax.get('Home/Order_Refund', { OrderNo: this.$route.query.OrderNo, Remark }).then(res => {
				this.$close()
				this.$toast({
					message: res.Content,
					duration: 2000,
					onClose: () => {
						this.$router.push({
							path: '/order'
						})
					}
				})
			})
		}
	}
}
</script>
<style lang="less" scoped src="@/style/order/refund.less"></style>