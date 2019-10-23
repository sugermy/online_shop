import { merAjax } from '@/utils/webapi'
export default {
  //获取openid方法--获取重定向地址换取code
  getRedirectUrl ({ commit }, data) {
    return new Promise((resolve, reject) => {
      merAjax.get('Home/GetOpenID_H5', {}).then(res => {
        if (res.Code == 200) {
          commit('setRedirectUrl', res.Data)
        } else {
          commit('setRedirectUrl', '')
        }
        resolve()
      })
    })
  },

  //根据code获取用户信息
  getUserInfo ({ commit }, data) {
    return new Promise((resolve, reject) => {
      merAjax.get('Home/GetUserInfo_H5', { code: data }).then(res => {
        if (res.Code == 200) {
          commit('setUserInfo', JSON.parse(res.Data))
          resolve()
        } else {
          commit('setUserInfo', {})
          resolve()
        }
      })
    })
  },

  //设置商城名称
  getShopInfo ({ commit }, data) {
    return new Promise((resolve, reject) => {
      merAjax.get('Ticket/PageLoad_GetShopSetting', {}).then(res => {
        if (res.Code == 200) {
          commit('setShopInfo', res.Data)
          resolve(200)
        } else {
          commit('setShopInfo', {})
          resolve(0)
        }
      })
    })
  },
}
