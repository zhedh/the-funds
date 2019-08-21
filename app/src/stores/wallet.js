import {observable, action} from 'mobx'
import {WalletApi} from "../api";

class WalletStore {
  @observable wallets = []
  @observable usdtStream = []

  @action
  getWallets() {
    return WalletApi.getWallets().then(res => {
      if (res.status === 1) this.wallets = res.data
    })
  }

  @action
  getUsdtStream(options) {
    return WalletApi.getUsdtStream(options).then(res => {
      if (res.status === 1) this.usdtStream = res.data
    })
  }
}

export default WalletStore
