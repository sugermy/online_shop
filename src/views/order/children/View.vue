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
              <span class="date">{{item.CreateTime}}</span>
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
		payAgain(OrderNo) {
			this.$load()
			this.$ajax.get('Home/Order_RePay', { OrderNo }).then(res => {
				this.$close()
				let resJson = JSON.parse(res.Data)
				WeixinJSBridge.invoke('getBrandWCPayRequest', resJson, data => {
					if (data.err_msg == 'get_brand_wcpay_request:ok') {
						// 使用以上方式判断前端返回,微信团队郑重提示：
						//res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
						this.toServrPay(OrderNo)
						this.getInfo(this.active)
					} else {
						this.getInfo(this.active)
					}
				})
			})
		},
		//支付成功调用方法
		toServrPay() {
			this.$ajax.post('Home/Order_PaySuccessUpdate', { OrderNo: this.OrderNo, Status: 'SUCCESS' }).then(res => {})
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