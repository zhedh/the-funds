import React, {Component} from 'react';
import Loadable from 'react-loadable';

class Loading extends Component {
    render() {
        return (
            <div>
                loading...
            </div>
        );
    }
}


const Home = Loadable({
    loader: () => import('./pages/home/Index'),
    loading: Loading
});
const InviterFriend = Loadable({
    loader: () => import('./pages/home/InviterFriend'),
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

export default [
    {path: '/', name: 'Home', component: Home},
    {path: '/home', name: 'Home', component: Home},
    {path: '/home/inviter-friend', name: 'InviterFriend', component: InviterFriend},
    {path: '/login', name: 'Login', component: Login},
    {path: '/register', name: 'Register', component: Register},
]