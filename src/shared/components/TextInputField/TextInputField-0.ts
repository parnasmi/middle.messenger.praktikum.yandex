import {Block} from "../../utils";
import {TextInput} from "../TextInput";
import {FormFieldErrorMsg} from "../FormFieldErrorMsg";
import {TextInputFieldTypes} from "./textInputField.types";

export class TextInputField extends Block {
	constructor(props: TextInputFieldTypes) {
		const textInput = new TextInput({ ...props.textInput });
		const errorMessage = new FormFieldErrorMsg({ ...props.errorMessage });

		super("div", {
			attributes: {
				...(props.selfProps?.attributes || {}),
				class: `sign-form__field ${props.selfProps?.attributes?.class}`
			},
			children: [textInput, errorMessage],
		});
	}

	componentDidUpdate(oldProps: any, newProps: any): boolean {
		this.children![0].setProps(newProps.textInput);
		this.children![1].setProps(newProps.errorMessage);
		return super.componentDidUpdate(oldProps, newProps);
	}

	public validateInput(isValid: boolean) {
		if (isValid) {
			this.componentDidUpdate(this.props, {
				...this.props,
				errorMessage: { ...this.props.errorMessage, isShown: false },
			});
			return;
		}
		this.componentDidUpdate(this.props, {
			...this.props,
			errorMessage: { ...this.props.errorMessage, isShown: true },
		});
	}

	protected render(): DocumentFragment {
		return new DocumentFragment();
	}
}
