import React, {Component} from 'react'
import {inject, observer} from "mobx-react"
import {formatCoinPrice} from "../../utils/format"
import Header from "../../components/common/Header"
import scanIcon from '../../assets/images/scan.svg'
import recordIcon from '../../assets/images/record.png'
import {getImagePath} from "../../utils/file";
import './Withdraw.scss'

@inject('walletStore')
@observer
class Withdraw extends Component {
  state = {
    code: '',
    amount: null,
    walletTo: '',
    type: '',
  }

  componentDidMount() {
    const {match, walletStore} = this.props
    const {type} = match.params
    this.setState({type})
    walletStore.withdrawInit({type})
  }

  onInputChange = (e, key) => {
    const {value} = e.target
    this.setState({[key]: value})
  }

  onChangeFile = (e) => {
    const {files} = e.target
    if (!files) return

    getImagePath(files[0], (url) => {
      window.qrcode.decode(url);
      window.qrcode.callback = (msg) => {
        console.log(msg)
        this.setState({walletTo: msg})
      }
    })
  }

  render() {
    const {history, walletStore} = this.props
    const {code, amount, walletTo,type} = this.state
    const {withdrawInfo} = walletStore

    return (
      <div id="withdraw">
        <Header title={withdrawInfo.type + '提币'} bgWhite isFixed isShadow>
          <img
            className="record-icon"
            src={recordIcon}
            alt="提现记录"
            onClick={() => history.push('/wallet/withdraw-record')}
          />
        </Header>
        <section className="section-form">
          <div className="row">
            <span className="balance">
              可用：{formatCoinPrice(withdrawInfo.balance)}
            </span>
          </div>
          <div className="row">
            <label>提币地址</label>
            <div className="input-box">
              <input
                type="text"
                placeholder="输入或长按粘贴地址"
                value={walletTo}
                onChange={(e) => this.onInputChange(e, 'walletTo')}
              />
              <div className="file-btn">
                <input type="file" onChange={this.onChangeFile}/>
                <button>
                  <img src={scanIcon} alt="扫码"/>
                </button>
              </div>
            </div>
          </div>
          <div className="row">
            <label>数量（{type}）</label>
            <div className="input-box">
              <input
                type="text"
                placeholder="最小提币量0.01"
                value={amount}
                onChange={(e) => this.onInputChange(e, 'amount')}
              />
            </div>
            <small>手续费：{withdrawInfo.serviceCharge}{type}</small>
          </div>
          <div className="row">
            <label>邮箱验证码</label>
            <div className="input-box">
              <input
                type="text"
                placeholder="请输入手机或邮箱验证码"
                value={code}
                onChange={(e) => this.onInputChange(e, 'code')}
              />
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
          <p> • 当前，每人每日最高可提现 500000 XC，单笔转出限额为0.01 -200000 ZBX，手续费 0.001 ZBX </p>
          <p> • 为了保障资金安全，我们会对提币进行人工审核，请耐心等待。</p>
        </section>
      </div>
    );
  }
}

export default Withdraw;
