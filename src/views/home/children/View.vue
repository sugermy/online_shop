<template>
  <div class="home">
    <!-- 头部信息栏s -->
    <div class="header">
      <p class="user-name">Hi，<span>{{userName}}</span></p>
      <img class="user-photo" :src="headPhoto">
    </div>
    <!-- 头部信息栏e -->

    <!-- 轮播图s -->
    <div class="swiper">
      <van-swipe :autoplay="3000" :height="200" indicator-color="#FF6632">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img class="swiper-img" v-lazy="image" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 轮播图e -->

    <!-- 主体产品区域s -->
    <div class="tabs">
      <van-tabs v-model="active" background="#ecf2f6" title-active-color="#FF6632" :line-width="30" animated>
        <van-tab v-for="(item,index) in tabs" :key="index" :title="item.name">
          <div v-if="item.type==1" class="pro-type">
            <div v-for="(el,key) in item.productlist" :key="key" class="pro-itema" @click.stop="showDetail(item.name,el)">
              <img :src="baseImg" class="pro-img" />
              <div class="pro-info">
                <p class="pro-name">{{el.name}}</p>
                <p class="pro-detail">{{el.detail}}</p>
                <p class="pro-year"><i class="year-icon"></i><span class="year-d">{{el.yarns}}</span></p>
                <p class="pro-buy">
                  <span class="pro-price">￥36</span>
                  <span class="pro-go" @click.stop="wentBuy(el)">立即购买</span>
                </p>
              </div>
            </div>
          </div>
          <div v-if="item.type==2" class="pro-type">
            <div v-for="(el,key) in item.productlist" :key="key" class="pro-itemb" @click.stop="showDetail(item.name,el)">
              <div class="pro-info">
                <p class="pro-name">{{el.name}}</p>
                <p class="pro-detail">查看详情 ></p>
              </div>
              <div class="pro-buy">
                <span class="pro-price">￥36</span>
                <span class="pro-go" @click.stop="wentBuy(el)">立即购买</span>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <!-- 主体产品区域e -->

    <!-- 游玩须知s -->
    <div class="needs">
      <div class="needs-header">
        <i class="needs-icon"></i>
        <span>乘坐须知</span>
        <i class="needs-icon"></i>
      </div>
      <ul class="remark-list">
        <li v-for="(item,index) in RemarkList" class="remark-item" :key="index">
          <h3 class="remark-title">{{item.RemarkTitle}}</h3>
          <p class="remark-info">{{item.RemarkInfo}}</p>
        </li>
      </ul>
    </div>
    <!-- 游玩须知e -->

    <!-- 弹窗详情s -->
    <van-dialog v-model="showProp" closeOnClickOverlay :showConfirmButton="false">
      <h3 class="prop-header">
        <i class="prop-icon"></i>
        <span>{{showProduct.title}}</span>
        <i class="prop-icon"></i>
      </h3>
      <div class="prop-main">
        <p class="prop-name">{{showProduct.name}}</p>
        <p class="prop-detail">{{showProduct.detail}}</p>
        <p class="prop-year"><i class="year-icon"></i><span class="year-d">{{showProduct.yarns}}</span></p>
        <p class="prop-price">￥{{36}}</p>
        <p class="prop-go" @click="wentBuy(showProduct,true)">立即购买</p>
      </div>
    </van-dialog>
    <!-- 弹窗详情e -->

  </div>
