import {observable, action} from 'mobx'
import {WalletApi} from "../api";

class WalletStore {
  @observable wallets = []
  @observable currentWallet = {}
  @observable usdtStream = []
  @observable coinStream = []

  @action
  getWallets() {
    return WalletApi.getWallets().then(res => {
      if (res.status === 1) this.wallets = res.data
    })
  }

  @action
  getCurrentWallet(productId) {
    if (this.wallets.length > 0) {
      this.currentWallet = this.wallets.find(wallet => wallet.productId === productId) || {}
      return Promise.resolve(this.currentWallet)
    }
    return this.getWallets().then(() => {
      this.currentWallet = this.wallets.find(wallet => wallet.productId === productId) || {}
      return this.currentWallet
    })
  }

  @action
  getUsdtStream(options) {
    return WalletApi.getUsdtStream(options).then(res => {
      if (res.status === 1) this.usdtStream = res.data
    })
  }

  @action
  getCoinStream(options) {
    return WalletApi.getCoinStream(options).then(res => {
      if (res.status === 1) this.coinStream = res.data
    })
  }

  @action
  withdrawInit(options){
    return WalletApi.getCoinStream(options).then(res => {
      if (res.status === 1) this.coinStream = res.data
      return res
    })
  }
}

export default WalletStore
