import {Block} from "../../shared/utils";
import handlebars from 'handlebars/dist/handlebars.runtime';
import tmpl from "./signUp.tmpl.hbs";
import {base} from '../../shared/views/layouts'
const layouts = require('handlebars-layouts');
import '../../scss/styles.scss'
import '../../scss/pages/sign-form.scss'
import {SignForm} from "../../shared/components";

// Register helpers
handlebars.registerHelper(layouts(handlebars));
// Register partials
handlebars.registerPartial('layout', base);

export class SignUp extends Block {
	constructor() {
		document.title = 'Sign Up'
		document.body.className = 'h-screen not-auth w-screen';
		const signInForm = new SignForm(
			{
				inputs: [
					{
						textInput: {
							attributes: {
								type: "email",
								name: "email",
								placeholder: "Почта",
								required: true,
							}
						},
						errorMessage: {
							errorText: "Такой email существует",
							isShown: false,
						},
					},
					{
						textInput: {
							attributes: {
								type: "text",
								name: "login",
								placeholder: "Логин",
								required: true,
							}
						},
						errorMessage: {
							errorText: "Такой логин существует",
							isShown: false,
						},
					},
					{
						textInput: {
							attributes: {
								type: "text",
								name: "first_name",
								placeholder: "Имя",
								required: true,
							}
						},
						errorMessage: {
							errorText: "Обязателен для ввода",
							isShown: false,
						},
					},
					{
						textInput: {
							attributes: {
								type: "text",
								name: "second_name",
								placeholder: "Фамилия",
								required: true,
							}
						},
						errorMessage: {
							errorText: "Обязателен для ввода",
							isShown: false,
						},
					},
					{
						textInput: {
							attributes: {
								type: "tel",
								name: "phone",
								placeholder: "Телефон",
								required: true,
							}
						},
						errorMessage: {
							errorText: "Обязателен для ввода",
							isShown: false,
						},
					},
					{
						textInput: {
							attributes: {
								type: "password",
								name: "password",
								placeholder: "Пароль",
								required: false,
							}
						},
						errorMessage: {
							errorText: "Обязателен для ввода",
							isShown: false,
						},
					},
					{
						textInput: {
							attributes: {
								type: "password",
								name: "retype-password",
								placeholder: "Пароль еще раз",
								required: false,
							}
						},
						errorMessage: {
							errorText: "Обязателен для ввода",
							isShown: false,
						},
					}
					],
				attributes: {
					class: "flex flex-col sign-form",
				},
				signFormModifierClass: 'sign-form__fields_signup',
				buttonText: 'Зарегистрироваться',
				linkText: 'Войти',
				headingText: 'Регистрация',
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
