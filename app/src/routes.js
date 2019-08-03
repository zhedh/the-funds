import React, { Component } from 'react'
import Loadable from 'react-loadable'

class Loading extends Component {
  render() {
    return <div>loading...</div>
  }
}

const Home = Loadable({
  loader: () => import('./pages/home/Index'),
  loading: Loading
})
const InviterFriend = Loadable({
  loader: () => import('./pages/home/InviterFriend'),
  loading: Loading
})
const Generalize = Loadable({
  loader: () => import('./pages/home/Generalize'),
  loading: Loading
})
const Login = Loadable({
  loader: () => import('./pages/login/Login'),
  loading: Loading
})
const Register = Loadable({
  loader: () => import('./pages/login/Register'),
  loading: Loading
})
const ForgetPwd = Loadable({
  loader: () => import('./pages/login/ForgetPwd'),
  loading: Loading
})
const UserCenter = Loadable({
  loader: () => import('./pages/user/UserCenter'),
  loading: Loading
})
const Notices = Loadable({
  loader: () => import('./pages/notice/Notices'),
  loading: Loading
})
const AccountSafe = Loadable({
  loader: () => import('./pages/user/AccountSafe'),
  loading: Loading
})

export default [
  { path: '/', name: 'Home', component: Home },
  // 主页
  { path: '/home', name: 'Home', component: Home },
  {
    path: '/home/inviter-friend',
    name: 'InviterFriend',
    component: InviterFriend
  },
  { path: '/home/generalize', name: 'Generalize', component: Generalize },

  // login
  { path: '/login', name: 'Login', component: Login },
  { path: '/register/:state', name: 'Register', component: Register },
  {
    path: '/forget-password/:state',
    name: 'ForgetPwd',
    component: ForgetPwd
  },

  //个人中心
  { path: '/user-center', name: 'UserCenter', component: UserCenter },
  { path: '/notices', name: 'Notices', component: Notices },
  { path: '/account', name: 'AccountSafe', component: AccountSafe }
]
