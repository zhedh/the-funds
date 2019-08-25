import React, { Component } from 'react'
import { withRouter } from 'react-router'
import './Footer.scss'
import { HOME } from '../../assets/static'
import FindSvg from '../../assets/images/find.svg'
import DepositSvg from '../../assets/images/deposit.svg'
import WalletSvg from '../../assets/images/wallet.svg'

// import FindPreSvg from '../../assets/images/find-pre.svg'
// import DepositPreSvg from '../../assets/images/deposit-pre.svg'
// import WalletPreSvg from '../../assets/images/wallet-pre.svg'

const TABS = [
  {
    pathname: '/home',
    label: '首页',
    image: FindSvg,
    // imagePre: FindPreSvg
    imagePre: HOME.ICON_HOME
  },
  {
    pathname: '/deposit',
    label: '定投',
    image: DepositSvg,
    // imagePre: DepositPreSvg
    imagePre: HOME.ICON_DEPOSIT
  },
  {
    pathname: '/wallet',
    label: '钱包',
    image: WalletSvg,
    // imagePre: WalletPreSvg
    imagePre: HOME.ICON_WALLET
  }
]

const PATHS = [
  '/home',
  '/home/',
  '/deposit',
  '/deposit/',
  '/wallet',
  '/wallet/'
]

class Footer extends Component {
  handleChange = pathname => {
    const { history } = this.props
    history.push(pathname)
  }

  render() {
    const { location } = this.props
    const show = PATHS.includes(location.pathname)

    return show ? (
      <footer>
        <ul>
          {TABS.map(tab => (
            <li
              key={tab.pathname}
              className={tab.pathname === location.pathname ? 'active' : ''}
              onClick={() => this.handleChange(tab.pathname)}
            >
              <img
                src={
                  tab.pathname === location.pathname ? tab.imagePre : tab.image
                }
                alt={tab.label}
              />
              {tab.label}
            </li>
          ))}
        </ul>
      </footer>
    ) : (
      ''
    )
  }
}

export default withRouter(Footer)
