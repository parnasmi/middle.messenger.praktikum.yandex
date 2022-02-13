import { Block } from "../../shared/utils";
import handlebars from "handlebars/dist/handlebars.runtime";
import tmpl from "./signUp.tmpl.hbs";
import { base } from "../../shared/views/layouts";

const layouts = require("handlebars-layouts");
import "../../scss/styles.scss";
import "../../scss/pages/sign-form.scss";
import { SignForm } from "../../shared/components";
import { signUpJsonData } from "./signUpJsonData";

// Register helpers
handlebars.registerHelper(layouts(handlebars));
// Register partials
handlebars.registerPartial("layout", base);

export class SignUp extends Block {
	constructor() {
		document.title = "Sign Up";
		const signInForm = new SignForm({
			inputs: signUpJsonData,
			attributes: {
				class: "flex flex-col sign-form not-auth",
			},
			signFormModifierClass: "sign-form__fields_signup",
			buttonText: "Зарегистрироваться",
			linkText: "Войти",
			link: "/",
			headingText: "Регистрация",
		});

		super("div", {
			attributes: {
				class: "flex items-center justify-center full-h-w outer-wrapper",
			},
			signInForm,
		});
	}

	render() {
		return this.compile(tmpl, this.props);
	}
}
