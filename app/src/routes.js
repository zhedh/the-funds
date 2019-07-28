import Home from './pages/home/Index'
import Login from './pages/login/Login'
import Register from './pages/login/Register'

export default [
    {path: '/', name: 'Home', component: Home},
    {path: '/login', name: 'Login', component: Login},
    {path: '/register', name: 'Register', component: Register},
]