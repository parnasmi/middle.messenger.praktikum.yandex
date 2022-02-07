import {Block, mergeClassnames} from "../../utils";
import tmpl from './profileAvatar.tmpl.hbs'
import {ProfileAvatarTypes} from "./ProfileAvatar.types";
const avatarIcon = new URL('../../../assets/img/icon-avatar.svg', import.meta.url);

export class ProfileAvatar extends Block {
	constructor(props:ProfileAvatarTypes) {
		super("div", {
			attributes: {
				class: `profile__avatar mx-auto flex items-center justify-center ${mergeClassnames(props?.attributes?.class)}`
			},
			avatarIcon
		});
	}

	protected render(): DocumentFragment {
		return this.compile(tmpl, this.props)
	}
}