</template>
<script>
export default {
	data() {
		return {
			userName: 'Isgo', //登陆用户信息
			headPhoto: require('@/assets/head_photo.png'), //登陆用户信息
			images: ['https://img.yzcdn.cn/vant/apple-1.jpg', 'https://img.yzcdn.cn/vant/apple-2.jpg'], //轮播数组
			active: 2, //当前激活tabs
			tabs: [
				{
					name: '交通票',
					type: 1,
					productlist: [
						{
							name: '产品1',
							detail:
								'由珠海长隆海洋王国长隆组合而成…由珠海长隆海洋王国长隆组合而成…由珠海长隆海洋王国长隆组合而成…由珠海长隆海洋王国长隆组合而成…由珠海长隆海洋王国长隆组合而成…由珠海长隆海洋王国长隆组合而成…由珠海长隆海洋王国长隆组合而成…由珠海长隆海洋王国长隆组合而成…由珠海长隆海洋王国长隆组合而成…由珠海长隆海洋王国长隆组合而成…由珠海长隆海洋王国长隆组合而成…由珠海长隆海洋王国长隆组合而成…由珠海长隆海洋王国长隆组合而成…由珠海长隆海洋王国长隆组合而成…由珠海长隆海洋王国长隆组合而成…由珠海长隆海洋王国长隆组合而成…由珠海长隆海洋王国长隆组合而成…由珠海长隆海洋王国长隆组合而成…由珠海长隆海洋王国长隆组合而成…由珠海长隆海洋王国长隆组合而成…由珠海长隆海洋王国长隆组合而成…由珠海长隆海洋王国长隆组合而成…由珠海长隆海洋王国长隆组合而成…由珠海长隆海洋王国长隆组合而成…由珠海长隆海洋王国长隆组合而成…由珠海长隆海洋王国长隆组合而成…由珠海长隆海洋王国长隆组合而成…由珠海长隆海洋王国长隆组合而成…由珠海长隆海洋王国长隆组合而成…由珠海长隆海洋王国长隆组合而成…',
							yarns: '适用年龄：小于18岁或大于65岁',
							id: 1
						},
						{ name: '产品2', detail: '由珠海长隆海洋王国长隆组合而成…', yarns: '适用年龄：小于18岁或大于65岁', id: 2 }
					]
				},
				{
					name: '推荐票',
					type: 2,
					productlist: [
						{ name: '产品3', detail: '由珠海长隆海洋王国长隆组合而成…', yarns: '适用年龄：小于18岁或大于65岁', id: 3 },
						{ name: '产品4', detail: '由珠海长隆海洋王国长隆组合而成…', yarns: '适用年龄：小于18岁或大于65岁', id: 4 }
					]
				}
			], //类型票和产品数组
			RemarkList: [
				{
					RemarkTitle: '中心景区交通运营路线：',
					RemarkInfo:
						'南岳中心景区旅游交通实行“车索一体化”经营。\n南岳索道连接半山亭和南天门，为往复式，索道全长1710.8米，上下高差472米，单跨1306米。\n环保车运行线路为“R”形。在中心景区南天门以下沿线各景点停靠。具体运行线路如下：\n1、上行线路始发站为南岳衡山全域旅游服务中心。途经华严湖、忠烈祠前门、诚信林、延寿亭、穿岩诗林到达半山亭换乘站（索道和环保车换乘点）、磨镜台、西岭、民俗文化城到达南天门祖师殿站。\n2、下行线路始发站为南天门祖师殿站。环保车由东线往下行驶，依次经过邺候书院、财富山庄、半山亭换乘车站、穿岩诗林、延寿亭、诚信林、忠烈祠前门、华严湖到达终点站南岳衡山全域旅游服务中心。\n3、为了方便游客参观南台寺严寺、藏经殿、广济寺，特开通旅游专线。分别为：半山亭-南台寺-白龙潭；南天门-广济寺；南天门-藏经殿。\n',
					SortCode: 0
				},
				{
					RemarkTitle: '交通票优惠政策(需持相关有效证件和居民身份证在售票窗口购买）：',
					RemarkInfo:
						'身高1.2米（含1.2米）以下的不占座的儿童享受免票优惠，符合以下条件的凭本人有效身份证件原件及相关有效证件可以享受半价优惠政策：\n①18周岁（不含18周岁）未成年人；\n②全日制大学本科及以下学历在校学生，有效证件为本人学生证原件；\n③60周岁（含60周岁）以上的老年人，有效证件为老年人优待证；\n④残疾人，有效证件为中国残联核发的残疾证；\n⑤现役军人、军队离退休干部，有效证件为本人士兵证或军官证原件；\n⑥佛教或道教宗教教职人员，有效证件为中国佛教协会核发的佛教教职人员证原件和中国道教协会核发的道教教职人员证书原件。',
					SortCode: 0
				},
				{
					RemarkTitle: '使用须知：',
					RemarkInfo:
						'1.交通票一个行程两日有效，微信购票凭二维码或者居民身份证乘坐。凭二维码乘坐时，必须出示购票人订单详情中的电子票号二维码，二维码截图拍照转发无效。\n2.游客应遵循景区各项管理制度和安全警示，严禁携带易燃易爆、有毒物品及宠物乘坐环保车和索道。\n3.乘坐环保车请系好安全带，途中请勿离开座位，车辆（索道）运行途中，请勿将头和手臂伸出窗外。',
					SortCode: 0
				},
				{
					RemarkTitle: '环保车和索道运行时间：',
					RemarkInfo: '淡季：7:30-17:30\n旺季：6:00-18:00\n具体运行时间以当日景区公告为准。',
					SortCode: 0
				},
				{
					RemarkTitle: '发票领取：',
					RemarkInfo: '微信购票凭二维码或居民身份证乘坐，无需在窗口、自助售票机排队取票；如需要发票，须在一个月内凭本人居民身份证、订单详情，在游客服务中心二楼1号窗口领取。',
					SortCode: 0
				}
			], //游玩须知内容
			baseImg: require('@/assets/pic.png'), //适用人群的图标
			showProp: false, //显示弹出层操作
			showProduct: {} //弹出层产品内容
		}
	},
	methods: {
		//显示产品内容弹窗
		showDetail(name, v) {
			this.showProp = true
			this.showProduct = v
			this.showProduct.title = name
		},
		//去购买---提前判断是否在弹出层点击事件
		wentBuy(product, showModel) {
			if (showModel) {
				this.showProp = false
				this.enterNext(product)
			} else {
				this.enterNext(product)
			}
		},
		//购买跳转页面
		enterNext(product) {
			this.$router.push({
				path: './buy',
				query: {
					id: product.id
				}
			})
		}
	}
}
</script>
<style lang="less" scoped src="@/style/home/index.less">
</style>