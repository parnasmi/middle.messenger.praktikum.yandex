import tmpl from "./signForm.tmpl.hbs";
import { Form } from "../Form";
import { TextInputField } from "../TextInputField";
import { TextInputFieldTypes } from "../TextInputField/textInputField.types";
import { Block, Router } from "../../utils";
import { Button } from "../Button";
import { Element, Loader } from "../index";
import { SignUpController, SignUpTypes } from "../../modules/signUp";
import { AuthController } from "../../modules/auth";

const router = new Router("#root");

type SignFormType = {
	inputs: TextInputFieldTypes[];
	attributes: {
		class: string;
	};
	signFormModifierClass: string;
	buttonText: string;
	linkText: string;
	link: string;
	headingText: string;
	pageType: "sign-up" | "sign-in";
};

const signUpController = new SignUpController();
const authController = new AuthController();

export class SignForm extends Form<SignUpTypes> {
	buttonText: string;
	constructor({ inputs, buttonText, ...restProps }: SignFormType) {
		super({ ...restProps });
		this.buttonText = buttonText;
		this._generateInputs(inputs);
		(this.children.spinner as Block).hide();
	}
	_onSend() {
		(this.children.apiErrorText as Block).hide();
		(this.children.spinner as Block).show();

		if (this.props.pageType === "sign-up") {
			signUpController.register(this.formData, {
				success: (data) => {
					console.log("data in callback", data);
				},
				error: (error) => {
					(this.children.apiErrorText as Block).show();
					(this.children.apiErrorText as Block).setProps({
						text: (error as any).reason,
					});
				},
				finally: () => {
					(this.children.spinner as Block).hide();
				},
			});
		}

		if (this.props.pageType === "sign-in") {
			authController.signIn(this.formData, {
				success: (data) => {
					console.log("data in callback", data);
				},
				error: (error) => {
					(this.children.apiErrorText as Block).show();
					(this.children.apiErrorText as Block).setProps({
						text: (error as any).reason,
					});
				},
				finally: () => {
					(this.children.spinner as Block).hide();
				},
			});
		}
	}
	private _generateInputs(inputs: any) {
		this.children.inputs = inputs.map(
			(inputProps: TextInputFieldTypes, index: number): Block => {
				return new TextInputField({
					...inputProps,
					textInput: {
						...inputProps.textInput,
						events: {
							blur: (event: Event) => this._onFocus(index, event),
							focus: (event: Event) => this._onFocus(index, event),
						},
					},
				});
			},
		);

		this.children.button = new Button({
			title: this.buttonText,
			attributes: { class: "block full-w sign-forms__main-btn", type: "submit" },
		});
		this.children.aLink = new Element({
			tagName: "a",
			text: this.props.linkText,
			attributes: { class: "", href: this.props.link },
			events: {
				click: (e: Event) => {
					e.preventDefault();
					router.go(this.props.link);
				},
			},
		});
		this.children.apiErrorText = new Element({
			tagName: "div",
			text: "",
			attributes: { class: "error" },
		});
		this.children.spinner = new Loader();
	}

	componentDidMount() {
		//just to hide loader when logout
		(this.children.spinner as Block).hide();
	}

	render(): DocumentFragment {
		return this.compile(tmpl, this.props);
	}
}
