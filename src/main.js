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
/*Vant 插件的按需引入*/
import { Cell, CellGroup, Overlay, Toast, Button, Lazyload, Swipe, SwipeItem, SwipeCell, Tab, Tabs, Dialog, Popup, DatetimePicker, Stepper, Checkbox, CheckboxGroup, RadioGroup, Radio, Field, Collapse, CollapseItem, Image } from 'vant';
Vue.prototype.$toast = Toast
Vue.use(Cell).use(CellGroup);//Cell 单元格
Vue.use(Overlay);//遮罩
Vue.use(Button)//按钮组件
Vue.use(Lazyload, {})//懒加载组件---主要用在加载图片
Vue.use(Swipe).use(SwipeItem);//轮播图组件
Vue.use(SwipeCell);//滑动时删除
Vue.use(Tab).use(Tabs);//tabs选项卡组件
Vue.use(Dialog);//弹窗
Vue.use(Popup);//页面弹出
Vue.use(DatetimePicker);//时间选择器
Vue.use(Stepper);//计数器
Vue.use(Checkbox).use(CheckboxGroup);//复选框
Vue.use(RadioGroup);//单选组
Vue.use(Radio);//单选插件
Vue.use(Field);//表单中的输入框组件
Vue.use(Collapse).use(CollapseItem);//折叠面板
Vue.use(Image);//图片

Vue.use(Router)
//设置vue在启动时是否生成生产提示
Vue.config.productionTip = process.env.NODE_ENV === 'development'

// store.dispatch('getOpenID').then(() => {
//   console.log(store);
// })
let newAjax = new Ajax('', window.SYSTEM_CONFIG.MerchantCode)//实例化AJAX并且挂载VUE原型
Vue.prototype.$ajax = newAjax

let { checkCard, checkPhone } = checkFun //原型扩展  正则验证身份证
Vue.prototype.$checkCard = checkCard
Vue.prototype.$checkPhone = checkPhone
//process.env  开发环境属性

/*根据业务需求方法过滤需要的路由---设置无权限路由是为了防止用户直接输入地址可访问未授权的页面内容*/
let allRouter = new Router({
  mode: 'history',
  routes: [...HomeRouters, ...OrderRouters, ...MineRouters]
})

renderApp(allRouter)
//正常权限执行
function renderApp (router) {
  //设置动态title
  router.beforeEach((to, from, next) => {
    if (to.meta.title) {
      //跳转前动态设置当前title
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