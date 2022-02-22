import tmpl from "./formContainer.tmpl.hbs";
import { Form } from "../Form";
import { TextInputFieldTypes } from "../TextInputField/textInputField.types";
import { Block } from "../../utils";
import { TextInputField } from "../TextInputField";
import { Button } from "../Button";
import { Element } from "../Element";
import { Loader } from "../Loader";

export class FormContainer extends Form<any> {
	buttonText: string;

	constructor({ inputs, buttonText, ...restProps }: any) {
		super({ ...restProps });
		this.buttonText = buttonText;
		this._generateInputs(inputs);
		(this.children.spinner as Block).hide();
	}

	protected _onSend() {
		this.props.submitHandler(this.formData, {
			success: (data: any) => {
				console.log("chat successfully created", data);
			},
			error: (error: any) => {
				console.error("chat create error", (error as any).reason);
				(this.children.apiErrorText as Block).setProps({
					text: (error as any).reason,
				});
			},
		});
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
		this.children.apiErrorText = new Element({
			tagName: "div",
			text: "",
			attributes: { class: "error" },
		});
		this.children.spinner = new Loader();
	}

	public showResultInfo(field: string, text: string) {
		this.setProps({ [field]: text });
	}

	protected render(): DocumentFragment {
		return this.compile(tmpl, this.props);
	}
}
