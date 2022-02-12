import {Block} from "../../utils";
import tmpl from './profileNav.tmpl.hbs'
export class ProfileNav extends Block {
	constructor() {
		super("div", {
			attributes: {
				class: 'profile__nav flex-shrink-0 flex items-center justify-center'
			}
		});
	}

	protected render(): DocumentFragment {
		return this.compile(tmpl, this.props)
	}
}
