import Home from './pages/home/Index'
import InviterFriend from './pages/home/InviterFriend'
import Login from './pages/login/Login'
import Register from './pages/login/Register'

export default [
    {path: '/', name: 'Home', component: Home},
    {path: '/home', name: 'Home', component: Home},
    {path: '/home/inviter-friend', name: 'InviterFriend', component: InviterFriend},
    {path: '/login', name: 'Login', component: Login},
    {path: '/register', name: 'Register', component: Register},
]