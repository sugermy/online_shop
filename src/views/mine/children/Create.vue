<template>
  <div class="mine-create">
    <div class="creat-header">
      <div class="header-left header-part">
        <img class="part-icon" src="../../../assets/circle_link.png">
        <p class="part-txt txt-link">填写资料</p>
      </div>
      <div class="header-center">
        <img class="part-process" :src="step==1?stepTwoProcessNormal:stepTwoProcessLink">
      </div>
      <div class="header-right header-part">
        <img class="part-icon" :src="step==1?stepTwoImgNormal:stepTwoImgLink">
        <p class="part-txt" :class="step==1?'':'txt-link'">生成护照</p>
      </div>
    </div>
    <div class="creat-main">
      <div v-show="step==1">
        <van-cell-group>
          <van-field v-model="person.name" clearable label="姓名" :maxlength="8" placeholder="请输入您的姓名" :error-message="errMsg.nameErr?errMsg.nameRed:errMsg.nameNo" />
          <van-field v-model="person.phone" type="tel" :maxlength="11" label="电话号码" placeholder="请输入您的11位手机号" :error-message="errMsg.phoneErr?errMsg.phoneRed:errMsg.phoneNo" />
          <van-field v-model="person.card" type="number" label="身份证号" placeholder="请输入您的18位身份证号" :error-message="errMsg.cardErr?errMsg.cardRed:errMsg.cardNo" />
          <!-- <van-field v-model="person.stuCard" label="学生证" placeholder="请输入您的学生证" /> -->
        </van-cell-group>
      </div>
      <div v-show="step==2">
        <div class="card-main">
          <img class="card-img" src="../../../assets/head_photo.png">
          <div class="card-info">
            <p class="card-info-name">姓名：{{newInfo.UserName}}</p>
            <p>身份证号：{{newInfo.UserIdCard}}</p>
            <p v-show="newInfo.CardNo!=''">学生证：{{newInfo.CardNo}}</p>
          </div>
          <img @click.stop="share()" class="share-img" src="../../../assets/share.png">
        </div>
      </div>
    </div>
    <div v-show="false">
      <img ref="headimg" src="../../../assets/head_photo.png">
      <img ref="headbg" src="../../../assets/info_bg.png">
      <img ref="headqr" src="../../../assets/qrcode_we.png">
    </div>
    <div class="creat-footer">
      <p class="footer-btn" v-show="step==1" @click="creatCard">生成护照</p>
      <p class="footer-btn" v-show="step==2" @click="goBuy">立即购票</p>
    </div>
    <van-overlay :show="showMask">
      <div class="overlay-mask">
        <canvas id="canvas" ref="canvas" v-show="showCanvas"></canvas>
        <img :src="imgSrc" v-show="!showCanvas">
        <div class="overlay-mask-close">
          <p>请长按图片保存您的护照</p>
          <img class="close-icon" src="../../../assets/close.png" @click="showMask = false">
        </div>
      </div>
    </van-overlay>
  </div>
