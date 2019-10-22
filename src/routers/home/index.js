/*首页---路由*/

import store from '../../vuex'
//商城基本信息获取，设置属性
store.dispatch('setShopName', '南岳衡山交通')

const Home = () => import('../../views/home/index.vue');
const View = () => import('../../views/home/children/View.vue');
const Buy = () => import('../../views/home/children/Buy.vue');
const Need = () => import('../../views/home/children/Need.vue');


const Homes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    redirect: '/home/view',
    children: [
      {
        path: 'view',
        name: 'homeView',
        component: View,
        meta: {
          parent: 'home',
          title: store.state.shopInfo.shopName
        }
      },
      {
        path: 'buy',
        name: 'Buy',
        component: Buy,
        meta: {
          parent: 'home',
          title: '购票详情'
        }
      },
      {
        path: 'need',
        name: 'Need',
        component: Need,
        meta: {
          parent: 'home',
          title: '购票须知'
        }
      },
    ]
  },
]
export default Homes