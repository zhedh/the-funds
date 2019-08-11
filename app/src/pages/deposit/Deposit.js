import React, { Component } from 'react'
import { Drawer, SegmentedControl, Button } from 'antd-mobile'
import Header from '../../components/common/Header'
import DepositBuy from '../../components/partial/DepositBuy'
import UnlockLimit from '../../components/partial/UnlockLimit'
import './Deposit.scss'

const fundList = ['ZBX', 'ZBS']
class Deposit extends Component {
  state = {
    openIt: false,
    activeFund: 0,
    ensureToPay: false,
    ensureToUnlock: false,
    selectCardIndex: null,
    selectTabIndex: 1
  }

  openDrawer = (...args) => {
    this.setState({ openIt: !this.state.openIt })
  }

  onClose = () => {
    this.setState({ ensureToPay: false, ensureToUnlock: false })
  }

  onSelectCard = key => {
    this.setState({ selectCardIndex: key })
  }

  onDepositBuy = () => {
    this.setState({ ensureToPay: true })
  }
  onUnlockLimit = () => {
    this.setState({ ensureToUnlock: true })
  }
  onSegmentedChange = e => {
    const {
      nativeEvent: { selectedSegmentIndex }
    } = e
    console.log(selectedSegmentIndex)
    this.setState({ selectTabIndex: selectedSegmentIndex })
  }
  onDeposit = () => {
    const { selectTabIndex } = this.state
    if (selectTabIndex === 0) {
      this.onDepositBuy()
    } else {
      this.onUnlockLimit()
    }
  }
  render() {
    const {
      openIt,
      activeFund,
      ensureToPay,
      ensureToUnlock,
      selectCardIndex,
      selectTabIndex
    } = this.state
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
          contentStyle={{ paddingTop: 44 }}
          sidebar={sidebar}
          open={openIt}
          onOpenChange={this.openDrawer}
        >
          <section className="content-top select-bar">
            <SegmentedControl
              className="segmented-control"
              values={['定存投资', '解锁额度']}
              onChange={this.onSegmentedChange}
            />
          </section>
          {selectTabIndex === 0 && (
            <DepositBuy
              key={selectTabIndex}
              selectCardIndex={selectCardIndex}
              onSelectCard={this.onSelectCard}
            />
          )}
          {selectTabIndex === 1 && <UnlockLimit key={selectTabIndex} />}

          <Button
            activeClassName="btn-common__active"
            className="btn-common handle-btn"
            onClick={this.onDeposit}
          >
            {selectTabIndex === 0 ? '定存' : '解锁'}
          </Button>
        </Drawer>

        {ensureToPay && (
          <div className="ensure-pay__wrapper">
            <div className="ensure-pay__content">
              <Header
                isShadow
                title="确认支付"
                icon={require('../../assets/images/close.png')}
                onHandle={this.onClose}
              />

              <div className="pay-content">
                <p>
                  <span>
                    定存投资（ZBX） <br />
                    <small>手续费0.3%</small>
                  </span>
                  <span>
                    59.13 <br />
                    <small>0.15</small>
                  </span>
                </p>
                <p>
                  <span>可用</span>
                  <span>12000.00</span>
                </p>
              </div>
              <Button
                activeClassName="btn-common__active"
                className="btn-common modal-btn"
                onClick={this.onClose}
              >
                确认定存
              </Button>
            </div>
          </div>
        )}

        {ensureToUnlock && (
          <div className="ensure-pay__wrapper">
            <div className="ensure-pay__content">
              <Header
                isShadow
                title="确认支付"
                icon={require('../../assets/images/close.png')}
                onHandle={this.onClose}
              />

              <div className="pay-content">
                <p>
                  <span>
                    支付总额（USDT） <br />
                    <small> 交易额</small>
                    <br />
                    <small> 手续费0.3%</small>
                  </span>
                  <span>
                    59.13 <br />
                    <small>58.98</small>
                    <br />
                    <small>0.15</small>
                  </span>
                </p>
                <p>
                  <span>可用</span>
                  <span>12000.00</span>
                </p>

                <small className="tips">*扣款时依照最新的兑价为准</small>
              </div>
              <Button
                activeClassName="btn-common__active"
                className="btn-common modal-btn"
                onClick={this.onClose}
              >
                确认买入
              </Button>
            </div>
          </div>
        )}
      </div>
    )
  }
}
export default Deposit
