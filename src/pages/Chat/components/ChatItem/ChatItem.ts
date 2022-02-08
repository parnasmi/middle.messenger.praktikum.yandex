import {Block} from "../../../../shared/utils";
import {ChatItemTypes} from "./chatItemTypes.types";
import tmpl from './chatItem.tmpl.hbs';
export class ChatItem extends Block {
	constructor(props: ChatItemTypes) {
		super("li", {
			attributes: {
				class: "chat__list-item",
			},
      ...props
		});
	}

	protected render(): DocumentFragment {
		return this.compile(tmpl, this.props)
	}
}
