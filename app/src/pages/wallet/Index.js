import React, {Component} from "react";
import {Link} from "react-router-dom";
import Header from "../../components/common/Header";
import walletToLoginImg from '../../assets/images/wallet-to-login.png';
import walletZbsImg from '../../assets/images/wallet-zbs.png';
import walletUsdtImg from '../../assets/images/wallet-usdt.png';

import './Index.scss';

class CardList extends Component {
  render() {
    const {cards} = this.props;
    return <ul>
      {cards.map(card =>
        <li>

        </li>
      )}
    </ul>
  }
}

function ToLogin() {
  return (
    <div className="login-warp">
      <main>
        <img src={walletToLoginImg} alt="去登陆"/>
        <p>您未登录，不能进行操作</p>
      </main>
      <aside>
        <Link to="/login">去登陆</Link>
      </aside>
    </div>
  );
}

class Index extends Component {
  render() {
    const isLogin = false;

    return (
      <div id="wallet">
        <Header title="钱包" isFixed isShadow/>
        {isLogin ? <CardList/> : <ToLogin/>}
      </div>
    );
  }
}

export default Index;
