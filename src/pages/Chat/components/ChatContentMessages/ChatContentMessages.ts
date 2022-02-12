import {Block} from "../../../../shared/utils";
import tmpl from './chatContentMessages.tmpl.hbs'
import {ChatMessageType} from "../ChatMessage/ChatMessage.types";
import {ChatMessage} from "../ChatMessage";
import {messagesJSONList} from './messagesJsonData'

export class ChatContentMessages extends Block {
	constructor() {
		super("section", {
			attributes: {
				class: "chat__content-messages flex-grow-1",
			},
		});
		this._generateMessages(messagesJSONList)
	}

	private _generateMessages(messagesJson:ChatMessageType[]) {
		this.children.messagesLogs = messagesJson.map((message):Block => {
			return new ChatMessage(message);
		})
	}

	protected render(): DocumentFragment {
		return this.compile(tmpl, this.props)
	}
}
