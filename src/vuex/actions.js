import { merAjax } from '@/utils/webapi'

export default {
  //获取openid方法
  getOpenID ({ commit }, data) {
    let openId = localStorage.getItem('openId');
    return new Promise((resolve, reject) => {
      if (openId) {
        commit('setOpenId', openId)
        resolve()
      } else {
        merAjax.get('', {}).then(res => {
          if (res) {
            commit('setOpenId', res)
          } else {
            commit('setOpenId', '')
          }
          resolve()
        })
      }

    })
  },

  //设置商城名称
  setShopName ({ commit }, data) {
    commit('setShopName', data);
  },
}
