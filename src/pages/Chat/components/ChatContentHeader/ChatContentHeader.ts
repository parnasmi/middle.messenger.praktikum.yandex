import { Block } from "../../../../shared/utils";
import tmpl from "./chatContentHeader.tmpl.hbs";
import { connect } from "../../../../shared/store";
import { RESOURCE_URL } from "../../../../../config";

export class ChatContentHeaderComponent extends Block {
	constructor(props: any) {
		super("header", {
			attributes: {
				class: "chat__content-header flex justify-between",
			},
			RESOURCE_URL,
		});
	}

	protected render(): DocumentFragment {
		return this.compile(tmpl, this.props);
	}
}

export const ChatContentHeader = connect(
	ChatContentHeaderComponent,
	(state) => ({ selectedChat: state.selectedChat }),
);
