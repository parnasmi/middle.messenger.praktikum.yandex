import { Block, mergeClassnames } from "../../utils";
import { TextInput } from "../TextInput";
import { FormFieldErrorMsg } from "../FormFieldErrorMsg";
import { TextInputFieldTypes } from "./textInputField.types";
import tmpl from "./textInputField.tmpl.hbs";

export class TextInputField extends Block {
	constructor(props: TextInputFieldTypes) {
		const textInput = new TextInput({ ...props.textInput });
		const errorMessage = new FormFieldErrorMsg({ ...props.errorMessage });

		super("div", {
			attributes: {
				...(props.selfProps?.attributes || {}),
				class: `sign-form__field ${mergeClassnames(
					props.selfProps?.attributes?.class,
				)}`,
			},
			children: { textInput, errorMessage },
		});
	}

	componentDidUpdate(oldProps: any, newProps: any): boolean {
		(this.children.textInput as Block).setProps(newProps.textInput);
		(this.children.errorMessage as Block).setProps(newProps.errorMessage);
		return super.componentDidUpdate(oldProps, newProps);
	}

	public validateInput(isValid: boolean) {
		(this.children.errorMessage as Block).setProps({ isShown: !isValid });
	}

	render(): DocumentFragment {
		return this.compile(tmpl, this.props);
	}
}
