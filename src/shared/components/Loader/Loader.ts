import { Block } from "../../utils";
import { Element } from "../Element";
import tmpl from "./loader.tmpl.hbs";
export class Loader extends Block {
	constructor() {
		const spinner = new Element({
			tagName: "div",
			attributes: { class: "loader" },
			text: "",
		});
		super("div", {
			attributes: {
				class: "loader-wrapper full-h-w",
			},
			spinner,
		});
	}

	render(): DocumentFragment {
		return this.compile(tmpl, this.props);
	}
}
