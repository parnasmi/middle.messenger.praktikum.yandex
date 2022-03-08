import { Block, Router } from "../../shared/utils";
import tmpl from "./404.tmpl.hbs";
import "../../scss/styles.scss";
import "../../scss/pages/service-page.scss";

export class NotFound extends Block<{}> {
	constructor() {
		super("main", {
			attributes: {
				class: "flex items-center justify-center full-h-w not-auth",
			},
			events: {
				click: (e: Event) => {
					const target = e.target;

					if (target && (target as HTMLElement).getAttribute("href")) {
						e.preventDefault();
						e.stopPropagation();

						const link = (target as HTMLElement).getAttribute("href");
						if (link) {
							new Router("#root").go(link);
						}
					}
				},
			},
		});
	}

	render(): DocumentFragment {
		return this.compile(tmpl, this.props);
	}
}
