import http from "./http";

class ProductApi {
  /**
   * 基金列表
   *
   * page string 页码默认1
   * row string 每页条数
   **/
  static getProductList(options = {}) {
    options.noLogin = true;
    return http.post('/product/list', options)
  }

  /**
   * 基金详情（下单页面初始化）
   *
   * product_id number 商品id（不传默认自动获取）
   **/
  static getProductDetail(options = {}) {
    return http.post('/order/createini', options)
  }
}

export default ProductApi
