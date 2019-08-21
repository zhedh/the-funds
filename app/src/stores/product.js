import { observable, action, computed } from 'mobx'
import { ProductApi } from '../api'
import { Toast } from 'antd-mobile'

class ProductStore {
  @observable products = []
  @observable currentProduct = {}
  @observable productDetail = {}
  @observable gearNum = null

  @computed
  get gears() {
    return this.productDetail.amountList || []
  }

  @action
  getProducts() {
    return ProductApi.getProductList().then(res => {
      if (res.status !== 1) {
        Toast.info(res.msg)
        return null
      }
      // res.data.push({id: 234241, productName: "XB"})
      this.products = res.data
      this.currentProduct = res.data[0] || {}
      return this.currentProduct.id
    })
  }

  @action
  getProductDetail(productId) {
    return ProductApi.getProductDetail({ productId }).then(res => {
      if (res.status !== 1) {
        Toast.info(res.msg)
        return
      }
      this.productDetail = res.data
    })
  }

  @action
  changeProduct(id, isChangeDetail) {
    this.currentProduct = this.products.find(product => product.id === id)
    if (isChangeDetail) this.getProductDetail(id)
  }

  @action
  changeGearNum(num) {
    this.gearNum = num
  }

  @action
  createOrder(payToken) {
    return ProductApi.createOrder({
      payToken,
      productId: this.productDetail.productId,
      productAmount: this.gearNum,
      special: '0'
    })
  }
}

export default ProductStore
