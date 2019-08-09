import UserStore from './user'
import PersonStore from "./person";

class Stores {
  constructor() {
    this.userStore = new UserStore()
    this.personStore = new PersonStore()
  }
}

export default new Stores()
