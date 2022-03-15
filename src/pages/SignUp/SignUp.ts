import { Block } from "../../shared/utils";
import tmpl from "./signUp.tmpl.hbs";

import "../../scss/styles.scss";
import "../../scss/pages/sign-form.scss";
import { SignForm } from "../../shared/components";
import { signUpJsonData } from "./signUpJsonData";


export class SignUp extends Block {
	constructor() {
		document.title = "Sign Up";
		const signInForm = new SignForm({
			inputs: signUpJsonData,
			attributes: {
				class: "flex flex-col sign-form not-auth relative",
			},
			signFormModifierClass: "sign-form__fields_signup",
			buttonText: "Зарегистрироваться",
			headingText: "Регистрация",
			linkText: "Войти",
			link: "/",
			pageType: "sign-up",
		});

		super("div", {
			attributes: {
				class: "flex items-center justify-center full-h-w",
			},
			signInForm,
		});
	}

	render() {
		return this.compile(tmpl, this.props);
	}
}
