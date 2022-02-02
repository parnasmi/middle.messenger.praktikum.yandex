import {Block, compile} from "../../utils";
import {TextInputFieldTypes} from "./textInputField.types";
import tmpl from './textInputField.hbs'
import {TextInput} from "../TextInput";
export class TextInputField extends Block {
	constructor(props: TextInputFieldTypes) {
		super("div", props);
	}

	render() {
    const Input = new TextInput({
			attributes: {
				name: this.props.inputProps.name,
				class: this.props.inputProps.class,
				type: this.props.inputProps.type,
				placeholder: this.props.inputProps.placeholder
			},
			events: {
				change: this.props.inputProps.events.change,
				blur: this.props.inputProps.events.blur,
			}
		})
		return compile(tmpl, {
			textInput: Input,
			showError:this.props.showError,
			label: this.props.inputProps.placeholder
		})

	}
}
