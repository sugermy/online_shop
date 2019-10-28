<template>
  <div class="mine">
    <van-tabs v-model="active" animated @change="changTab">
      <van-tab v-for="(item,index) in tabs" :name="index" :key="index" :title="item" sticky :swipe-threshold="5">
        <div class="product-con" v-show="productlist.length>0">
          <div class="product-item" v-for="(item,index) in productlist" :key="index" @click="enterDetail(item.OrderNo)">
            <h3 class="pro-orderno">订单号：{{item.OrderNo}}</h3>
            <div class="pro-info">
              <img class="pro-tourist" :src="item.ProductImg">
              <div class="pro-detail">
                <p class="pro-detail-username">{{item.LinkName}}</p>
                <p class="pro-detail-proname">{{item.ProductName}}</p>
                <p class="pro-detail-num">
                  <span class="num">数量：{{item.BuyCount}}</span>
                  <span class="price">总价：￥{{item.PayAmount}}</span>
                </p>
              </div>
            </div>
            <div class="pro-footer">
              <span class="date">2019-04-01 13:00:00</span>
              <span v-if="item.PayType==0" class="status to-pay" @click.stop="payAgain(item.OrderNo)">支付</span>
              <span v-if="item.PayType==1" class="status to-refound" @click.stop="refund(item.OrderNo)">退款</span>
              <span v-if="item.PayType==2" class="status to-used">已使用</span>
              <span v-if="item.PayType==3" class="status to-refounded">查看详情</span>
            </div>
            <img class="status-img" :src="require(`../../../assets/status${item.PayType}.png`)">
          </div>
        </div>
        <div class="product-nocon" v-show="productlist.length==0">
          <img class="no-data-img" src="../../../assets/box.png">
          <p class="no-data-info">暂无数据</p>
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
			productlist: []
		}
	},
	created() {
		this.getInfo(this.active)
	},
	methods: {
		//获取列表信息
		getInfo(type) {
			this.$ajax.get('Home/Order_GetOrderList', { GetType: type }).then(res => {
				this.productlist = res.Data
			})
		},
		//切换tabs
		changTab(name, title) {
			this.getInfo(name)
		},
		//再次支付
		payAgain() {
			console.log(1)
		},
		//退款
		refund(OrderNo) {
			this.$router.push({
				path: './Refund',
				query: {
					OrderNo
				}
			})
		},
		//查看详情
		enterDetail(OrderNo) {
			this.$router.push({
				path: './detail',
				query: {
					OrderNo
				}
			})
		}
	}
}
</script>
<style lang="less" scoped src="@/style/order/view.less">
</style>