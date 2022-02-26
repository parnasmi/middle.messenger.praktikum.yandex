import { Block, mergeClassnames } from "../../utils";
import tmpl from "./profileAvatar.tmpl.hbs";
import { ProfileAvatarTypes } from "./ProfileAvatar.types";

const avatarIcon = new URL(
	"../../../assets/img/icon-avatar.svg",
	import.meta.url,
);

export class ProfileAvatar extends Block {
	constructor(props: ProfileAvatarTypes) {
		super("div", {
			...props,
			attributes: {
				...props.attributes,
				class: `profile__avatar  mx-auto flex overflow-hidden items-center justify-center overflow-hidden relative ${mergeClassnames(
					props?.attributes?.class,
				)}`,
				"data-modal-target": "avatar-popup",
			},
			avatarUrl: props.avatarUrl || avatarIcon,
		});
	}


	protected render(): DocumentFragment {
		return this.compile(tmpl, this.props);
	}
}
