import { websocket } from "../../../../shared/utils";
import tmpl from "./chatContent.tmpl.hbs";
import { ChatContentHeader } from "../ChatContentHeader";
import { ChatContentInputs } from "../ChatContentInputs";
import { ChatContentMessages } from "../ChatContentMessages";
import store, { connect } from "../../../../shared/store";
import { ChatController } from "../../../../shared/modules/chat/chat.controller";
import { AddUserPopup, Popup } from "../../../../shared/components";

const chatController = new ChatController();

class ChatContentComponent extends Popup {
	constructor() {
		const chatContentHeader = new ChatContentHeader();
		const chatContentInputs = new ChatContentInputs();
		const chatContentMessages = new ChatContentMessages({});
		const addUserPopup = new AddUserPopup();
		super("div", {
			attributes: {
				class: "chat__content flex-grow-1 flex",
			},
			children: {
				chatContentHeader,
				chatContentInputs,
				chatContentMessages,
				addUserPopup
			},
		});

	}


	componentDidUpdate(oldProps: any, newProps: any): boolean {
		if (
			newProps?.selectedChat &&
			oldProps?.selectedChat?.id !== newProps?.selectedChat?.id
		) {
			//send request to get token and initialize websocket connection
			if (websocket.isOpen() === 1) {
				websocket.closeSocket();
				//clear store messages
				store.set("messages", []);
			}
			chatController.getChatToken(newProps.selectedChat.id);
		}

		return true;
	}


	render(): DocumentFragment {
		return this.compile(tmpl, this.props);
	}
}

export const ChatContent = connect(ChatContentComponent, (state) => ({
	selectedChat: state.selectedChat,
}));
