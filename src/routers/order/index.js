/*订单---路由*/

const Order = () => import('../../views/order/index.vue');
const View = () => import('../../views/order/children/View.vue');
const Detail = () => import('../../views/order/children/Detail.vue');


const Orders = [
  {
    path: '/order',
    name: 'order',
    component: Order,
    redirect: '/order/view',
    children: [
      {
        path: 'view',
        name: 'orderView',
        component: View,
        meta: {
          parent: 'order',
          title: '我的订单'
        }
      },
      {
        path: 'detail',
        name: 'orderDetail',
        component: Detail,
        meta: {
          parent: 'order',
          title: '订单详情'
        }
      },
    ]
  },
]
export default Orders