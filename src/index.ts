import {render} from './shared/utils';
// import {Button} from "./shared/components";
// import HomePage from "./pages/Home";
// import SignInPage from "./pages/SignIn";
// import SignUpPage from "./pages/SignUp";
// import ChatPage from "./pages/Chat";
// import ProfilePage from './pages/Profile'
// import ProfileEdit from './pages/ProfileEdit'
// import ProfilePasswordChange from './pages/ProfilePasswordChange'
// import NotFound from './pages/404'
import ServerErrorPage from './pages/500'

render('#root', new ServerErrorPage())


// import Handlebars from 'handlebars/dist/handlebars.runtime';
// import {meta} from './shared/views/partials'
// Handlebars.registerPartial('meta',meta )
// const button = new Button({text: 'Click me', events: {
//   click: () => {
//     console.log('clicked')
//   }
//   }});

