import {Block, compile, mergeClassnames} from "../../utils";
import tmpl from './FormFieldErrorMsg.tmpl.hbs'
import {FormFieldErrorMsgType} from "./formFieldErrorMsg.type";

export class FormFieldErrorMsg extends Block {
	constructor(props: FormFieldErrorMsgType) {
		super("div", {
			...props,
			attributes: {
				...props.attributes,
				class: `error sign-form__field-error ${mergeClassnames(props.attributes?.class)}`,
			},
		});
	}

	componentDidUpdate(oldProps: any, newProps: any): boolean {

    if(newProps.isShown) {
			this.show();
			return true;
		}
		this.hide();
		return super.componentDidUpdate(oldProps, newProps);
	}

	render() {
		if(this.props.isShown) {
			return compile(tmpl, this.props);
		}
		return new DocumentFragment()

	}
}
