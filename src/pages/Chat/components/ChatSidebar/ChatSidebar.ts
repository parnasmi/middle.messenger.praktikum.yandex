import {Block} from "../../../../shared/utils";
import tmpl from './chatSidebar.tmpl.hbs';
import {ChatSearch} from "../ChatSearch";
import {ChatItemTypes} from "../ChatItem/chatItemTypes.types";
import {ChatItem} from "../ChatItem/ChatItem";
type ChatSidebarType = {
  chatItems: ChatItemTypes[]
}

export class ChatSidebar extends Block {
	constructor({ chatItems }:ChatSidebarType) {
		const searchInput = new ChatSearch({
			events: {
				blur: (e: Event) =>
					console.log("on blur chatSearch", (e.target as HTMLInputElement).value),
			},
		});
		super("aside", {
			attributes: {
				class: "chat__sidebar flex-shrink-0 full-h"
			},
			searchInput,
		});
    this._generateChatItems(chatItems)
	}

	private _generateChatItems(chatItems: ChatItemTypes[]) {
    this.children.chatList = [...chatItems,...chatItems,...chatItems,...chatItems,...chatItems].map((chat, index) => {
      return new ChatItem(chat);
    })
  }

	render(): DocumentFragment {
		return this.compile(tmpl, this.props);
	}
}
