import {Block} from "../../utils";
import tmpl from './profileAvatar.tmpl.hbs'
const avatarIcon = new URL('../../../assets/img/icon-avatar.svg', import.meta.url);

export class ProfileAvatar extends Block {
	constructor() {
		super("div", {
			attributes: {
				class: 'profile__avatar mx-auto flex items-center justify-center'
			},
			avatarIcon
		});
	}

	protected render(): DocumentFragment {
		return this.compile(tmpl, this.props)
	}
}
