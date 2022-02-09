import { Block } from "../../shared/utils";
import tmpl from "./404.tmpl.hbs";
import "../../scss/styles.scss";
import "../../scss/pages/service-page.scss";

export class NotFound extends Block {
	constructor() {
		document.body.className = "h-screen not-auth w-screen";
		super("main", {
			attributes: {
				class: "flex items-center justify-center full-h-w",
			},
		});
	}

	render(): DocumentFragment {
		return this.compile(tmpl, this.props);
	}
}
