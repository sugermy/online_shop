<template>
  <van-swipe :autoplay="0" class="swiper-list" :loop="false" indicator-color="#FF9921">
    <van-swipe-item v-for="(item,index) in ticketlist" :key="index">
      <div class="swiper-header">
        <img class="header-img" src="../assets/head_photo.png">
        <div class="header-info">
          <p class="header-info-name">姓名：张满意</p>
          <p>身份证号：412382199506047516</p>
          <p>学生证：S147258963</p>
        </div>
      </div>
      <div class="swiper-main">
        <div class="main-qrcode" :id="(tickettype+index)" ref="qrcode"></div>
        <p class="main-codeno">凭证码：<span>2313820280190728</span></p>
        <p class="main-name">车索【全程票】</p>
        <p class="main-orderno-price">
          <span>订单号：23219100367165981663</span>
          <span class="price">￥78</span>
        </p>
        <p class="main-used-num">
          <span>总数量：1</span>
          <span>使用数量：0</span>
        </p>
        <p class="main-date">有效期：2019.10.10-2019.10.11</p>
      </div>
    </van-swipe-item>
  </van-swipe>
</template>
<script>
import QRCode from 'qrcodejs2' //引入二维码插件

export default {
	props: {
		ticketlist: Array, //订单票
		tickettype: String //方便使用refs获取实例
	},
	data() {
		return {}
	},
	mounted() {
		this.$nextTick(() => {
			this.ticketlist.forEach((el, key) => {
				this.creatQrCode(this.tickettype + key)
			})
		})
	},
	methods: {
		creatQrCode(name) {
			let qrcode = new QRCode(name, {
				width: 150,
				height: 150,
				text: 'code',
				colorDark: '#000',
				colorLight: '#fff'
			})
		}
	}
}
</script>
<style lang="less" scoped>
.swiper-header {
	height: 120px;
	background: #ecf2f6 url('../assets/info_bg.png') no-repeat center;
	background-size: 100% 100%;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	.header-img {
		width: 64px;
		height: 64px;
		margin: 0 18px 0 24px;
	}
	.header-info {
		font-size: 14px;
		color: #543905;
		line-height: 21px;
		.header-info-name {
			font-size: 16px;
			margin-bottom: 4px;
		}
	}
}
.swiper-main {
	height: 300px;
	background: #ecf2f6 url('../assets/card_bg.png') no-repeat center;
	background-size: 104% 100%;
	text-align: center;
	padding-top: 14px;
	.main-qrcode {
		width: 150px;
		height: 150px;
		padding: 10px;
		box-sizing: border-box;
		margin: 0 auto;
	}
	.main-codeno {
		color: #333333;
		font-size: 14px;
		font-weight: 500;
		line-height: 20px;
		span {
			color: #fe354a;
		}
	}
	.main-name {
		font-size: 16px;
		font-weight: 600;
		color: rgba(51, 51, 51, 1);
		margin: 4px 0;
	}
	.main-orderno-price {
		font-size: 12px;
		font-weight: 400;
		color: rgba(153, 153, 153, 1);
		display: flex;
		align-items: center;
		justify-content: center;
		.price {
			font-size: 18px;
			font-weight: bold;
			color: rgba(254, 53, 74, 1);
			margin-left: 10px;
		}
	}
	.main-used-num {
		font-size: 14px;
		color: #333333;
		margin: 4px 0 10px;
		span {
			font-weight: bold;
			&:first-child {
				margin-right: 10px;
			}
		}
	}
	.main-date {
		width: 95%;
		height: 30px;
		line-height: 30px;
		font-size: 12px;
		background: rgba(244, 244, 244, 1);
		border-radius: 2px;
		margin: 0 auto;
	}
}
</style>