import {Block, Router} from "../../../../shared/utils";
import tmpl from './chatSidebar.tmpl.hbs';
import {ChatSearch} from "../ChatSearch";
import {ChatItemTypes} from "../ChatItem/chatItemTypes.types";
import {ChatItem} from "../ChatItem/ChatItem";
import {ChatSidebarProfileLink} from "../ChatSidebarProfileLink";
type ChatSidebarType = {
  chatItems: ChatItemTypes[]
}
const router = new Router('#root')
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
    this._generateSidebarElements(chatItems)
	}

	private _generateSidebarElements(chatItems: ChatItemTypes[]) {
    this.children.chatList = [...chatItems,...chatItems,...chatItems,...chatItems,...chatItems].map((chat, index) => {
      return new ChatItem(chat);
    })
		this.children.profileButton = new ChatSidebarProfileLink({
			events: {
				click: (e:Event) => {
					e.preventDefault();
					router.go('/profile')
				}
			}
		});
  }

	render(): DocumentFragment {
		return this.compile(tmpl, this.props);
	}
}
