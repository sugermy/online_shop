<template>
  <div class="mine">
    <van-tabs v-model="active" animated>
      <van-tab v-for="(item,index) in tabs" :key="index" :title="item" sticky :swipe-threshold="5" name="tab-item">
        <div class="product-con">
          <div class="product-item" v-for="(item,index) in productlist" :key="index" @click="enterDetail">
            <h3 class="pro-orderno">订单号：1231231231456</h3>
            <div class="pro-info">
              <img class="pro-tourist" src="../../../assets/head_photo.png">
              <div class="pro-detail">
                <p class="pro-detail-username">小笼包</p>
                <p class="pro-detail-proname">珠海长隆海洋王国成人票</p>
                <p class="pro-detail-num">
                  <span class="num">数量：3</span>
                  <span class="price">总价：￥238</span>
                </p>
              </div>
            </div>
            <div class="pro-footer">
              <span class="date">2019-04-01 13:00:00</span>
              <span v-if="item.paytype==0" class="status to-pay">支付</span>
              <span v-if="item.paytype==1" class="status to-refound">退款</span>
              <span v-if="item.paytype==2" class="status to-used">已使用</span>
              <span v-if="item.paytype==3" class="status to-refounded">退款完成</span>
            </div>
            <img class="status-img" :src="require(`../../../assets/status${item.paytype}.png`)">
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
export default {
	data() {
		return {
			active: 0,
			tabs: ['全部', '未支付', '已支付', '已使用', '已退款'],
			productlist: [{ paytype: 0 }, { paytype: 1 }, { paytype: 2 }, { paytype: 3 }, { paytype: 3 }, { paytype: 2 }, { paytype: 1 }, { paytype: 0 }]
		}
	},
	methods: {
		enterDetail() {
			this.$router.push({
				path: './detail',
				query: {
					id: 111
				}
			})
		}
	}
}
</script>
<style lang="less" scoped>
@import url('../../../style/order/view.less');
</style>