import {Block} from "../../shared/utils";
import tmpl from './navigation.tmpl.hbs'
import '../../scss/styles.scss'
import '../../scss/pages/service-page.scss'
export class NavigationPage extends Block {
	constructor() {
	document.body.className = 'h-screen not-auth w-screen';
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
