<template>
  <div class="buy">
    <!-- 选择日期s -->
    <div class="buy-part part-date">
      <h3 class="part-title">使用日期</h3>
      <div class="part-main">
        <div class="part-date-item" :class="pickDate==1?'pick-date':''" @click="selectDate(1)">
          <p>今日{{todayDate}}</p>
          <p>￥300</p>
          <i class="pick-icon" v-show="pickDate==1"></i>
        </div>
        <div class="part-date-item" :class="pickDate==2?'pick-date':''" @click="selectDate(2)">
          <p>明日{{tomorrowDate}}</p>
          <p>￥310</p>
          <i class="pick-icon" v-show="pickDate==2"></i>
        </div>
        <div class="part-date-item" :class="pickDate==3?'pick-date':''" @click="selectDate(3)">
          <p>后日{{afterDate}}</p>
          <p>￥320</p>
          <i class="pick-icon" v-show="pickDate==3"></i>
        </div>
        <div class="part-date-item" :class="pickDate==4?'pick-date':''" @click="selectDate(4)">
          <p>其他{{otherDate}}</p>
          <p>￥300</p>
          <i class="pick-icon" v-show="pickDate==4"></i>
        </div>
      </div>
    </div>
    <!-- 选择日期e -->

    <!-- 产品操作s -->
    <div class="buy-part part-info">
      <h3 class="part-title">产品信息</h3>
      <div class="part-main">
        <img class="part-img" src="../../../assets/pic.png" v-if="$route.query.id==1">
        <div class="part-info" :class="$route.query.id==1?'has-img':''">
          <p class="part-name">珠海长隆国际马戏城</p>
          <p class="part-detail ellipsis">太平湖宽处烟波浩渺，似洞庭之坦荡…</p>
          <div class="part-action">
            <span class="part-price">￥250</span>
            <van-stepper button-size="20px" @change="changeNum" @plus="addNum" @minus="reduceNum" integer v-model="setpValue" />
          </div>
        </div>
      </div>
      <div class="part-rules">
        <div class="part-rules-list">
          <i class="rules-icon"></i>
          <span>交通票</span>
          <i class="rules-line">|</i>
          <span>适用人群：18至25岁</span>
        </div>
        <div class="part-rules-enter" @click="enterRules">
          购买须知 >
        </div>
      </div>
    </div>
    <!-- 产品操作e -->

    <!-- 游客绑定s -->
    <div class="buy-part part-tourist">
      <h3 class="part-title">出行人信息</h3>
      <div class="tourist-action">
        <div class="tourist-list">
          <div class="tourist-item" v-for="(item,index) in tourist" :key="index" @click="chooseItem(item)" :class="item.checked?'checked-item':''">{{item.name}}<i
              v-show="item.checked" class="tourist-icon"></i></div>
        </div>
        <div class="tourist-modify" @click="openTourist">新增/编辑</div>
      </div>
      <div class="check-tourist">
        <div class="check-item" v-for="(item,index) in chosePer" :key="index">
          <p class="i-name" v-show="item.name">{{item.name}}</p>
          <p class="i-card i-txt" v-show="item.card">身份证号：{{item.card}}</p>
          <p class="i-phone i-txt" v-show="item.phone">手机号：{{item.phone}}</p>
          <i class="check-edit" @click="touristEdit(item.id)"></i>
        </div>
      </div>
    </div>
    <!-- 游客绑定e -->
    <div class="buy-pay">
      <div class="pay-total">
        <i>合计：</i>
        <span class="pay-price">￥300</span>
      </div>
      <div class="pay-action">立即购买</div>
    </div>

    <!-- 时间选择器s -->
    <van-popup v-model="showDate" position="bottom">
      <van-datetime-picker v-model="currentDate" type="date" :formatter="formatter" :min-date="minDate" :max-date="maxDate" @cancel="cancelDate" @confirm="checkDate" />
    </van-popup>
    <!-- 时间选择器e -->

    <!-- 新增编辑游客s -->
    <van-popup v-model="showPer" class="show-per" round position="bottom">
      <header class="per-header">
        <div class="per-btn cancel" @click="showPer=false">取消</div>
        <div class="per-btn choose" @click="selectPre">确定</div>
      </header>
      <main class="per-main">
        <div class="main-top">
          <i class="per-icon"></i>
          <span class="per-txt">添加出行人信息</span>
        </div>
        <div class="main-content">
          <div v-for="(item,index) in tourist" :key="index" class="per-item">
            <van-checkbox v-model="item.checked" shape="square" checked-color="#FF9921"></van-checkbox>
            <div class="per-info">
              <p class="i-name" v-show="item.name">{{item.name}}</p>
              <p class="i-card i-txt" v-show="item.card">身份证号：{{item.card}}</p>
              <p class="i-phone i-txt" v-show="item.phone">手机号：{{item.phone}}</p>
            </div>
            <div class="per-edit" @click="touristEdit(item.id)"></div>
          </div>
        </div>
      </main>
    </van-popup>
    <!-- 新增编辑游客e -->

    <!-- 编辑游客信息s -->
    <van-popup v-model="showEdit" class="show-per edit-per" round position="bottom">
      <header class="per-header">
        <div class="per-btn cancel" @click="showEdit=false">取消</div>
        <div class="title">编辑信息</div>
        <div class="per-btn choose" @click="selectPre">确定</div>
      </header>
      <main class="per-main">
        <van-cell-group>
          <van-field v-model="perMaster.name" label="姓名" placeholder="请输入姓名" />
          <van-field v-model="perMaster.phone" type="tel" label="电话号码" placeholder="请输入电话号码" />
          <van-field v-model="perMaster.idcard" type="tel" label="身份证号" placeholder="请输入身份证号" />
        </van-cell-group>
      </main>
    </van-popup>
    <!-- 编辑游客信息e -->
  </div>
