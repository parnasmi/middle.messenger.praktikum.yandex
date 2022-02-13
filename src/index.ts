import {Router} from './shared/utils';
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";


const router = new Router('#root');
router
  .use('/',SignIn)
  .use('/sign-up',SignUp)
  .start()
