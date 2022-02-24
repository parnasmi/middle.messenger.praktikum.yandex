import {Block} from "../../../../shared/utils";
import {connect} from "../../../../shared/store";
import tmpl from './chatList.tmpl.hbs'
import {ChatItem} from "../ChatItem/ChatItem";
import {ChatItemType} from "../ChatItem/chatItemTypes.types";

class ChatList extends Block {
	constructor() {
		super("ul", {
			attributes: {
				class: "chat__list full-h reset-list 1",
			},
		});
	}

	private generateChatItems(chatItems:ChatItemType[]) {
		this.children.chatListItems = chatItems.map((chat, index) => {
			return new ChatItem(chat);
		})
	}

	componentDidUpdate(oldProps: any, newProps: any): boolean {
		this.generateChatItems(newProps.chats);
    return true
	}

	protected render(): DocumentFragment {
		return this.compile(tmpl, this.props);
	}
}

export default connect(ChatList, (state) => ({chats: state.chats}))