</template>
<script>
export default {
	data() {
		return {
			pickDate: 1,
			setpValue: 1,
			chosePer: [{}],
			showDate: false,
			showPer: false,
			showEdit: false,
			perMaster: { name: '', phone: '', idcard: '' },
			currentDate: new Date(),
			otherDate: new Date().format('MM-dd'),
			minDate: new Date(),
			tourist: [
				{ name: '小笼包', id: 1, card: '411381199409054817', phone: '18520838663', checked: false },
				{ name: '小肉包', id: 2, card: '411381199409054817', phone: '18520838663', checked: false },
				{ name: '王先生', id: 3, card: '411381199409054817', phone: '18520838663', checked: false },
				{ name: '小素包', id: 4, card: '411381199409054817', phone: '18520838663', checked: false },
				{ name: '韭菜包', id: 5, card: '411381199409054817', phone: '18520838663', checked: false },
				{ name: '酸菜包', id: 6, card: '411381199409054817', phone: '18520838663', checked: false },
				{ name: '鱼香肉丝包', id: 7, card: '411381199409054817', phone: '18520838663', checked: false },
				{ name: '梅干菜包', id: 8, card: '411381199409054817', phone: '18520838663', checked: false },
				{ name: '香菇包', id: 9, card: '411381199409054817', phone: '18520838663', checked: false },
				{ name: '花卷', id: 10, card: '411381199409054817', phone: '18520838663', checked: false }
			]
		}
	},
	created() {
		// console.log(this.$route.query)
	},
	computed: {
		//今日日期
		todayDate() {
			return new Date().format('MM-dd')
		},
		//明日日期
		tomorrowDate() {
			let today = new Date()
			return new Date(today.getTime() + 24 * 60 * 60 * 1000).format('MM-dd')
		},
		//后日日期
		afterDate() {
			let today = new Date()
			return new Date(today.getTime() + 24 * 60 * 60 * 1000 * 2).format('MM-dd')
		},
		//最大可购买日期
		maxDate() {
			return new Date(this.minDate.getTime() + 24 * 60 * 60 * 1000 * 30)
		}
	},
	methods: {
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
			if (v == 4) {
				this.showDate = true
			} else {
				console.log(1)
			}
		},
		//确定日期选择
		checkDate(v) {
			this.showDate = false
			this.otherDate = v.format('MM-dd')
		},
		//取消日期选择
		cancelDate() {
			this.showDate = false
		},
		// 数量增加操作
		addNum() {
			this.chosePer.push({})
		},
		//数量减少操作
		reduceNum() {
			// 根据票种类型判断是否执行以下代码
			this.chosePer.pop()
			this.tourist.forEach(el => {
				el.checked = false
			})
			//先修改整体游客为false--再做循环添加checked
			this.chosePer.forEach(el => {
				this.tourist.forEach(kl => {
					if (el.id == kl.id) {
						kl.checked = true
					}
				})
			})
		},
		//输入框值改变
		changeNum(v) {
			console.log(v)
		},
		//编辑游客
		touristEdit(id) {
			if (this.showPer) {
				//在弹出层内部点击编辑
				this.showPer = false
				this.showEdit = true
			} else {
				//外部直接编辑
				this.showEdit = true
			}
		},
		//快捷选中游客
		chooseItem(item) {
			// 根据票种设置单选或复选
			if (item.checked == true) {
				//取消选中
				item.checked = !item.checked
				this.chosePer = this.chosePer.map(el => {
					if (el.id == item.id) {
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
						return !val.name || val.name == ''
					})
					this.chosePer[nouseIndex] = item
				} else {
					this.$toast('已达到最大出行人数')
				}
			}
		},
		// 开启新增编辑游客弹窗
		openTourist() {
			this.showPer = true
		},
		//确定选中游客
		selectPre() {},
		// 进入产品购买须知
		enterRules() {
			console.log('enterRules')
		}
	}
}
</script>
<style lang="less" scoped src="@/style/home/buy.less">
</style>