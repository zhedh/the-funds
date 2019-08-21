import {observable, action} from 'mobx'
import {WalletApi} from "../api";

class WalletStore {
  @observable wallets = []

  @action
  getWallets() {
    return WalletApi.getWallets().then(res => {
      if (res.status === 1) this.wallets = res.data
    })
  }
}

export default WalletStore
