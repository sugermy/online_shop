import Vue from 'vue'
import App from './App.vue'
import store from './vuex/index'
import Router from 'vue-router'
import { HomeRouters, OrderRouters, MineRouters } from './routers'//路由---解构路由过滤
import Ajax from './utils/ajax'//二次封装ajax
import './utils/filter'//VUE过滤器
import * as checkFun from './utils/format'//VUE格式化
import './style/reset.less'//基础重置样式
import './style/ui_reset.less'//基础UI框架重置样式
// import FastClick from "fastclick";//解决IOS点击事件300ms延迟
// FastClick.attach(document.body);
/*Vant*/
import { PullRefresh, Cell, CellGroup, Overlay, Toast, Button, Lazyload, Swipe, SwipeItem, SwipeCell, Tab, Tabs, Dialog, Popup, DatetimePicker, Stepper, Checkbox, CheckboxGroup, RadioGroup, Radio, Field, Collapse, CollapseItem, Image } from 'vant';
Vue.use(PullRefresh);//下拉刷新
Vue.use(Cell).use(CellGroup);//Cell 单元格
Vue.use(Overlay);//遮罩
Vue.use(Button)//按钮组件
Vue.use(Lazyload, {})//懒加载组件---主要用在加载图片
Vue.use(Swipe).use(SwipeItem);//轮播图组件
Vue.use(SwipeCell);//滑动时删除
Vue.use(Tab).use(Tabs);//tabs选项卡组件
Vue.use(Dialog);//注册弹窗组件
Vue.use(Popup);//页面弹出
Vue.use(DatetimePicker);//时间选择器
Vue.use(Stepper);//计数器
Vue.use(Checkbox).use(CheckboxGroup);//复选框
Vue.use(RadioGroup);//单选组
Vue.use(Radio);//单选插件
Vue.use(Field);//表单中的输入框组件
Vue.use(Collapse).use(CollapseItem);//折叠面板
Vue.use(Image);//图片
Vue.prototype.$toast = Toast
Vue.prototype.$dialog = Dialog//原型扩展弹窗方法


//设置vue在启动时是否生成生产提示
Vue.config.productionTip = process.env.NODE_ENV === 'development'
let { checkCard, checkPhone, encryptCard } = checkFun //原型扩展  正则验证身份证
Vue.prototype.$checkCard = checkCard
Vue.prototype.$checkPhone = checkPhone
Vue.prototype.$encryptCard = encryptCard

/* 获取url中的参数 */
let getQuery = function (name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || ['', ''])[1].replace(/\+/g, '%20')) || null
}

/*router*/
let allRouter = new Router({
  mode: 'history',
  routes: [...HomeRouters, ...OrderRouters, ...MineRouters]
})
Vue.use(Router)

let enterHref = JSON.parse(JSON.stringify(location.href))
//根据code换取当前登陆用户的个人信息
let MerchantCode = getQuery('MerchantCode')
let code = getQuery('code');
if (MerchantCode && MerchantCode != '') {
  if (code && code != '') {
    getUser(code)
  } else {//缺省页地址栏无code 说明暂无授权
    store.dispatch('getRedirectUrl').then(() => {
      redirurl()
    })
    // getUser('manyiTest')
  }
} else {
  Toast('暂无商户')
}

//地址重定向
function redirurl () {
  let IsScan = getQuery('IsScan');
  if (IsScan && IsScan != 0) {
    location.href = store.state.redirectUrl + escape(enterHref)
  } else {
    location.href = store.state.redirectUrl + escape(window.SYSTEM_CONFIG.wechatUrl + '?MerchantCode=' + MerchantCode)
  }
}

//登陆
function getUser (code) {
  store.dispatch('getUserInfo', code).then(() => {
    let newAjax = new Ajax(store.state.userInfo.openid, MerchantCode)//实例化AJAX并且挂载VUE原型
    Vue.prototype.$ajax = newAjax
    getShop()
  })
}
//登陆获取商城信息
function getShop () {
  store.dispatch('getShopInfo').then((res) => {
    if (res == 200) {
      //设置商城名称
      document.title = store.state.shopInfo.ShopName;
      renderApp(allRouter)
    } else {
      Toast('获取商城信息失败')
    }
  })
}
//template
function renderApp (router) {
  //router-title
  router.beforeEach((to, from, next) => {
    if (to.meta.title) {
      document.title = to.meta.title;
    }
    next();
  });
  let app = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}

//toast
let loading = function loadding () {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    loadingType: 'spinner',
    duration: 0
  })
}
let closeing = function loadding () {
  Toast.clear()
}
Vue.prototype.$load = loading
Vue.prototype.$close = closeing
Vue.prototype.$getQuery = getQuery