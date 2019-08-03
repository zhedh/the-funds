import React, {Component} from 'react';
import QRCode from 'qrcode.react'
import {Link} from 'react-router-dom'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {MdContentCopy} from 'react-icons/md';

import Header from '../../components/common/Header'
import './InviterFriend.scss'

class InviterFriend extends Component {

  componentDidMount() {
  }

  saveImg = () => {
    const canvas = document.querySelector('.qr-code__box canvas')
    const url = canvas.toDataURL('image/png');
    const event = new MouseEvent('click')
    let a = document.createElement('a')

    a.download = 'inviter-code';
    a.href = url
    a.dispatchEvent(event)
  };

  render() {
    const {history} = this.props;
    return (
      <div id="inviter-friend">
        <Header
          title="邀请好友"
          isShadow={true}
          isFixed={true}
          onHandle={() => {
            history.push('/home');
          }}
        />
        <section className="section-text">
          9k8NBV7
          <br/>
          <CopyToClipboard
            text={'9k8NBV7'}
            onCopy={() => console.log('9k8NBV7')}>
            <span>复制邀请码</span>
          </CopyToClipboard>
        </section>
        <section className="section-qr">
          <div className="qr-code__box">
            <QRCode className="qr-code" value="9k8NBV7"/>
            <br/>
            <span onClick={this.saveImg}>保存邀请二维码</span>
          </div>
          <p>
            https://apitest.mokengsk/
            <MdContentCopy className="icon"/>
          </p>
        </section>
        <section className="section-link">
          <Link to="/home/generalize">查看推广</Link>
        </section>
      </div>
    );
  }
}

export default InviterFriend;
