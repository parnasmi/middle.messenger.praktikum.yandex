import {Block, mergeClassnames} from "../../utils";
import {TextInput} from "../TextInput";
import {FormFieldErrorMsg} from "../FormFieldErrorMsg";
import {EditInputFieldTypes} from "./editInputField.types";
import tmpl from './editInputField.tmpl.hbs'

export class EditInputField extends Block {
	constructor(props: EditInputFieldTypes) {
		const textInput = new TextInput({ ...props.textInput });
		const errorMessage = new FormFieldErrorMsg({ ...props.errorMessage });
		super("li", {
			attributes: {
				...(props.selfProps?.attributes || {}),
				class: `profile__data-item ${mergeClassnames(props.selfProps?.attributes?.class)}`
			},
			children: {textInput, errorMessage},
			label: props.label
		});
	}

	componentDidUpdate(oldProps: any, newProps: any): boolean {
		(this.children.textInput as Block).setProps(newProps.textInput);
		(this.children.errorMessage as Block).setProps(newProps.errorMessage);
		return super.componentDidUpdate(oldProps, newProps);
	}

	public validateInput(isValid: boolean) {
		(this.children.errorMessage as Block).setProps({ isShown: !isValid })
	}

	render(): DocumentFragment {
		return this.compile(tmpl, this.props)
	}
}
