import { Block } from "../../../../shared/utils";
import { ChatItemType } from "./chatItemTypes.types";
import tmpl from "./chatItem.tmpl.hbs";
export class ChatItem extends Block {
	constructor(props: ChatItemType) {
		super("li", {
			attributes: {
				class: "chat__list-item",
			},
			...props,
		});
	}

	render(): DocumentFragment {
		return this.compile(tmpl, this.props);
	}
}
