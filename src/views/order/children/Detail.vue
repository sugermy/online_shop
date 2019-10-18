<template>
  <div class="detail">
    <van-tabs v-model="active" animated>
      <van-tab v-for="(item,index) in tabs" :key="index" :title="item">
        <!-- 待使用部分s -->
        <div class="swiper-con" v-show="active==1&&nouselist.length>0">
          <SwiperTicket :ticketlist="nouselist" :tickettype="'nouseqrcode'" />
        </div>
        <!-- 待使用部分e -->

        <!-- 已使用部分s -->
        <div class="swiper-con" v-show="active==0&&userlist.length>0">
          <SwiperTicket :ticketlist="userlist" :tickettype="'useqrcode'" />
        </div>
        <!-- 已使用部分e -->

        <!-- 没有数据s -->
        <div class="no-data" v-if="(active==0&&userlist.length==0) || (active==1&&nouselist.length==0)">
          <img src="../../../assets/box.png">
          <p>您还没有待使用的门票哦~</p>
        </div>
        <!-- 没有数据e -->

      </van-tab>
    </van-tabs>
    <van-collapse v-model="activeNames" v-if="(active==0&&userlist.length>0) || (active==1&&nouselist.length>0)">
      <van-collapse-item title="产品介绍" name="1" title-class="rules-title" size="large">
        <div class="collapse-item">
          夜，结束了一天的喧嚣后安静下来，伴随着远处路灯那微弱的光。风，毫无预兆地席卷整片旷野，撩动人的思绪万千。星，遥遥地挂在天空之中，闪烁着它那微微星光，不如阳光般灿烂却如花儿般如痴如醉
        </div>
      </van-collapse-item>
      <van-collapse-item title="使用规则" name="2" title-class="rules-title" size="large">
        <div class="collapse-item">
          欲将沉醉换悲凉，清歌莫断肠。这混乱的尘世，究竟充斥了多少绝望和悲伤。你想去做一个勇敢的男子，为爱，为信仰，轰轰烈烈的奋斗一场。你周身充斥着无人可比的灵气和光芒。你有着与伟人比肩的才气和名声，你是那样高傲孤洁的男子。你的一寸狂心未说，已经几度黄昏雨
        </div>
      </van-collapse-item>
      <van-collapse-item title="退票规则" name="3" title-class="rules-title" size="large">
        <div class="collapse-item">
          一段情，反复的掂量，最后加深了岁月的绵长。一路追赶里，一路追忆里，最后得到的是什么，最后又失去的是什么。或许，只有我们在静思的时候才会明白，这路的追忆里，我们得到的快乐往往比痛苦要少。当相思成殇的时候，除了对月徒悲叹之外，什么也不曾抓到
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
			userlist: [{}, {}],
			nouselist: [{}, {}, {}, {}, {}]
		}
	},
	methods: {}
}
</script>
<style lang="less" scoped src="@/style/order/detail.less">
</style>