import React, {Component} from 'react';
import QRCode from 'qrcode.react'
import {Link} from 'react-router-dom'
import {inject, observer} from "mobx-react";
import {Toast} from "antd-mobile";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {MdContentCopy} from 'react-icons/md';
import Header from '../../components/common/Header'
import './InviterFriend.scss'


@inject('personStore')
@observer
class InviterFriend extends Component {

  componentDidMount() {
    const {personStore} = this.props
    personStore.getUserInfo()
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
    const {history, personStore} = this.props;
    const {userInfo} = personStore
    const {origin} = window.location
    const inviterUrl = origin + '/register?recommendCode=' + userInfo.recommendCode
    console.log(userInfo)
    console.log(inviterUrl)
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
          {userInfo.recommendCode}
          <br/>
          <CopyToClipboard
            text={userInfo.recommendCode}
            onCopy={() => Toast.info('复制成功')}>
            <span>复制邀请码</span>
          </CopyToClipboard>
        </section>
        <section className="section-qr">
          <div className="qr-code__box">
            <QRCode className="qr-code" value={inviterUrl}/>
            <br/>
            <span onClick={this.saveImg}>保存邀请二维码</span>
          </div>
          <p>
            {inviterUrl}
            <CopyToClipboard
              text={inviterUrl}
              onCopy={() => Toast.info('复制成功')}>
              <MdContentCopy className="icon"/>
            </CopyToClipboard>
          </p>
        </section>
        <section className="section-link">
          <a>注册成功</a>
          {/*<Link to="/home/generalize">查看推广</Link>*/}
        </section>
      </div>
    );
  }
}

export default InviterFriend;
