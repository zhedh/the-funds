import React, {Component} from 'react'
import {withRouter} from 'react-router'
import './Footer.scss'
import FindSvg from '../../assets/svg/find.svg'
import FindPreSvg from '../../assets/svg/find-pre.svg'
import DepositSvg from '../../assets/svg/deposit.svg'
import DepositPreSvg from '../../assets/svg/deposit-pre.svg'
import WalletSvg from '../../assets/svg/wallet.svg'
import WalletPreSvg from '../../assets/svg/wallet-pre.svg'

const FOOTER_PATHS = ['/home', '/deposit', 'wallet'];

const TABS = [
    {
        name: 'home',
        label: '首页',
        image: FindSvg,
        imagePre: FindPreSvg,
    }, {
        name: 'deposit',
        label: '定存',
        image: DepositSvg,
        imagePre: DepositPreSvg,
    }, {
        name: 'wallet',
        label: '钱包',
        image: WalletSvg,
        imagePre: WalletPreSvg,
    },
];

class Footer extends Component {
    state = {
        tabName: 'home'
    };

    handleChange = (tabName) => {
        console.log(tabName);
        this.setState({tabName})
    };

    render() {
        const {location} = this.props
        const {tabName} = this.state;
        const show = FOOTER_PATHS.includes(location.pathname);
        return (
            show ? <footer>
                <ul>
                    {TABS.map(tab =>
                        <li key={tab.name}
                            className={tab.name === tabName ? 'active' : ''}
                            onClick={() => this.handleChange(tab.name)}>
                            <img src={tab.name === tabName ? tab.imagePre : tab.image}
                                 alt={tab.label}/>
                            {tab.label}
                        </li>)
                    }
                </ul>
            </footer> : ''
        );
    }
}

export default withRouter(Footer);