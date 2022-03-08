import { Block } from "../../../../shared/utils";
import tmpl from "./chatContentMessages.tmpl.hbs";
import { ChatMessageType } from "../ChatMessage/ChatMessage.types";
import { ChatMessage } from "../ChatMessage";
import store, { connect } from "../../../../shared/store";

class ChatContentMessagesComponent extends Block {
	private readonly currentUserId: number;
	constructor() {
		super("section", {
			attributes: {
				class: "chat__content-messages flex-grow-1",
			},
		});
		this.currentUserId = store.getState().user.id;
	}

	private _generateMessages(messagesJson: ChatMessageType[]) {
		this.children.messagesLogs = messagesJson.map((message): Block => {
			return new ChatMessage({ ...message, currentUserId: this.currentUserId });
		});
	}

	componentDidUpdate(_: any, newProps: any): boolean {
		this._generateMessages(newProps.messages);
		return true;
	}

	protected render(): DocumentFragment {
		return this.compile(tmpl, this.props);
	}
}

export const ChatContentMessages = connect(
	ChatContentMessagesComponent,
	(state) => ({ messages: state.messages }),
);
