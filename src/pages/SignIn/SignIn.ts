import {Block} from "../../shared/utils";
import handlebars from 'handlebars/dist/handlebars.runtime';
import tmpl from "./signIn.tmpl.hbs";
import {base} from '../../shared/views/layouts'
const layouts = require('handlebars-layouts');
import '../../scss/styles.scss'
import '../../scss/pages/sign-form.scss'
import {SignForm} from "../../shared/components";

// Register helpers
handlebars.registerHelper(layouts(handlebars));
// Register partials
handlebars.registerPartial('layout', base);

export class SignIn extends Block {
	constructor() {
		document.body.className = 'h-screen not-auth w-screen';
		const signInForm = new SignForm(
			{
				inputs: [
					{
						selfProps: {
							attributes: {
								class: "",
							},
						},
						textInput: {
							attributes: {
								class: "sign-form__input",
								type: "email",
								name: "login",
								placeholder: "Логин",
								required: true,
							}
						},
						errorMessage: {
							errorText: "Неверный логин",
							isShown: false,
							attributes: {
								class: "sign-form__field-error",
							},
						},
					},
					{
						selfProps: {
							attributes: {
								class: "",
							},
						},
						textInput: {
							attributes: {
								class: "sign-form__input",
								type: "password",
								name: "password",
								placeholder: "Пароль",
								required: true,
							}
						},
						errorMessage: {
							errorText: "Неверный пароль",
							isShown: false,
							attributes: {
								class: "sign-form__field-error",
							},
						},
					}],
				attributes: {
					class: "flex flex-col sign-form",
				},
				signFormModifierClass: 'sign-form__fields_login',
				buttonText: 'Авторизоваться',
				linkText: 'Нет аккаунта',
				headingText: 'Вход',
			}
		);

		super("div", {
			attributes: {
				class: 'flex items-center justify-center full-h-w outer-wrapper'
			},
			signInForm
		});
	}

	render() {
		return this.compile(tmpl, this.props);
	}
}
