import React, {Component} from 'react';
import Loadable from 'react-loadable';

class Loading extends Component {
  render() {
    return <div>loading...</div>;
  }
}

const Home = Loadable({
  loader: () => import("./pages/home/Index"),
  loading: Loading
});
const InviterFriend = Loadable({
  loader: () => import('./pages/home/InviterFriend'),
  loading: Loading
});
const Generalize = Loadable({
  loader: () => import('./pages/home/Generalize'),
  loading: Loading
});
const GeneralizeDetail = Loadable({
  loader: () => import('./pages/home/GeneralizeDetail'),
  loading: Loading
});
const Bargain = Loadable({
  loader: () => import('./pages/home/Bargain'),
  loading: Loading
});
const BargainRecord = Loadable({
  loader: () => import('./pages/home/BargainRecord'),
  loading: Loading
});
const Rule = Loadable({
  loader: () => import('./pages/home/Rule'),
  loading: Loading
});
const DepositHistory = Loadable({
  loader: () => import('./pages/home/DepositHistory'),
  loading: Loading
});

const Wallet = Loadable({
  loader: () => import("./pages/wallet/Index"),
  loading: Loading
});

const Login = Loadable({
  loader: () => import('./pages/login/Login'),
  loading: Loading
});
const Register = Loadable({
  loader: () => import('./pages/login/Register'),
  loading: Loading
});
const ForgetPwd = Loadable({
  loader: () => import('./pages/login/ForgetPwd'),
  loading: Loading
});
const UserCenter = Loadable({
  loader: () => import('./pages/user/UserCenter'),
  loading: Loading
});
const Notices = Loadable({
  loader: () => import('./pages/notice/Notices'),
  loading: Loading
});
const AccountSafe = Loadable({
  loader: () => import('./pages/user/AccountSafe'),
  loading: Loading
});
const VerifiedCountry = Loadable({
  loader: () => import('./pages/user/VerifiedCountry'),
  loading: Loading
});
const VerifiedIdentity = Loadable({
  loader: () => import('./pages/user/VerifiedIdentity'),
  loading: Loading
});
const VerifiedUpload = Loadable({
  loader: () => import('./pages/user/VerifiedUpload'),
  loading: Loading
});

export default [
  // 主页
  {path: '/', name: 'Home', component: Home},
  {path: '/home', name: 'Home', component: Home},
  {path: '/home/inviter-friend', name: 'InviterFriend', component: InviterFriend},
  {path: '/home/generalize', name: 'Generalize', component: Generalize},
  {path: '/home/generalize/:id', name: 'GeneralizeDetail', component: GeneralizeDetail},
  {path: '/home/bargain', name: 'Bargain', component: Bargain},
  {path: '/home/bargain/record', name: 'BargainRecord', component: BargainRecord},
  {path: '/home/rule', name: 'Rule', component: Rule},
  {path: '/home/deposit-history', name: 'DepositHistory', component: DepositHistory},

  // 钱包
  {path: '/wallet', name: 'Wallet', component: Wallet},

  // 登陆注册
  {path: '/login', name: 'Login', component: Login},
  {path: '/register/:state', name: 'Register', component: Register},
  {path: '/forget-password/:state', name: 'ForgetPwd', component: ForgetPwd},

  // 个人中心
  {path: '/user-center', name: 'UserCenter', component: UserCenter},
  {path: '/notices', name: 'Notices', component: Notices},
  {path: '/account', name: 'AccountSafe', component: AccountSafe},

  // 实名认证
  {path: '/verified-country', name: 'VerifiedCountry', component: VerifiedCountry},
  {path: '/verified-identity/:state', name: 'VerifiedIdentity', component: VerifiedIdentity},
  {path: '/verified-upload', name: 'VerifiedUpload', component: VerifiedUpload}
]
