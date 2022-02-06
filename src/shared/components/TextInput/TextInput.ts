import {Block, mergeClassnames} from "../../utils";
// import tmpl from './Input.hbs'
import {IInput} from "./textinput.types";
export class TextInput extends Block {
	constructor(props: IInput) {
		super("input", {
			...props,
			attributes: {
				...props.attributes,
				class: `sign-form__input ${mergeClassnames(props.attributes?.class)}`
			}
		});
	}
	// componentDidUpdate(oldProps: any, newProps: any): boolean {
  //   return true;
	// }

	render(): DocumentFragment {
		return new DocumentFragment();
	}
}
