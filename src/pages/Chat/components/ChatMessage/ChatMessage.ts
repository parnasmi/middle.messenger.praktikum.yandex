import {Block} from "../../../../shared/utils";
import tmpl from './chatMessage.tmpl.hbs'
import {ChatMessageType} from "./ChatMessage.types";
export class ChatMessage extends Block {
	constructor(props:ChatMessageType) {
		super("li", {
			attributes: {
				class: `chat__content-message-item flex ${props.from_user.id === 341 ? 'justify-end' : ''}`,
			},
			...props,
			isOwnMessageClass:props.from_user.id === 341 ? 'chat-message_own' : '',
			messageTypeClass: props.type === 'TEXT' ? 'chat-message_text' : 'chat-message_media',
			isOwnMessage:props.from_user.id === 341
		});
	}

	protected render(): DocumentFragment {
		return this.compile(tmpl, this.props)
	}
}
