import {observable, action, computed} from 'mobx'

class WalletStore {
  @observable wallet = {}

  @action
  getWallet() {

  }
}

export default WalletStore
