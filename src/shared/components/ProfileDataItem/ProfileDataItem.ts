import { Block } from "../../utils";
import tmpl from "./profileDataItem.tmpl.hbs";
import { ProfileDataItemTypes } from "./ProfileDataItem.types";

export class ProfileDataItem extends Block {
	constructor(props: Omit<ProfileDataItemTypes, "field">) {
		super("li", {
			attributes: {
				class: "profile__data-item",
			},
			...props,
		});
	}

	protected render(): DocumentFragment {
		return this.compile(tmpl, this.props);
	}
}
