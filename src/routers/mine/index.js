/*我的---路由*/

const Mine = () => import('../../views/mine/index.vue');
const View = () => import('../../views/mine/children/View.vue');


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
          parent: 'mine'
        }
      },
    ]
  },
]
export default Mines