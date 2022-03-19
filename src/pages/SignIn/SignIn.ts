import { Block } from "../../shared/utils";
import tmpl from "./signIn.tmpl.hbs";

import "../../scss/styles.scss";
import "../../scss/pages/sign-form.scss";
import { SignForm } from "../../shared/components";
import { signInJsonData } from "./signInJsonData";

export class SignIn extends Block {
	constructor() {
		const signInForm = new SignForm({
			inputs: signInJsonData,
			attributes: {
				class: "flex flex-col sign-form not-auth relative",
			},
			signFormModifierClass: "sign-form__fields_login",
			buttonText: "Авторизоваться",
			linkText: "Нет аккаунта",
			link: "/sign-up",
			headingText: "Вход",
			pageType: "sign-in",
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