</template>
<script>
export default {
	data() {
		return {
			showMask: false,
			showCanvas: true,
			imgSrc: '',
			step: 1,
			stepTwoProcessNormal: require('../../../assets/process_normal.png'),
			stepTwoProcessLink: require('../../../assets/process_link.png'),
			stepTwoImgNormal: require('../../../assets/circle_normal.png'),
			stepTwoImgLink: require('../../../assets/circle_link.png'),
			person: { name: '', phone: '', card: '', stuCard: '' },
			postData: true,
			errMsg: {
				nameErr: false,
				nameNo: '',
				nameRed: '姓名不能为空',
				phoneErr: false,
				phoneNo: '',
				phoneRed: '手机号格式有误',
				cardErr: false,
				cardNo: '',
				cardRed: '身份证号格式有误'
			},
			canvasWidth: window.innerWidth * 0.8,
			// canvasHeight: (window.innerHeight - 49) * 0.75,
			canvasHeight: 410,
			canvasMask: null,
			canvasTarget: null,
			timerOut: null,
			newInfo: {}
		}
	},
	created() {
		console.log(this.$store.state.shopInfo.IsCheckPerson)
	},
	mounted() {},
	methods: {
		//第一步生成护照
		creatCard() {
			//校验姓名
			if (this.person.name == '') {
				this.errMsg.nameErr = true
				return
			} else {
				this.errMsg.nameErr = false
			}

			//校验手机号
			if (this.person.phone == '') {
				this.errMsg.phoneErr = true
				this.errMsg.phoneRed = '手机号不能为空'
				return
			} else if (!this.$checkPhone(this.person.phone)) {
				this.errMsg.phoneErr = true
				this.errMsg.phoneRed = '手机号格式有误'
				return
			} else {
				this.errMsg.phoneErr = false
			}
			//开启实名制
			if (this.$store.state.shopInfo.IsCheckPerson) {
				//校验身份证号
				if (this.person.card == '') {
					this.errMsg.cardErr = true
					this.errMsg.cardRed = '身份证号不能为空'
					return
				} else if (!this.$checkCard(this.person.card)) {
					this.errMsg.cardErr = true
					this.errMsg.cardRed = '身份证号格式有误'
					return
				} else {
					this.errMsg.cardErr = false
				}
			}
			//学生证暂不做校验
			let params = {
				MerchantCode: this.$store.state.shopInfo.MerchantCode,
				OpenId: this.$store.state.userInfo.openid,
				UserImgUrl: '',
				Unionid: 'test001',
				UserName: this.person.name,
				UserPhone: this.person.phone,
				UserIdCard: this.person.card,
				CardNo: this.person.stuCard,
				IDType: 2,
				Gender: '',
				Province: '',
				Cicy: ''
			}
			if (this.postData) {
				this.postData = false
				this.$ajax.get('Home/Passport_SubmitInfo', { ReqStr: params }).then(res => {
					this.postData = true
					if (res.Code == 200) {
						this.step = 2
						this.newInfo = res.Data
						this.initCanvas()
					} else {
						this.$toast(res.Content)
					}
				})
			}
		},
		//第二步点击购买---返回首页产品列表
		goBuy() {
			this.$router.push({
				path: '/home'
			})
		},
		//分享
		share() {
			this.$toast.loading({
				duration: 0,
				loadingType: 'spinner',
				forbidClick: true,
				message: '正在创建...'
			})
			let _this = this
			this.timerOut = setTimeout(() => {
				clearTimeout(_this.timerOut)
				_this.$toast.clear()
				_this.showMask = true
			}, 3000)
		},
		//初始化canvas
		initCanvas() {
			this.canvasMask = this.$refs.canvas
			this.canvasMask.width = this.canvasWidth
			this.canvasMask.height = this.canvasHeight
			this.canvasTarget = this.canvasMask.getContext('2d')
			this.drawBg()
		},
		//构画顶部背景
		drawBg() {
			// this.$refs.headbg.onload = () => {
			this.canvasTarget.drawImage(this.$refs.headbg, 0, 0, this.canvasWidth, 120)
			this.canvasTarget.drawImage(this.$refs.headimg, 14, 30, 60, 60)
			//二维码居中
			let qrcodesquire = this.canvasWidth / 2
			let centerPositonX = this.canvasWidth / 2 - qrcodesquire / 2
			let centerPositonY = this.canvasHeight - qrcodesquire
			this.canvasTarget.drawImage(this.$refs.headqr, centerPositonX, centerPositonY, qrcodesquire, qrcodesquire)
			this.drawTxt()
			this.drawCode()
			// }
		},
		//填充文字
		drawTxt() {
			this.canvasTarget.font = '16px Arial'
			this.canvasTarget.fillStyle = '#333'
			this.canvasTarget.fillText(this.newInfo.UserName, 84, 55)
			this.canvasTarget.fillText(this.newInfo.CardID, 84, 80)
			this.canvasTarget.textAlign = 'center' //X取值设备宽度中间值  默认对齐居中
			this.canvasTarget.font = '14px Arial'
			this.canvasTarget.fillText('签发景区', this.canvasWidth / 2, 150)
			this.canvasTarget.fillText(this.$store.state.shopInfo.ShopName, this.canvasWidth / 2, 170)
			this.canvasTarget.fillText(this.newInfo.UserName, this.canvasWidth / 2, 190)
			this.canvasTarget.fillText(this.newInfo.UserIdCard, this.canvasWidth / 2, 210)
			this.canvasTarget.fillText(this.newInfo.CreateTime, this.canvasWidth / 2, 230)
		},
		//填充二维码
		drawCode() {
			let imgSrc = this.canvasMask.toDataURL('image/png') || ''
			if (imgSrc != '') {
				this.imgSrc = imgSrc
				this.showCanvas = false
			}
		}
	}
}
</script>
<style lang="less" scoped src="@/style/mine/create.less">
</style>