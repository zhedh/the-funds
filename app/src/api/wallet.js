import http from "./http";

class WalletApi {
  /**
   * 我的钱包
   **/
  static getWallets(options = {}) {
    return http.post('/userassets/mywarehouse', options)
  }

  /**
   * 基金详情（下单页面初始化）
   *
   * productId number 商品id（不传默认自动获取）
   **/
  static getProductDetail(options = {}) {
    return http.post('/order/createini', options)
  }

  /**
   * 创建订单
   *
   * @required payToken string 支付TOKEN
   * @required productId string 商品id
   * @required productAmount string 商品数量
   * special string 0为普通定存，1为特价买入
   *
   **/
  static createOrder(options = {}) {
    return http.post('/order/createorder', options)
  }

  /**
   * 获取USDT流水
   *
   * type string balance(代表USDT) 默认值：balance
   * page string 页码
   * row string 每页条数
   *
   **/
  static getUsdtStream(options = {}) {
    return http.post('/userassets/stream', options)
  }

  /**
   * 获取基金流水
   *
   * @required productId string 商品id
   **/
  static getCoinStream(options = {}) {
    return http.post('/userassets/mywarehouselist', options)
  }
}

export default WalletApi
