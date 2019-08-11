import UserStore from './user'
import PersonStore from "./person";
import WalletStore from "./wallet";
import AuthStore from "./auth";

class Stores {
  constructor() {
    this.userStore = new UserStore()
    this.personStore = new PersonStore()
    this.walletStore = new WalletStore()
    this.authStore = new AuthStore()
  }
}

export default new Stores()
