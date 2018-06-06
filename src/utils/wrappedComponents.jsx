import Home from '../components/Feed';
import Login from '../components/view-components/ViewLogin';
import Register from '../components/view-components/ViewRegister';
import User from '../components/User';
import Discover from '../components/Discover';
import wrapp from '../controllers/wrappComponent';

const WrappedLogin = wrapp("login", Login);
const WrappedRegister = wrapp("register", Register);
export default {Home, WrappedLogin, WrappedRegister, User, Discover}