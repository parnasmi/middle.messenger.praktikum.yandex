import { Block } from "../../../../shared/utils";
import tmpl from "./chatMessage.tmpl.hbs";
import { ChatMessageType } from "./ChatMessage.types";

export class ChatMessage extends Block {
	constructor(props: ChatMessageType) {
		const d = new Date(props.time)
		super("li", {
			...props,
			attributes: {
				class: `chat__content-message-item flex ${
					props.user_id === props.currentUserId ? "justify-end" : ""
				}`,
			},
			isOwnMessageClass:
				props.user_id === props.currentUserId ? "chat-message_own" : "",
			messageTypeClass:
				props.type === "message" ? "chat-message_text" : "chat-message_media",
			isOwnMessage: props.user_id === props.currentUserId,
			message: props.type === "message" ? props.content : "",
			time: d.toLocaleTimeString()
		});
	}

	protected render(): DocumentFragment {
		return this.compile(tmpl, this.props);
	}
}
