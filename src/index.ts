import {render} from './shared/utils';
// import {Button} from "./shared/components";
// import HomePage from "./pages/Home";
// import SignInPage from "./pages/SignIn";
// import SignUpPage from "./pages/SignUp";
import ChatPage from "./pages/Chat";
// import Handlebars from 'handlebars/dist/handlebars.runtime';
// import {meta} from './shared/views/partials'
// Handlebars.registerPartial('meta',meta )
// const button = new Button({text: 'Click me', events: {
//   click: () => {
//     console.log('clicked')
//   }
//   }});
render('#root', new ChatPage())

// setTimeout(() => {
//   button.setProps({text: 'Click me, please'})
// },2000)