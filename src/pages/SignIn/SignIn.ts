import { Block } from "../../shared/utils";
import handlebars from "handlebars/dist/handlebars.runtime";
import tmpl from "./signIn.tmpl.hbs";
import { base } from "../../shared/views/layouts";

const layouts = require("handlebars-layouts");
import "../../scss/styles.scss";
import "../../scss/pages/sign-form.scss";
import { SignForm } from "../../shared/components";
import { signInJsonData } from "./signInJsonData";

// Register helpers
handlebars.registerHelper(layouts(handlebars));
// Register partials
handlebars.registerPartial("layout", base);

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
			pageType: 'sign-in'
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
