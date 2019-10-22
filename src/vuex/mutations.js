export default {
  setShopName (state, data) {
    state.shopInfo.shopName = data;
  },
  setShopInfo (state, data) {
    state.shopInfo = data;
  },
  setOpenId (state, data) {
    state.openId = data
  }
}
