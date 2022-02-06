import {Block} from "../../../../shared/utils";
import tmpl from './chatContentMessages.tmpl.hbs'
import {ChatMessageType} from "../ChatMessage/ChatMessage.types";
import {ChatMessage} from "../ChatMessage";

const messagesJSONList:ChatMessageType[] = [
  {
    type: 'TEXT',
    message: 'В 2022 году Великобритания празднует платиновый юбилей правления королевы. Елизавета II станет первым монархом в истории страны, царствовавшим целых 70 лет',
		sent_time: '14:12',
		from_user: {
			first_name: 'Muhsin',
			last_name: 'Maks',
			id: 342
		},
		file: null
  },
	{
		type: 'IMAGE',
		message: '',
		sent_time: '12:45',
		from_user: {
			first_name: 'Ilhom',
			last_name: 'Maks',
			id: 342
		},
		file: {
			url: 'http://www.reportajes-jmserrano.com/hasselblad_903swc/1.jpg'
		}
	},
	{
		type: 'TEXT',
		message: 'The Hasselblad 903 SWC, in the same way as all of its previous models',
		sent_time: '09:12',
		from_user: {
			first_name: 'Ilhom',
			last_name: 'Maks',
			id: 341
		},
		file: null
	},
]

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
		this.children.messagesLogs = messagesJson.map((message, index):Block => {
			return new ChatMessage(message);
		})
	}

	protected render(): DocumentFragment {
		return this.compile(tmpl, this.props)
	}
}
