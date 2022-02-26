import { Router } from "../../../../shared/utils";
import tmpl from "./chatSidebar.tmpl.hbs";
import { ChatSearch } from "../ChatSearch";
import { ChatSidebarProfileLink } from "../ChatSidebarProfileLink";
import { Button, Popup } from "../../../../shared/components";
import { ChatCreatePopup } from "../../../../shared/components/ChatCreatePopup";
import { ChatController } from "../../../../shared/modules/chat/chat.controller";
import ChatList from "../ChatList";


const router = new Router("#root");
const chatController = new ChatController();

export class ChatSidebar extends Popup {
	constructor() {
		const searchInput = new ChatSearch({
			events: {
				blur: (e: Event) =>
					console.log("on blur chatSearch", (e.target as HTMLInputElement).value),
			},
		});
		const createChatButton = new Button({
			title: "Создать чат",
			attributes: {
				class: "",
				type: "button",
				"data-modal-target": "chat-create-popup",
			},
		});

		const chatCreatePopup = new ChatCreatePopup();
		const profileButton = new ChatSidebarProfileLink({
			events: {
				click: (e: Event) => {
					e.preventDefault();
					router.go("/settings");
				},
			},
		});
		// console.log('chatCreatePopup',chatCreatePopup)

		super("aside", {
			attributes: {
				class: "chat__sidebar flex-shrink-0 full-h",
			},
			children: {
				searchInput,
				createChatButton,
				chatCreatePopup,
				profileButton,
				chatList: new ChatList()
			},
		});

		chatController.getChatList();
	}


	render(): DocumentFragment {
		return this.compile(tmpl, this.props);
	}
}
