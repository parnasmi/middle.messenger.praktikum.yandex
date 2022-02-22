import { Router } from "../../../../shared/utils";
import tmpl from "./chatSidebar.tmpl.hbs";
import { ChatSearch } from "../ChatSearch";
import { ChatItemTypes } from "../ChatItem/chatItemTypes.types";
import { ChatItem } from "../ChatItem/ChatItem";
import { ChatSidebarProfileLink } from "../ChatSidebarProfileLink";
import { Button, Popup } from "../../../../shared/components";
import { ChatCreatePopup } from "../../../../shared/components/ChatCreatePopup";

type ChatSidebarType = {
	chatItems: ChatItemTypes[];
};
const router = new Router("#root");

export class ChatSidebar extends Popup {
	constructor({ chatItems }: ChatSidebarType) {
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
		// console.log('chatCreatePopup',chatCreatePopup)

		super("aside", {
			attributes: {
				class: "chat__sidebar flex-shrink-0 full-h",
			},
			children: {
				searchInput,
				createChatButton,
				chatCreatePopup,
			},
		});
		this._generateSidebarElements(chatItems);
	}

	private _generateSidebarElements(chatItems: ChatItemTypes[]) {
		this.children.chatList = [
			...chatItems,
			...chatItems,
			...chatItems,
			...chatItems,
			...chatItems,
		].map((chat, index) => {
			return new ChatItem(chat);
		});
		this.children.profileButton = new ChatSidebarProfileLink({
			events: {
				click: (e: Event) => {
					e.preventDefault();
					router.go("/profile");
				},
			},
		});
	}

	componentDidMount(props) {
		super.componentDidMount(props);
		console.log('chat sidebar')
	}

	render(): DocumentFragment {
		return this.compile(tmpl, this.props);
	}
}
