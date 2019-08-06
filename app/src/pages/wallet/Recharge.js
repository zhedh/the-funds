import React, {Component} from 'react';
import Header from '../../components/common/Header';
import QRCode from 'qrcode.react';
import {IoMdArrowDown} from 'react-icons/io';
import {CopyToClipboard} from "react-copy-to-clipboard";
import './Recharge.scss'

class Recharge extends Component {
  render() {
    return (
      <div id="recharge">
        <Header title="USDT充值" isFixed isShadow/>
        <section className="section-main">
          <div className="group qr-code__box">
            <QRCode className="qr-code" size={150} value="9k8NBV7"/>
            <br/>
            <button><IoMdArrowDown/></button>
          </div>
          <div className="group address">
            <p>60ojiwe38kjusienuey9d823bancjajbc75sscw</p>
            <CopyToClipboard
              text={'60ojiwe38kjusienuey9d823bancjajbc75sscw'}
              onCopy={() => console.log('60ojiwe38kjusienuey9d823bancjajbc75sscw')}>
              <span>复制地址</span>
            </CopyToClipboard>
          </div>
        </section>
        <section className="section-aside">
          <p>转入说明</p>
          <p> • 转入是自动的，USDT 转账需要整个 USDT 网络进行确认，您的 USDT 会自动充值到您的账户中。 </p>
          <p> • 此地址是你唯一且独自使用的转入地址，你可以同时进行多次充值。</p>
          <p> • 本地址禁止充值除 USDT 之外的其它资产，任何其它资产充值将不可找回。</p>
        </section>
      </div>
    );
  }
}

export default Recharge;
