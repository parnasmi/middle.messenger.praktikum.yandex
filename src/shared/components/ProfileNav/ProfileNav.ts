import { Block } from "../../utils";
import tmpl from "./profileNav.tmpl.hbs";
import { ProfileBackBtn } from "../ProfileBackBtn";
export class ProfileNav extends Block {
	constructor() {
		const backButton = new ProfileBackBtn();
		super("div", {
			attributes: {
				class: "profile__nav flex-shrink-0 flex items-center justify-center",
			},
			backButton,
		});
	}

	protected render(): DocumentFragment {
		return this.compile(tmpl, this.props);
	}
}
