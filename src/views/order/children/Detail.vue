<template>
  <div class="detail">
    <van-tabs v-model="active" animated>
      <van-tab v-for="(item,index) in tabs" :key="index" :title="item">
        <!-- 待使用部分s -->
        <div class="swiper-con" v-show="active==1&&nouselist.length>0">
          <SwiperTicket v-if="showSwiperTicket" :productinfo="productInfo" :ticketlist="nouselist" :tickettype="'nouseqrcode'" />
        </div>
        <!-- 待使用部分e -->

        <!-- 已使用部分s -->
        <div class="swiper-con" v-show="active==0&&userlist.length>0">
          <SwiperTicket v-if="showSwiperTicket" :productinfo="productInfo" :ticketlist="userlist" :tickettype="'useqrcode'" />
        </div>
        <!-- 已使用部分e -->

        <!-- 没有数据s -->
        <div class="no-data" v-if="(active==0&&userlist.length==0) || (active==1&&nouselist.length==0)">
          <img src="../../../assets/box.png">
          <p>您还没有{{active==0?'已使用':'待使用'}}的门票哦~</p>
        </div>
        <!-- 没有数据e -->

      </van-tab>
    </van-tabs>
    <van-collapse v-model="activeNames" v-if="(active==0&&userlist.length>0) || (active==1&&nouselist.length>0)">
      <van-collapse-item title="产品介绍" name="1" title-class="rules-title" size="large">
        <div class="collapse-item">{{productInfo.RefundIntroduce}}</div>
      </van-collapse-item>
      <van-collapse-item title="使用规则" name="2" title-class="rules-title" size="large">
        <div class="collapse-item">{{productInfo.UseIntroduce}}</div>
      </van-collapse-item>
      <van-collapse-item title="退票规则" name="3" title-class="rules-title" size="large">
        <div class="collapse-item">{{productInfo.RefundIntroduce}}</div>
      </van-collapse-item>
      <van-collapse-item v-if="productInfo.RefundList&&productInfo.RefundList.length>0" title="退票详情" name="4" title-class="rules-title" size="large">
        <div class="collapse-item">
          <p>订单号：{{productInfo.RefundList[0].OrderNo}}</p>
          <p>退款单号：{{productInfo.RefundList[0].RefundNo}}</p>
          <p>退款状态：{{productInfo.RefundList[0].Status==1?'申请中':(productInfo.RefundList[0].Status==2?'已退款':'拒绝退款')}}</p>
          <p>申请时间：{{productInfo.RefundList[0].RefundDataTime}}</p>
          <p>申请备注：{{productInfo.RefundList[0].Rmk}}</p>
          <p>审核时间：{{productInfo.RefundList[0].AuditTime}}</p>
          <p>审核备注：{{productInfo.RefundList[0].AuditRmk}}</p>
        </div>
      </van-collapse-item>
    </van-collapse>
  </div>
</template>
<script>
import SwiperTicket from '@/components/SwiperTicket.vue'
export default {
	components: {
		SwiperTicket
	},
	data() {
		return {
			active: 1,
			activeNames: [],
			tabs: ['已使用', '待使用'],
			productInfo: {},
			userlist: [],
			nouselist: [],
			showSwiperTicket: false
		}
	},
	created() {
		this.getOrder()
	},
	methods: {
		getOrder() {
			this.$ajax.get('Home/Order_GetOrderInfo', { OrderNo: this.$route.query.OrderNo }).then(res => {
				this.productInfo = res.Data || {}
				this.showSwiperTicket = true
				this.userlist = res.Data.UsedList || []
				this.nouselist = res.Data.NoUseList || []
			})
		}
	}
}
</script>
<style lang="less" scoped src="@/style/order/detail.less">
</style>