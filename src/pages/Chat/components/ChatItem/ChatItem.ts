import { Block } from "../../../../shared/utils";
import { ChatItemLastMessage, ChatItemType } from "./chatItemTypes.types";
import tmpl from "./chatItem.tmpl.hbs";
import store from "../../../../shared/store";
import {RESOURCE_URL} from "../../../../../config";

const getLastMessageAuthor = (last_message: ChatItemLastMessage | null) => {
	if (!last_message) return null;
	return `${last_message?.user.first_name[0]}${last_message?.user.second_name[0]}:`;
};

export class ChatItem extends Block {
	constructor(props: ChatItemType) {
		const currentUser = store.getState().user;
		const selectedChat = store.getState()?.selectedChat;
		const { last_message } = props;
		const ownMessage = last_message?.user?.email === currentUser.email;
		const timeObject = last_message ? new Date(last_message.time) : null;

		super("li", {
			attributes: {
				class: "chat__list-item",
			},
			...props,
			time: props.last_message
				? `${timeObject?.getHours()} ${timeObject?.getMinutes()}`
				: null,
			messageOwner: ownMessage ? "Вы:" : getLastMessageAuthor(last_message),
			activeClass: selectedChat?.id === props.id ? "active" : "",
			avatar: props.avatar ? `${RESOURCE_URL}${props.avatar}` : null
		});

		console.log('tmpl chat', tmpl)
	}

	render(): DocumentFragment {
		return this.compile(tmpl, this.props);
	}
}
