/*我的---路由*/

const Mine = () => import('../../views/mine/index.vue');
const View = () => import('../../views/mine/children/View.vue');
const Detail = () => import('../../views/mine/children/Detail.vue');
const Create = () => import('../../views/mine/children/Create.vue');


const Mines = [
  {
    path: '/mine',
    component: Mine,
    redirect: '/mine/view',
    children: [
      {
        path: 'view',
        name: 'mineView',
        component: View,
        meta: {
          parent: 'mine',
          title: '我的护照'
        }
      },
      {
        path: 'detail',
        name: 'mineDetail',
        component: Detail,
        meta: {
          parent: 'mine',
          title: '护照详情'
        }
      },
      {
        path: 'create',
        name: 'mineCreate',
        component: Create,
        meta: {
          parent: 'mine',
          title: '创建护照'
        }
      },
    ]
  },
]
export default Mines