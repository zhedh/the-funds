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
}

export default ProductApi
