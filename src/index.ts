import {render} from './shared/utils';
// import {Button} from "./shared/components";
// import HomePage from "./pages/Home";
import SignInPage from "./pages/SignIn";
// import Handlebars from 'handlebars/dist/handlebars.runtime';
// import {meta} from './shared/views/partials'
// Handlebars.registerPartial('meta',meta )
// const button = new Button({text: 'Click me', events: {
//   click: () => {
//     console.log('clicked')
//   }
//   }});
render('#root', new SignInPage())

// setTimeout(() => {
//   button.setProps({text: 'Click me, please'})
// },2000)
