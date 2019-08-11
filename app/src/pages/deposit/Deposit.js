import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Drawer, SegmentedControl, Button } from 'antd-mobile'
import Header from '../../components/common/Header'
import './Deposit.scss'

class Deposit extends Component {
  state = {
    openIt: false,
    activeFund: 0,
    ensureToPay: false,
    selectCardIndex: null
  }

  openDrawer = (...args) => {
    this.setState({ openIt: !this.state.openIt })
  }

  onClose = () => {
    this.setState({ ensureToPay: false })
  }

  onSelectCard = key => {
    this.setState({ selectCardIndex: key })
  }

  onDeposit = () => {
    this.setState({ ensureToPay: true })
  }
  render() {
    const { openIt, activeFund, ensureToPay, selectCardIndex } = this.state
    const fundList = ['ZBX', 'ZBS']
    const cardList = [
      {
        price: '100',
        usdt: '121'
      },
      {
        price: '100',
        usdt: '121'
      },
      {
        price: '100',
        usdt: '121'
      },
      {
        price: '100',
        usdt: '121'
      }
    ]
    const sidebar = (
      <div className="drawer-content">
        <div className="drawer-content__header">
          <span>选择定存基金</span>
          <img src={require('../../assets/images/left-drawer.png')} alt="" />
        </div>
        <ul>
          <li>全部</li>
          {fundList.map((fund, key) => (
            <li
              key={key.toString()}
              className={activeFund === key ? 'active' : ''}
              onClick={() => this.setState({ activeFund: key })}
            >
              {fund}
            </li>
          ))}
        </ul>
      </div>
    )
    return (
      <div id="deposit">
        <Header
          isShadow
          bgWhite
          title="定存"
          onHandle={this.openDrawer}
          icon={require('../../assets/images/left-drawer.png')}
        >
          <span className="drawer-text">xc</span>
        </Header>

        <Drawer
          className="drawer-main"
          contentStyle={{ paddingTop: 44, paddingBottom: 140 }}
          sidebar={sidebar}
          open={openIt}
          onOpenChange={this.openDrawer}
        >
          <section className="content-top select-bar">
            <SegmentedControl
              className="segmented-control"
              values={['定存投资', '解锁额度']}
            />
          </section>

          <section className="content-middle">
            <h2 className="tab-first_h2">ZBX/USDT当前价格: 0.5898</h2>
            <p className="tab-first_p">最新兑价（数据来源：影力所）</p>
          </section>

          <section className="content-bottom">
            <ul>
              {cardList.map((i, key) => (
                <li
                  key={key.toString()}
                  className={selectCardIndex === key ? 'active' : ''}
                  onClick={() => this.onSelectCard(key)}
                >
                  {i.price}
                  <small>xc</small>
                  <br />
                  <span>售价 {i.usdt} USDT</span>
                </li>
              ))}
            </ul>

            <div className="fee">
              <p>
                <span>定存送ZBX特价额度</span>
                <span>10</span>
              </p>
              <small>手续费费率：0.03%</small>
            </div>
          </section>

          <section className="content-auth">
            <p>
              *您暂未通过实名认证，无法定存 <Link to="/">去认证</Link>
            </p>
            <p>
              *您暂未设置交易密码，无法定存 <Link to="/">去设置</Link>
            </p>
          </section>

          <Button
            activeClassName="btn-common__active"
            className="btn-common"
            onClick={this.onDeposit}
          >
            定存
          </Button>
        </Drawer>

        {ensureToPay && (
          <div className="ensure-pay">
            <Header
              isShadow
              title="确认支付"
              icon={require('../../assets/images/close.png')}
              onHandle={this.onClose}
            />

<div className='pay-content'>
<p>
  <span>定存投资（ZBX） <br/><small>手续费0.3%</small></span>
  <span>59.13 <br/><small>0.15</small></span>
</p>
<p>
  <span>可用</span>
  <span>12000.00</span>
</p>
</div>
            <Button
              activeClassName="btn-common__active"
              className="btn-common"
              onClick={this.onClose}
            >
              确认定存
            </Button>
          </div>
        )}
      </div>
    )
  }
}
export default Deposit
