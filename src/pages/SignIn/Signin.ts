import {Block, compile} from "../../shared/utils";
import handlebars from 'handlebars/dist/handlebars.runtime';
import {Button, TextInputField} from "../../shared/components";
import tmpl from "./signIn.hbs";
import {base} from '../../shared/views/layouts'
const layouts = require('handlebars-layouts');
import '../../scss/styles.scss'
import '../../scss/pages/sign-form.scss'

// Register helpers
handlebars.registerHelper(layouts(handlebars));
// Register partials
handlebars.registerPartial('layout', base);

export class SignIn extends Block {
  constructor() {
    super('main');
    window.document.title = 'Sign in'
    document.body.className = 'not-auth h-screen w-screen'
    document.addEventListener('DOMContentLoaded', function (){

    document.querySelector('main')!.className = 'flex items-center justify-center full-h-w'
    })
  }

  render() {
    const signInButton = new Button({
      title: 'Авторизоваться',
      events: {
        click: () => console.log('Clicked')
      },
      attributes: {
        class: 'sign-forms__main-btn btn block full-w',
        type: 'button'
      },
    })
    const signInLoginField = new TextInputField({
      attributes: {class: 'sign-form__field'},
      showError: false,
      inputProps: {
        class: 'sign-form__input',
        type: 'text',
        name: "login",
        placeholder: "Логин",
        events: {
          change:() => console.log('on change login'),
          blur:() => console.log('on blur login'),
        }
      },
    })
    const signInPasswordField = new TextInputField({
      attributes: {class: 'sign-form__field'},
      showError: true,
      inputProps: {
        class: 'sign-form__input',
        type: 'password',
        name: "password",
        placeholder: "Пароль",
        events: {
          change:() => console.log('on change password'),
          blur:() => console.log('on blur password'),
        }
      },
    })


    return compile(tmpl, {
      title: 'Sign In',
      signInPasswordField,
      signInLoginField,
      signInButton,
      },
    )
  }
}
