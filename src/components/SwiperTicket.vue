<template>
  <van-swipe :autoplay="0" class="swiper-list" :loop="false" indicator-color="#FF9921">
    <van-swipe-item v-for="(item,index) in ticketlist" :key="index">
      <div class="swiper-header">
        <img class="header-img" src="../assets/head_photo.png">
        <div class="header-info">
          <p class="header-info-name">姓名：{{item.LinkName}}</p>
          <p>身份证号：{{item.LinkIDNumber}}</p>
          <p v-show="item.CardNo&&item.CardNo!='undefined'">学生证：{{item.CardNo&&item.CardNo!='undefined'?item.CardNo:''}}</p>
        </div>
      </div>
      <div class="swiper-main">
        <div class="main-qrcode" :id="(tickettype+index)" ref="qrcode"></div>
        <p class="main-codeno">凭证码：<span>{{item.Ecode}}</span></p>
        <p class="main-name">{{productinfo.ProductName}}</p>
        <p class="main-orderno-price">
          <span>订单号：{{productinfo.OrderNo}}</span>
          <span class="price">￥{{productinfo.Amount}}</span>
        </p>
        <p class="main-used-num">
          <span>总数量：{{item.CodeQty}}</span>
          <span>使用数量：{{item.UseCount}}</span>
        </p>
        <p class="main-date">有效期：{{item.EffectiveDateStr}}</p>
      </div>
    </van-swipe-item>
  </van-swipe>
</template>
<script>
import QRCode from 'qrcodejs2' //引入二维码插件

export default {
	props: {
		productinfo: Object,
		ticketlist: {
			type: Array,
			default: function() {
				return [{}]
			}
		}, //订单票
		tickettype: String //方便使用refs获取实例
	},
	data() {
		return {}
	},
	created() {
		this.$nextTick(() => {
			this.ticketlist.forEach((el, key) => {
				this.creatQrCode(this.tickettype + key, el.EnEcode)
			})
		})
	},
	methods: {
		creatQrCode(name, EnEcode) {
			let qrcode = new QRCode(name, {
				width: 150,
				height: 150,
				text: EnEcode,
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
		margin: 0 10px;
		border-radius: 50%;
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
@media (min-width: 240px) and (max-width: 320px) {
	.header-info {
		font-size: 12px !important;
		.header-info-name {
			font-size: 13px !important;
		}
	}
}
@media (min-width: 321px) and (max-width: 360px) {
	.header-info {
		font-size: 13px !important;
		.header-info-name {
			font-size: 14px !important;
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