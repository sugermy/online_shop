<template>
  <div class="buy">
    <!-- 选择日期s -->
    <div class="buy-part part-date">
      <h3 class="part-title">使用日期</h3>
      <div class="part-main">
        <div class="part-date-item" :class="pickDate==0?'pick-date':''" @click="selectDate(0)">
          <p>今日{{dayPrice[0].DateStr | formatdate}}</p>
          <p>￥{{dayPrice[0].SellPrice}}</p>
          <i class="pick-icon" v-show="pickDate==0"></i>
        </div>
        <div class="part-date-item" :class="pickDate==1?'pick-date':''" @click="selectDate(1)">
          <p>明日{{dayPrice[1].DateStr | formatdate}}</p>
          <p>￥{{dayPrice[1].SellPrice}}</p>
          <i class="pick-icon" v-show="pickDate==1"></i>
        </div>
        <div class="part-date-item" :class="pickDate==2?'pick-date':''" @click="selectDate(2)">
          <p>后日{{dayPrice[2].DateStr | formatdate}}</p>
          <p>￥{{dayPrice[2].SellPrice}}</p>
          <i class="pick-icon" v-show="pickDate==2"></i>
        </div>
        <div class="part-date-item" :class="pickDate==3?'pick-date':''" @click="selectDate(3)">
          <p>其他{{otherDate}}</p>
          <p>￥{{otherPrice}}</p>
          <i class="pick-icon" v-show="pickDate==3"></i>
        </div>
      </div>
    </div>
    <!-- 选择日期e -->

    <!-- 产品操作s -->
    <div class="buy-part part-info">
      <h3 class="part-title">产品信息</h3>
      <div class="part-main">
        <!-- <img class="part-img" :src="productInfo.ProductImg" v-if="$route.query.hasImg==2"> -->
        <img class="part-img" :src="productInfo.ProductImg">
        <!-- <div class="part-info" :class="$route.query.hasImg==2?'has-img':''"> -->
        <div class="part-info">
          <p class="part-name">{{productInfo.ProductName}} <span class="part-type">{{productInfo.ProductType}}</span></p>
          <p class="part-year" v-if="productInfo.IsLimitAge"><i class="rules-icon"></i>{{productInfo.ShowLimitAge}}</p>
          <p class="part-detail ellipsis">{{productInfo.ProductIntroduce}}</p>
          <div class="part-action">
            <div class="part-action-left">
              <span class="part-price">￥{{sellPrice}}</span>
              <div class="part-rules-enter" @click="enterRules">
                关于产品 >
              </div>
            </div>
            <van-stepper class="part-action-right" button-size="20px" disable-input @plus="addNum" @minus="reduceNum" :min="productInfo.SellMin" :max="productInfo.SellMax" integer
              v-model="setpValue" />
          </div>

        </div>
      </div>
      <!-- <div class="part-rules">
        <div class="part-rules-list">
          <i class="rules-icon"></i>
          <span>{{productInfo.ProductType}}</span>
          <i class="rules-line" v-if="productInfo.IsLimitAge">|</i>
          <span v-if="productInfo.IsLimitAge">适用人群：{{productInfo.ShowLimitAge}}</span>
        </div>
        <div class="part-rules-enter" @click="enterRules">
          购买须知 >
        </div>
      </div> -->
    </div>
    <!-- 产品操作e -->

    <!-- 游客绑定出行人s -->
    <div class="buy-part part-tourist">
      <h3 class="part-title">出行人信息<span class="part-title-tip">需填写<i class="tip-num">{{touristNum}}个</i>出行人(切换出行人需先取消已选中出行人)</span></h3>
      <div class="tourist-action">
        <div class="tourist-list">
          <div class="tourist-item" v-for="(item,index) in tourist" :key="index" @click="chooseItem(item)" :class="item.checked?'checked-item':''">{{item.UserName}}<i
              v-show="item.checked" class="tourist-icon"></i></div>
        </div>
        <div class="tourist-modify" @click="openTourist">新增/编辑</div>
      </div>
      <div class="check-tourist">
        <div class="check-item" v-for="(item,index) in chosePer" :key="index">
          <p class="i-name" v-show="item.UserName">{{item.UserName}}</p>
          <p class="i-card i-txt" v-show="item.UserIdCard">身份证号：{{item.UserIdCard}}</p>
          <p class="i-phone i-txt" v-show="item.UserPhone">手机号：{{item.UserPhone}}</p>
          <i class="check-edit" @click="touristEdit(item,true,index,'out')"></i>
        </div>
      </div>
    </div>
    <!-- 游客绑定出行人e -->
    <div class="buy-pay">
      <div class="pay-total">
        <span class="pay-price">￥{{totalMoney}}</span>
        <span class="pay-priceother">（已优惠：{{discountsMoney}}元）</span>
      </div>
      <div class="pay-action" @click="buyNow">立即购买</div>
    </div>

    <!-- 时间选择器s -->
    <van-popup v-model="showDate" position="bottom">
      <van-datetime-picker v-model="currentDate" type="date" :formatter="formatter" :min-date="minDate" :max-date="maxDate" @cancel="cancelDate" @confirm="checkDate" />
    </van-popup>
    <!-- 时间选择器e -->

    <!-- 新增编辑游客s -->
    <van-popup v-model="showPer" class="show-per" :overlay="overlay" id="showper" round position="bottom">
      <header class="per-header">
        <div class="per-btn cancel" @click="showPer=false">取消</div>
        <div class="per-txt">请至少选择<span class="per-txt-portent">{{perTxtTent}}</span>人</div>
        <div class="per-btn choose" @click="selectPre">确定</div>
      </header>
      <main class="per-main">
        <div class="main-top" @click="touristEdit({},false,null,'insideNew')">
          <i class="per-icon"></i>
          <span class="per-txt">添加出行人信息</span>
        </div>
        <div class="main-content">
          <div v-for="(item,index) in tourist" :key="index" class="per-item">
            <van-checkbox v-model="item.checked" shape="square" checked-color="#FF9921" :ref="`newTourist${item.CardID}`" @click="changeNewStu($event,item)"></van-checkbox>
            <div class="per-info">
              <p class="i-name" v-show="item.UserName">{{item.UserName}}</p>
              <p class="i-card i-txt" v-show="item.UserIdCard">身份证号：{{item.UserIdCard}}</p>
              <p class="i-phone i-txt" v-show="item.UserPhone">手机号：{{item.UserPhone}}</p>
            </div>
            <div class="per-edit" @click="touristEdit(item,item.checked,null,'inside')"></div>
          </div>
        </div>
      </main>
    </van-popup>
    <!-- 新增编辑游客e -->

    <!-- 编辑游客信息s -->
    <van-popup v-model="showEdit" class="show-per edit-per" get-container="#showper" round position="right">
      <header class="per-header">
        <div class="per-btn cancel" @click="showEdit=false">取消</div>
        <div class="title">编辑信息</div>
        <div class="per-btn choose" @click="editPre">确定</div>
      </header>
      <main class="per-main">
        <van-cell-group>
          <van-field v-model="modifyTour.UserName" :maxlength="8" label="姓名" placeholder="请输入姓名" />
          <van-field v-model="modifyTour.UserPhone" type="tel" :maxlength="11" label="电话号码" placeholder="请输入电话号码" />
          <van-field v-model="modifyTour.UserIdCard" label="身份证号" placeholder="请输入身份证号" />
          <!-- <van-field v-model="modifyTour.CardNo" label="学生证" placeholder="请输入学生证" /> -->
        </van-cell-group>
      </main>
    </van-popup>
    <!-- 编辑游客信息e -->

    <!-- 条款信息s -->
    <van-popup v-model="showClause" :close-on-click-overlay="false" class="show-per clause-per" round position="bottom">
      <div class="clause-header">
        <span class="no-pass pass-stu" @click="noPassClause">不同意</span>
        <span class="name">服务条款</span>
        <span class="to-pass pass-stu" @click="passClause">同意</span>
      </div>
      <div class="clause-collapse">
        <van-collapse v-model="activeNames">
          <van-collapse-item title="产品介绍" name="1" title-class="rules-title" :is-link="true">
            <div class="collapse-item">{{productInfo.ProductIntroduce}}</div>
          </van-collapse-item>
          <van-collapse-item title="使用规则" name="2" title-class="rules-title" :is-link="true">
            <div class="collapse-item">{{productInfo.UseIntroduce}}</div>
          </van-collapse-item>
          <van-collapse-item title="退票规则" name="3" title-class="rules-title" :is-link="true">
            <div class="collapse-item">{{productInfo.RefundIntroduce}}</div>
          </van-collapse-item>
        </van-collapse>
      </div>
      <div class="clause-footer">
        <van-checkbox v-model="checked" checked-color="#26A4FF" icon-size="14px" shape="square">我已阅读上述服务条款</van-checkbox>
      </div>
    </van-popup>
    <!-- 条款信息e -->
  </div>
