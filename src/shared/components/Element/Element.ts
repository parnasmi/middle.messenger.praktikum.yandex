import { Block, compile } from "../../utils";
import tmpl from "./element.tmpl.hbs";
import { IElement } from "./element.types";
export class Element extends Block {
	constructor({ tagName, ...restProps }: IElement) {
		super(tagName, {
			...restProps,
			attributes: {
				...restProps.attributes,
				class: restProps.attributes?.class,
			},
		});
	}

	render() {
		return compile(tmpl, this.props);
	}
}
