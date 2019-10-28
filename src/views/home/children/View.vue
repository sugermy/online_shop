<template>
  <div class="home">

    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <!-- 头部信息栏s -->
      <div class="header">
        <p class="user-name">Hi，<span>{{userName}}</span></p>
        <img class="user-photo" :src="headPhoto">
      </div>
      <!-- 头部信息栏e -->

      <!-- 轮播图s -->
      <div class="swiper">
        <van-swipe :autoplay="3000" :height="200" indicator-color="#FF6632">
          <van-swipe-item v-for="(item, index) in BannelList" :key="index">
            <img class="swiper-img" :src="item.ImgUrl" v-lazy="item.ImgUrl" slot="default" @click="targetUrl(item.LinkUrl)">
          </van-swipe-item>
        </van-swipe>
      </div>
      <!-- 轮播图e -->

      <!-- 主体产品区域s -->
      <div class="tabs">
        <van-tabs v-model="active" background="#ecf2f6" title-active-color="#FF6632" animated>
          <van-tab v-for="(item,index) in TypeList" :key="index" :title="item.TitleName">
            <div v-if="item.TitleType==2" class="pro-type">
              <div v-for="(el,key) in item.ProductList" :key="key" class="pro-itema" @click.stop="showDetail(item.TitleName,item.TitleType,el)">
                <img :src="el.PicImgSmall" class="pro-img" />
                <div class="pro-info">
                  <p class="pro-name">{{el.ProductName}}</p>
                  <p class="pro-detail">{{el.ProductIntroduce}}</p>
                  <p v-show="el.IsLimitAge" class="pro-year"><i class="year-icon"></i><span class="year-d">{{el.ShowLimitAge}}</span></p>
                  <p class="pro-buy">
                    <span class="pro-price">￥{{el.SellPrice}}</span>
                    <span class="pro-go" @click.stop="wentBuy(el.ProductID,item.TitleType)">立即购买</span>
                  </p>
                </div>
              </div>
            </div>
            <div v-if="item.TitleType==1" class="pro-type">
              <div v-for="(el,key) in item.ProductList" :key="key" class="pro-itemb" @click.stop="showDetail(item.TitleName,item.TitleType,el)">
                <div class="pro-info">
                  <p class="pro-name">{{el.ProductName}}</p>
                  <p v-show="el.IsLimitAge" class="pro-year"><i class="year-icon"></i><span class="year-d">{{el.ShowLimitAge}}</span></p>
                  <p class="pro-detail">查看详情 ></p>
                </div>
                <div class="pro-buy">
                  <span class="pro-price">￥{{el.SellPrice}}</span>
                  <span class="pro-go" @click.stop="wentBuy(el.ProductID,item.TitleType)">立即购买</span>
                </div>
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
      <!-- 主体产品区域e -->

      <!-- 游玩须知s -->
      <div class="needs" v-if="isShowRemark">
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

    </van-pull-refresh>

    <!-- 弹窗详情s -->
    <van-dialog v-model="showProp" closeOnClickOverlay :showConfirmButton="false">
      <h3 class="prop-header">
        <i class="prop-icon"></i>
        <span>{{showProduct.title}}</span>
        <i class="prop-icon"></i>
      </h3>
      <div class="prop-main">
        <p class="prop-name">{{showProduct.ProductName}}</p>
        <p class="prop-detail">{{showProduct.ProductIntroduce}}</p>
        <p class="prop-year" v-show="showProduct.IsLimitAge"><i class="year-icon"></i><span class="year-d">{{showProduct.ShowLimitAge}}</span></p>
        <p class="prop-price">￥{{showProduct.SellPrice}}</p>
        <p class="prop-go" @click="wentBuy(showProduct.ProductID,showProduct.type,true)">立即购买</p>
      </div>
    </van-dialog>
    <!-- 弹窗详情e -->

  </div>
</template>
<script>
export default {
	name: 'homeView',
	data() {
		return {
			userName: 'Isgo', //登陆用户信息
			headPhoto: require('@/assets/head_photo.png'), //登陆用户信息
			BannelList: [], //轮播数组
			active: 2, //当前激活tabs
			TypeList: [], //类型票和产品数组
			isShowRemark: false,
			RemarkList: [], //游玩须知内容
			baseImg: require('@/assets/pic.png'), //适用人群的图标
			showProp: false, //显示弹出层操作
			showProduct: {}, //弹出层产品内容
			isLoading: false
		}
	},
	created() {
		this.getHomeData()
		this.userName = this.$store.state.userInfo.nickname
	},
	mounted() {},
	//缓存组件生命周期
	activated() {
		document.title = this.$store.state.shopInfo.ShopName
	},
	methods: {
		//获取首页数据
		getHomeData(showToast) {
			if (!showToast) {
				this.$load()
			}
			this.$ajax.get('Ticket/PageLoad_GetSettingInfo', { ShopCode: this.$store.state.shopInfo.ShopCode }).then(res => {
				if (!showToast) {
					this.$close()
				} else {
					this.isLoading = false
				}
				this.BannelList = res.Data.BannelList
				this.TypeList = res.Data.TypeList
				this.isShowRemark = res.Data.IsEnabled_Remark
				this.RemarkList = res.Data.RemarkList
			})
		},
		//下拉刷新
		onRefresh() {
			this.getHomeData('notoast')
		},
		//显示产品内容弹窗
		showDetail(name, type, v) {
			this.showProp = true
			this.showProduct = v
			this.showProduct.title = name
			this.showProduct.type = type
		},
		//去购买---提前判断是否在弹出层点击事件
		wentBuy(productId, type, showModel) {
			if (showModel) {
				this.showProp = false
				this.enterNext(productId, type)
			} else {
				this.enterNext(productId, type)
			}
		},
		//轮播点击跳转
		targetUrl(url) {
			if (url != '') {
				location.href = url
			}
		},
		//购买跳转页面
		enterNext(productId, type) {
			this.$router.push({
				path: './buy',
				query: {
					productId: productId,
					hasImg: type,
					enterType: 0
				}
			})
		}
	}
}
</script>
<style lang="less" scoped src="@/style/home/index.less">
</style>