</template>
<script>
export default {
	data() {
		return {
			pickDate: 0, //选择购买日期
			setpValue: 1, //当前选择数量
			chosePer: [{}], //已选择游客
			showDate: false,
			showPer: false,
			showEdit: false,
			showClause: false,
			checked: false,
			currentDate: new Date(),
			otherDate: '', //其他日期
			useOtherDate: '',
			otherPrice: '', //其他日期价格
			minDate: new Date(), //时间选择器最小为当日
			dayPrice: [{}, {}, {}], //日期价
			sellPrice: null, //当日售卖价格
			ticketPrice: null, //当日票面价格
			discountsPrice: null, //当前优惠价格
			productInfo: {}, //产品信息
			tourist: [],
			modifyTour: {},
			activeNames: ['1', '2', '3'],
			perTxtTent: 1,
			editPosition: '',
			OrderNo: '',
			overlay: true
			// touristNum: 1
		}
	},
	created() {
		// console.log(this.$route.query)
		this.getProduct()
	},
	computed: {
		//最大可购买日期
		maxDate() {
			return new Date(this.minDate.getTime() + 24 * 60 * 60 * 1000 * 15)
		},
		//总价计算
		totalMoney() {
			return parseInt(this.sellPrice * this.setpValue * 100) / 100 //四舍五入---or取两位小数parseInt(this.sellPrice * this.setpValue*100)/100
		},
		//优惠
		discountsMoney() {
			return parseInt(this.discountsPrice * this.setpValue * 100) / 100 //四舍五入---or取两位小数parseInt(this.discountsPrice * this.setpValue*100)/100
		},
		//需填写的游客数量
		touristNum() {
			if (this.productInfo.PickTicket == 0) {
				return 1
			} else {
				return this.setpValue
			}
		}
	},
	methods: {
		//获取产品详情
		getProduct() {
			this.$load()
			this.$ajax
				.get('Home/Order_GetProductInfo', {
					ProductID: this.$route.query.productId || this.$getQuery('productId')
				})
				.then(res => {
					this.$close()
					if (res.Code == 200) {
						this.tourist = res.Data.PassengerInfo.map(el => {
							return {
								...el,
								checked: false
							}
						})
						this.productInfo = res.Data.ProductInfo
						this.setpValue = res.Data.ProductInfo.SellMin
						this.dayPrice = res.Data.PriceInfo.filter((el, index) => {
							return index <= 2
						})

						if (this.productInfo.PickTicket == 0) {
							//为0 大票
						} else {
							//为1 一人一票
							this.chosePer = []
							let len = this.productInfo.SellMin
							for (let i = 0; i < len; i++) {
								this.chosePer.push({})
							}
						}
						this.sellPrice = this.dayPrice[0].SellPrice
						this.ticketPrice = this.dayPrice[0].TicketPrice
						this.discountsPrice = (this.dayPrice[0].TicketPrice - this.dayPrice[0].SellPrice).toFixed(2)
						this.otherDate = this.dayPrice[0].DateStr.slice(5, this.dayPrice[0].DateStr.length)
						this.useOtherDate = this.dayPrice[0].DateStr
						this.otherPrice = this.dayPrice[0].SellPrice
					} else {
						this.$toast(res.Content)
					}
				})
		},

		//日期格式化
		formatter(type, value) {
			if (type === 'year') {
				return `${value}年`
			} else if (type === 'month') {
				return `${value}月`
			} else if (type === 'day') {
				return `${value}日`
			}
			return value
		},
		//选择日期
		selectDate(v) {
			this.pickDate = v
			if (v == 3) {
				this.showDate = true
			} else {
				this.sellPrice = this.dayPrice[v].SellPrice
				this.ticketPrice = this.dayPrice[v].TicketPrice

				this.discountsPrice = (this.dayPrice[v].TicketPrice - this.dayPrice[v].SellPrice).toFixed(2)
				this.useOtherDate = this.dayPrice[v].DateStr
			}
		},
		//确定日期选择
		checkDate(v) {
			this.showDate = false
			let date = v.format('yyyy-MM-dd')
			this.$ajax.get('Home/Order_GetProductPrice', { ProductID: this.$route.query.productId || this.$getQuery('productId'), PlayDate: date }).then(res => {
				this.otherDate = v.format('MM-dd')
				this.useOtherDate = v.format('yyyy-MM-dd')
				this.otherPrice = res.Data[0].SellPrice
				this.sellPrice = res.Data[0].SellPrice
				this.ticketPrice = res.Data[0].TicketPrice
				this.discountsPrice = (res.Data[0].TicketPrice - res.Data[0].SellPrice).toFixed(2)
			})
		},
		//取消日期选择
		cancelDate() {
			this.showDate = false
		},
		// 数量增加操作
		addNum() {
			if (this.productInfo.PickTicket == 0) {
				//为0 大票
			} else {
				//为1 一人一票
				this.chosePer.push({})
			}
		},
		//数量减少操作
		reduceNum() {
			// 根据票种类型判断是否执行以下代码
			if (this.productInfo.PickTicket == 0) {
				//为0 大票
			} else {
				//为1 一人一票
				this.chosePer.pop()
				this.tourist.forEach(el => {
					el.checked = false
				})
				//先修改整体游客为false--再做循环添加checked
				this.chosePer.forEach(el => {
					this.tourist.forEach(kl => {
						if (el.CardID == kl.CardID) {
							kl.checked = true
						}
					})
				})
			}
		},
		//编辑游客
		touristEdit(item, hasCheck, index, position) {
			if (this.showPer) {
				//在弹出层内部点击编辑
				this.showEdit = true
				this.overlay = false
				let _this = this
				setTimeout(() => {
					_this.showPer = false
					_this.overlay = true
				}, 400)
			} else {
				//外部直接编辑
				this.showEdit = true
			}
			this.editPosition = position
			this.modifyTour = JSON.parse(JSON.stringify(item))
			this.modifyTour.status = hasCheck
			this.modifyTour.idx = index
		},
		//快捷选中游客
		chooseItem(item, sign) {
			// 根据票种设置单选或复选
			if (this.productInfo.PickTicket == 0) {
				//为0 大票
				if (item.checked) {
					//取消
					this.tourist.forEach(el => (el.checked = false))
					item.checked = false
					this.chosePer = [{}]
				} else {
					//选中
					this.tourist.forEach(el => (el.checked = false))
					item.checked = true
					this.chosePer = [item]
				}
			} else {
				//为1 一人一票
				if (item.checked == true) {
					//取消选中
					item.checked = !item.checked
					this.chosePer = this.chosePer.map(el => {
						if (el.CardID === item.CardID) {
							return {}
						} else {
							return el
						}
					})
				} else {
					//选中数据
					let checkedPer = this.tourist.filter(el => el.checked == true)
					if (checkedPer.length < this.setpValue) {
						item.checked = !item.checked
						let nouseIndex = this.chosePer.findIndex(val => {
							return !val.UserName || val.UserName == ''
						})
						this.chosePer[nouseIndex] = item
					} else {
						this.$toast('已达到最大出行人数')
						if (sign) {
							//阻止默认事件选中状态
							this.$refs[`newTourist${item.CardID}`][0].toggle(false)
						}
					}
				}
			}
		},
		//新增编辑游客中点击选中或取消
		changeNewStu(event, item) {
			this.chooseItem(item, 'new')
		},
		// 开启新增编辑游客弹窗
		openTourist() {
			this.showPer = true
		},
		//确定选中游客
		selectPre() {
			this.showPer = false
		},
		//编辑游客信息
		editPre() {
			if (!this.modifyTour.UserPhone || this.modifyTour.UserPhone == '') {
				this.$toast('请输入电话号码')
				return
			} else if (!this.$checkPhone(this.modifyTour.UserPhone)) {
				this.$toast('电话号码不正确')
				return
			}
			//开启实名制校验
			if (this.$store.state.shopInfo.IsCheckPerson) {
				if (!this.modifyTour.UserIdCard || this.modifyTour.UserIdCard == '') {
					this.$toast('请输入身份证号')
					return
				} else if (!this.$checkCard(this.modifyTour.UserIdCard)) {
					this.$toast('身份证号码不正确')
					return
				}
			} else {
				console.log(111111111111111111)

				if (this.modifyTour.UserIdCard && this.modifyTour.UserIdCard != '' && !this.$checkCard(this.modifyTour.UserIdCard)) {
					this.$toast('身份证号码不正确')
					return
				}
			}
			let params = {
				MerchantCode: this.$store.state.shopInfo.MerchantCode,
				OpenId: this.$store.state.userInfo.openid,
				Unionid: 'test001',
				UserName: this.modifyTour.UserName || '',
				Phone: this.modifyTour.UserPhone || '',
				IDNumber: this.modifyTour.UserIdCard || '',
				CardID: this.modifyTour.CardID || '',
				IDType: 2,
				CardNo: this.modifyTour.CardNo || '',
				IsAdd: this.modifyTour.CardID ? 2 : 1
			}
			this.$ajax.get('Home/Order_PassengerEdit', params).then(res => {
				if (res.Code == 200) {
					if (this.editPosition == 'insideNew') {
						this.showEdit = false
						this.showPer = true
					} else {
						this.showEdit = false
					}
					if (this.modifyTour.CardID) {
						//CardID即为当前已有护照编辑
						this.tourist = this.tourist.map(el => {
							if (el.CardID === res.Data.CardID) {
								return { ...res.Data, checked: this.modifyTour.status }
							} else {
								return el
							}
						})
						this.chosePer = this.chosePer.map(el => {
							if (el.CardID === res.Data.CardID) {
								return { ...res.Data, checked: this.modifyTour.status }
							} else {
								return el
							}
						})
					} else if (this.modifyTour.idx != null && this.modifyTour.idx >= 0) {
						//当前已添加的空白人员添加信息
						this.tourist.push({
							...res.Data,
							checked: true
						})
						this.chosePer[this.modifyTour.idx] = {
							...res.Data,
							checked: this.modifyTour.status
						}
					} else {
						//全新创建
						this.tourist.push({
							...res.Data,
							checked: false
						})
					}
				} else {
					this.$toast(res.Content)
				}
			})
		},
		// 进入产品购买须知
		enterRules() {
			this.$router.push({
				path: './need',
				query: {
					productInfo: JSON.stringify(this.productInfo),
					MerchantCode: this.$getQuery('MerchantCode')
				}
			})
		},
		//立即购买
		buyNow() {
			//是否启用条款
			if (this.productInfo.IsEnableRule) {
				this.showClause = true
			} else {
				this.payAction()
			}
		},
		//付款操作
		payAction() {
			let uesLen = this.chosePer.length
			let count = 0
			this.chosePer.forEach(el => {
				if (!el.UserName || el.UserName == '') {
					count++
				}
			})
			if (this.productInfo.PickTicket == 0) {
				if (count != 0) {
					this.$toast('请补全出行人信息')
					return
				}
			} else {
				if (uesLen < this.setpValue || count != 0) {
					this.$toast('请补全出行人信息')
					return
				}
			}
			if (this.$store.state.userInfo.openid) {
				let params = {
					MerchantCode: this.$store.state.shopInfo.MerchantCode,
					OpenID: this.$store.state.userInfo.openid,
					PlayDate: this.useOtherDate,
					LinkName: this.chosePer[0].UserName,
					LinkPhone: this.chosePer[0].UserPhone,
					LinkIDNumber: this.chosePer[0].CardID, //后台接收护照号并非身份证号
					ProductID: this.$route.query.productId || this.$getQuery('productId'),
					ProductName: this.productInfo.ProductName,
					PickTicket: this.productInfo.PickTicket,
					BuyCount: this.setpValue,
					TicketPrice: this.ticketPrice,
					SellPrice: this.sellPrice
				}
				this.creatOrder(params)
			} else {
				this.$toast('用户登陆授权未成功')
			}
		},
		//不同意条款
		noPassClause() {
			this.showClause = false
		},
		//同意条款---立即购买
		passClause() {
			if (this.checked) {
				this.showClause = false
				this.payAction()
			} else {
				this.$toast('请确认已熟知且同意条款内容')
			}
		},
		//创建订单返回支付信息
		creatOrder(params) {
			this.$load()
			this.$ajax
				.post(
					'Home/Order_Submit',
					{},
					{ OrderJson: JSON.stringify(params), PassengerJson: JSON.stringify(this.chosePer), IsScan: this.$route.query.IsScan || this.$getQuery('IsScan') }
				)
				.then(res => {
					this.$close()
					if (res.Code == 200) {
						this.weChatPay(res.Data.PayData)
						this.OrderNo = res.Data.OrderNo
					} else {
						this.$toast(res.Content)
					}
				})
				.catch(err => {
					this.$close()
					this.$toast(err)
				})
		},
		//微信支付
		weChatPay(params) {
			let data = JSON.parse(params)
			WeixinJSBridge.invoke('getBrandWCPayRequest', data, res => {
				if (res.err_msg == 'get_brand_wcpay_request:ok') {
					// 使用以上方式判断前端返回,微信团队郑重提示：
					//res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
					this.$router.push({
						path: '/order',
						query: {
							MerchantCode: this.$getQuery('MerchantCode')
						}
					})
					this.toServrPay()
				} else {
					this.$router.push({
						path: '/order',
						query: {
							MerchantCode: this.$getQuery('MerchantCode')
						}
					})
				}
			})
		},
		//支付成功调用方法
		toServrPay() {
			this.$ajax.post('Home/Order_PaySuccessUpdate', { OrderNo: this.OrderNo, Status: 'SUCCESS' }).then(res => {})
		}
	}
}
</script>
<style lang="less" scoped src="@/style/home/buy.less">
</style>