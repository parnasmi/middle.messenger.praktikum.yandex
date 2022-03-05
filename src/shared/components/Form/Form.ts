import { Block } from "../../utils";
import { TextInputField } from "../TextInputField";

type ValidationType = {
	name: string;
	value: string;
};

export class Form<T> extends Block {
	protected formData: T;
	private formInputPatterns: Record<string, RegExp>;

	constructor(props: any) {
		super("form", {
			...props,
			events: {
				submit: (event: Event) => {
					event.preventDefault();
					this._handleSubmit();
				},
			},
		});

		this.formData = {} as T;

		this.formInputPatterns = {
			login: /^[a-zA-Z0-9]+$/,
			email: /\S+@\S+\.\S+/,
			password: /^(?=.*\d)[0-9a-zA-Z]{8,}$/,
			oldPassword: /^(?=.*\d)[0-9a-zA-Z]{8,}$/,
			newPassword: /^(?=.*\d)[0-9a-zA-Z]{8,}$/,
			retypePassword: /^(?=.*\d)[0-9a-zA-Z]{8,}$/,
			first_name: /^(?=.{1,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/,
			second_name: /^(?=.{1,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/,
			display_name: /^(?=.{1,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/,
			phone: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im,
			title: /^(?=.{1,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/,
			number: /^\d+$/,
		};
	} //constructor

	protected _handleSubmit() {
		if ("message" in this.formData) {
			this._customValidation();
			this._onSend();
			return;
		}
		const isValid =
			Object.keys(this.formData).length &&
			Object.entries(this.formData).every(([key, value]) =>
				this._validate({
					name: key,
					value,
				}),
			);
		if (isValid) {
			this._onSend();
			return;
		}
		console.error("form is not valid", this.formData);
	}

	protected _customValidation() {}

	//TODO: compare password validation, save formdata prop to field on mount

	protected _onSend() {}

	protected _onFocus(index: number, event: Event) {
		const input = event.target as HTMLInputElement;
		const { name, value } = input;
		//@ts-ignore
		this.formData[name] = value;

		const isValid = this._validate({ name, value });

		if (!isValid) {
			this._showError(index);
			return;
		}
		this._hideError(index);
	}

	protected _showError(index: number) {
		const inputs = this.children.inputs as TextInputField[];
		inputs[index].validateInput(false);
	}

	protected _hideError(index: number) {
		const inputs = this.children.inputs as TextInputField[];
		inputs[index].validateInput(true);
	}

	protected _validate({ name, value }: ValidationType): boolean {
		return this.formInputPatterns[name].test(value);
	}

	protected setFormValues(formData: T) {
		this.formData = formData;
	}
}
