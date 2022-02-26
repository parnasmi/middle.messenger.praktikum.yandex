import { Block } from "../../shared/utils";
import tmpl from "./500.tmpl.hbs";
import "../../scss/styles.scss";
import "../../scss/pages/service-page.scss";

export class ServerErrorPage extends Block<{}> {
	constructor() {
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
