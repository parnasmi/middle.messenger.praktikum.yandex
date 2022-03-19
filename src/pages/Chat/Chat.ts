import { Block } from "../../shared/utils";
import tmpl from "./chat.tmpl.hbs";
import "../../scss/styles.scss";
import "../../scss/pages/chat/index.scss";
import { ChatContent, ChatSidebar, ChatPending } from "./components";
import { OverlayPopup } from "../../shared/components/OverlayPopup";
import store, { connect } from "../../shared/store";
import { ChatItemType } from "./components/ChatItem/chatItemTypes.types";

class Chat extends Block {
	constructor() {
		const chatSidebar = new ChatSidebar();
		const chatContent = new ChatContent({});
		const chatPending = new ChatPending();
		const overlayPopup = new OverlayPopup();
		super("main", {
			attributes: {
				class: "full-h-w chat-page",
			},
			children: {
				chatSidebar,
				chatContent,
				overlayPopup,
				chatPending,
			},
		});
		document.title = "Chat";
		if(!('hashChangeEventSet' in window)) {
			window.addEventListener("hashchange", () => {
				const chatId = window.location.hash.slice(1);
				const selectedChat = store
					.getState()
					.chats.find((chat: ChatItemType) => chat.id === +chatId);
				store.set("selectedChat", selectedChat);
			});
		}

		(window as any).hashChangeEventSet = true;

	}

	protected render(): DocumentFragment {
		return this.compile(tmpl, this.props);
	}
}

export default connect(Chat, (state) => ({
	selectedChat: state?.selectedChat,
}));
