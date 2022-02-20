import {Block, Router} from "../../utils";
const router = new Router('#');
import tmpl from './profileBackBtn.tmpl.hbs'
export class ProfileBackBtn extends Block {
	constructor() {
		super("a", {
			attributes: {
				class: "profile__nav-btn",
        href: '#'
			},
			events: {
				click: (e: Event) => {
					e.preventDefault();
					router.back();
				},
			},
		});
	}

	protected render(): DocumentFragment {
		return this.compile(tmpl, this.props)
	}
}
