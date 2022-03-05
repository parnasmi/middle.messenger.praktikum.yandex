import { Block } from "../../shared/utils";
import tmpl from "./chat.tmpl.hbs";
import { base } from "../../shared/views/layouts";

const layouts = require("handlebars-layouts");
import "../../scss/styles.scss";
import "../../scss/pages/chat/index.scss";
import { ChatContent, ChatSidebar, ChatPending } from "./components";
import { OverlayPopup } from "../../shared/components/OverlayPopup";
import handlebars from "handlebars/dist/handlebars.runtime";
import store, { connect } from "../../shared/store";
import { ChatItemType } from "./components/ChatItem/chatItemTypes.types";

const searchIcon = new URL("../../assets/img/icon-search.svg", import.meta.url);
// Register helpers
handlebars.registerHelper(layouts(handlebars));
// Register partials
handlebars.registerPartial("layout", base);

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
			searchIcon: searchIcon,
			children: {
				chatSidebar,
				chatContent,
				overlayPopup,
				chatPending,
			},
		});
		document.title = "Chat";
		//Ревьюэру: Где и как отписаться от hashchange не смог решить. Поэтому пошел таким путем. Был рад если
		// если подсказали как отписаться в таких случае. У нас же нет componentDidUnmount.
		if(!('hashChangeEventSet' in window)) {
			console.log('hashchange event set')
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
