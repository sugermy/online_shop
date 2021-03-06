import axios from "axios";
import qs from "qs";
const baseURL = window.SYSTEM_CONFIG.webServer; //基础服务地址

export default class Ajax {
  /**
   * @param { String } WebURL        基础请求地址
   * @param { String } OpenId         通行凭证OpenId
   * @param { Number } TIMEOUT        超时时间
   * @param { String } MerchantCode   商户号
   */
  constructor(OpenId = "", MerchantCode = "", TIMEOUT = 60000) {
    // 创建一个新的axios实例，并设置默认请求头
    this._axios = axios.create({
      baseURL,
      TIMEOUT,
      params: {
        OpenId,
        MerchantCode: MerchantCode
      },
    });
    this._axios.interceptors.request.use(
      config => {
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );
    this._axios.interceptors.response.use(
      response => {
        return response.data;
      },
      error => {
        return Promise.reject(error);
      }
    );
  }
  // 请求方式
  get (url, params = {}) {
    return this._axios({ method: "get", url, params: { ...this._axios.defaults.params, ...params } });
  }
  post (url, params = {}, data = {}) {
    let headers = {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    }
    data = qs.stringify(data);

    return this._axios({ method: "post", headers, url, params: { ...this._axios.defaults.params, ...params }, data });
  }
}
