import {Block, mergeClassnames} from "../../utils";
// import tmpl from './Input.hbs'
import {IInput} from "./textinput.types";
export class TextInput extends Block {
	constructor({ hasDefaultClass = true, ...restProps }: IInput) {
		super("input", {
			...restProps,
			attributes: {
				...restProps.attributes,
				class: `${hasDefaultClass ? 'sign-form__input' : ''} ${mergeClassnames(restProps.attributes?.class)}`,
			},
		});
	}
	// componentDidUpdate(oldProps: any, newProps: any): boolean {
	//   return true;
	// }

	render(): DocumentFragment {
		return new DocumentFragment();
	}
}
