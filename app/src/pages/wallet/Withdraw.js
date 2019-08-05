import React, {Component} from 'react';
import Header from "../../components/common/Header";
import scanIcon from '../../assets/images/scan.svg';

import './Withdraw.scss';

class Withdraw extends Component {
  render() {
    return (
      <div id="withdraw">
        <Header title="ZBX提币" isFixed isShadow/>
        <section className="section-form">
          <div className="row">
            <span className="balance">可用：128.23</span>
          </div>
          <div className="row">
            <label>提币地址</label>
            <div className="input-box">
              <input type="text" placeholder="输入或长按粘贴地址"/>
              <button>
                <img src={scanIcon} alt="扫码"/>
              </button>
            </div>
          </div>
          <div className="row">
            <label>数量（ZBX）</label>
            <div className="input-box">
              <input type="text" placeholder="最小提币量0.01"/>
            </div>
            <small>手续费：5ZBX</small>
          </div>
          <div className="row">
            <label>邮箱验证码</label>
            <div className="input-box">
              <input type="text" placeholder="请输入邮箱验证码"/>
              <button>获取验证码</button>
            </div>
          </div>
          <div className="row">
            <label>
              <span>到账数量</span>
              <span>- -</span>
            </label>
          </div>
          <div className="btn-box">
            <button>提现</button>
          </div>
        </section>
        <section className="section-aside">
          <p>友情提示</p>
          <p> • 当前，每人每日最高可提现 500000 ZBX，单笔转出限额为0.01 -200000 ZBX，手续费 0.001 ZBX </p>
          <p> • 为了保障资金安全，我们会对提币进行人工审核，请耐心等待。</p>
        </section>
      </div>
    );
  }
}

export default Withdraw;
