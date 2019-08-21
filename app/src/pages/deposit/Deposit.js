import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Drawer, SegmentedControl, Button } from 'antd-mobile'
import Header from '../../components/common/Header'
import DepositBuy from '../../components/partial/DepositBuy'
import DepositUnlock from '../../components/partial/DepositUnlock'
import leftDrawerIcon from '../../assets/images/left-drawer.png'
import './Deposit.scss'

@inject('personStore')
@inject('productStore')
@observer
class Deposit extends Component {
  state = {
    showDrawer: false,
    ensureToUnlock: false,
    selectTabIndex: 1
  }

  componentDidMount() {
    const { productStore, personStore } = this.props
    personStore.getUserInfo()
    personStore.getSpecial()
    productStore.getProducts().then(productId => {
      if (productId) {
        productStore.getProductDetail(productId)
      }
    })
  }

  onClose = () => {
    this.setState({ ensureToPay: false, ensureToUnlock: false })
  }

  onDepositBuy = () => {
    this.setState({ ensureToPay: true })
  }

  onUnlockLimit = () => {
    this.setState({ ensureToUnlock: true })
  }

  onSegmentedChange = e => {
    const { selectedSegmentIndex } = e.nativeEvent
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

  selectProduct = id => {
    const { productStore } = this.props
    this.setState({ showDrawer: false }, () => {
      productStore.changeProduct(id, true)
    })
  }
  render() {
    const { productStore } = this.props
    const { products, currentProduct } = productStore

    const {
      showDrawer,
      ensureToUnlock,
      selectTabIndex,
      ensureToPay
    } = this.state

    const sidebar = (
      <div className="sidebar">
        <header className="sidebar-header">
          <span>选择定存基金</span>
          <img
            src={leftDrawerIcon}
            alt="抽屉"
            onClick={() => this.setState({ showDrawer: false })}
          />
        </header>
        <ul>
          <li>全部</li>
          {products.map(product => (
            <li
              key={product.id}
              className={currentProduct.id === product.id ? 'active' : ''}
              onClick={() => this.selectProduct(product.id)}
            >
              {product.productName}
            </li>
          ))}
        </ul>
      </div>
    )

    return (
      <div id="deposit">
        <Drawer
          className="am-drawer"
          sidebar={sidebar}
          open={showDrawer}
          onOpenChange={() => this.setState({ showDrawer: !showDrawer })}
        >
          <main>
            <Header
              isFixed
              isShadow
              bgWhite
              title="定投XC"
              onHandle={() => this.setState({ showDrawer: true })}
              icon={leftDrawerIcon}
            >
              <span className="drawer-text">xc</span>
            </Header>
            <section className="select-bar">
              <SegmentedControl
                className="segmented-control"
                values={[`定投${currentProduct.productName || ''}`, '特价额度']}
                selectedIndex={selectTabIndex}
                onChange={this.onSegmentedChange}
              />
            </section>
            <DepositBuy
              show={selectTabIndex === 0}
              onDeposit={this.onDepositBuy}
            />
            <DepositUnlock
              show={selectTabIndex === 1}
              onDeposit={this.onUnlockLimit}
            />
          </main>
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
