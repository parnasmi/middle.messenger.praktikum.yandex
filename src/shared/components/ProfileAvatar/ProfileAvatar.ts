import { Block, mergeClassnames } from "../../utils";
import tmpl from "./profileAvatar.tmpl.hbs";
import { ProfileAvatarTypes } from "./ProfileAvatar.types";

const avatarIcon = new URL(
	"../../../assets/img/icon-avatar.svg",
	import.meta.url,
);

export class ProfileAvatar extends Block {
	openModalButtons = document.querySelectorAll("[data-modal-target]");
	closeModalButtons = document.querySelectorAll("[data-close-button]");
	overlay = document.querySelector(".overlay-popup");

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
			// events: {
			// 	click: () => {
			// 		const popup = document.querySelector('.popup');
			// 		const overlay = document.querySelector('.overlay-popup');
			// 		console.log('popup',popup)
			//
			// 		this.openModal(popup as HTMLElement, overlay as HTMLElement)
			// 	},
			// },
			avatarUrl: props.avatarUrl || avatarIcon,
		});
	}


	protected render(): DocumentFragment {
		return this.compile(tmpl, this.props);
	}
}
