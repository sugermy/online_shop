import Ajax from '@/utils/ajax'
/* 获取url中的参数 */
let getQuery = function (name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || ['', ''])[1].replace(/\+/g, '%20')) || null
}
let MerchantCode = getQuery('MerchantCode') || ''
const merAjax = new Ajax('', MerchantCode)

export { merAjax }
